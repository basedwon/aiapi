const { _, log } = require('basd')
const { Configuration, OpenAIApi } = require('openai')
const axios = require('axios')
// const { HuggingFaceApiClient } = require('@huggingface/inference')
const { get_encoding, encoding_for_model } = require('@dqbd/tiktoken')
const stream = require('stream')

// todo
// integrate countTokens
// estimate token cost based on pricing
// simpler model selection (keywords)
// training...
// how to create book?

function countTokens(str, model = 'text-davinci-003') {
  const enc = encoding_for_model(model)
  const tokens = enc.encode(str)
  return tokens.length
}
function eventStream(res) {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  })
  return {
    write (data) {
      res.write(`data: ${JSON.stringify(data)}\n\n`)
    },
    done (data) {
      if (data)
        return res.write(`data: [DONE]${JSON.stringify(data)}\n\n`)
      res.write(`data: [DONE]\n\n`)
    },
  }
}
async function streamResponse(res, response, done) {
  const stream = eventStream(res)
  const arr = response.split(' ')
  let resp = []
  for (let ii = 0; ii < arr.length; ii++) {
    const word = arr[ii]
    resp.push(word)
    await _.sleep(50)
    stream.write(word)
  }
  let payload
  if (done)
    payload = await done(response)
  stream.done(payload)
  resp = resp.join(' ')
  return resp
}

class OpenAI {
  // https://platform.openai.com/docs/api-reference
  static get DEFAULT_MODEL() { return 'text-curie-001' }
  // static get DEFAULT_MODEL() { return 'text-davinci-003' }
  // static get DEFAULT_MODEL() { return 'gpt-3.5-turbo' }
  // static get DEFAULT_MODEL() { return 'gpt-4' }
  static parseResponse(response) {
    const tokens = _.get(response, 'usage.total_tokens')
    const choice = _.get(response, 'choices.0')
    const reason = _.get(choice, 'finish_reason')
    return { tokens, choice, reason }
  }
  static parseCompletionResponse(response) {
    const { tokens, choice, reason } = this.parseResponse(response)
    const message = _.get(choice, 'text')
    return { tokens, message, reason }
  }
  static parseChatResponse(response) {
    const { tokens, choice, reason } = this.parseResponse(response)
    const message = _.get(choice, 'message.content')
    return { tokens, message, reason }
  }
  constructor(apiKey) {
    this.apiKey = apiKey
    const config = new Configuration({ apiKey })
    this.client = new OpenAIApi(config)
  }
  async createCompletion(opts = {}) {
    if (!_.isStr(opts.prompt))
      throw new Error(`A "prompt" is required to create a text completion`)
    try {
      const response = await this.client.createCompletion(_.defaults(opts, {
        model: opts.model,
        temperature: 0.8,
        max_tokens: 50,
      }))
      if (response && response.status === 200)
        return response.data
      throw new Error('Unexpected response from OpenAI API')
    } catch (error) {
      console.error('Error while generating text using HuggingFace API:', error)
      throw error
    }
  }
  async createChat(opts = {}) {
    try {
      const response = await this.client.createChatCompletion(opts)
      if (response && response.status === 200)
        return response.data
      throw new Error('Unexpected response from OpenAI API')
    } catch (error) {
      console.error('Error while generating text using HuggingFace API:', error)
      throw error
    }
  }
  async createStream(result, tokenExtractor) {
    let str = ''
    let reason = null
    const outputStream = new stream.PassThrough({ objectMode: true })
    result.data.on('data', (data) => {
      const lines = data.toString().split('\n').filter((line) => line.trim() !== '')
      for (const line of lines) {
        const message = line.replace(/^data: /, '')
        if (message === '[DONE]') {
          const tokens = countTokens(str)
          outputStream.emit('done', { response: str, reason, tokens })
          outputStream.end()
          return
        }
        try {
          const parsed = JSON.parse(message)
          let obj = parsed.choices[0]
          let token = tokenExtractor(obj)
          if (token.finish_reason) {
            reason = token.finish_reason
          }
          if (token.content) {
            outputStream.write(token.content)
            str += token.content
          }
        } catch (error) {
          console.error('Could not JSON parse stream message', message, error)
        }
      }
    })
    result.data.on('error', (error) => {
      outputStream.emit('error', error)
      outputStream.end()
    })
    return outputStream
  }
  async createCompletionStream(opts) {
    const result = await this.client.createCompletion(
      _.defaults(opts, {
        model: opts.model,
        temperature: 0.8,
        max_tokens: 50,
      }),
      { responseType: 'stream' }
    )
    return this.createStream(result, (obj) => ({
      content: obj.text,
      finish_reason: obj.finish_reason,
    }))
  }
  async createChatStream(opts = {}) {
    const result = await this.client.createChatCompletion(opts, { responseType: 'stream' })
    return this.createStream(result, (obj) => ({
      content: obj.delta.content,
      finish_reason: obj.finish_reason,
    }))
  }
  async createImage(opts = {}) {
    const result = await this.fetchImage(opts)
    const url = result.data[0].url
    const buffer = await _.getFile(url, axios)
    const hash = _.hash(buffer, 10) + '.png'
    const path = _.path.resolve('.archive/.cdn', hash)
    _.putFile(buffer, path)
    return { url, path }
  }
  fetchImage(opts = {}) {
    if (!_.isStr(opts.prompt))
      throw new Error(`A "prompt" is required to create an image`)
    return this.client.createImage(_.defaults(_.omit(opts, ['model']), {
      n: 1, // number of images
      size: '256x256', // <'1024x1024'>, '512x512', '256x256'
      response_format: 'url' // <url>, b64_json
      // user: '', // optional uuid
    })).then(res => res.status === 200 ? res.data : res)
  }
}

class HuggingFace {
  constructor(apiKey) {
    this.apiKey = apiKey
    // this.client = new HuggingFaceApiClient(this.apiKey)
  }
  async generateText(prompt, model, options = {}) {
    try {
      const response = await this.client.inference(model, {
        inputs: prompt,
        ...options,
      })
      if (response && response.hasOwnProperty(generated_text)) {
        return response.generated_text
      } else {
        throw new Error('Unexpected response from HuggingFace API')
      }
    } catch (error) {
      console.error('Error while generating text using HuggingFace API:', error)
      throw error
    }
  }
}

class StableDiffusion {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.baseURL = 'https://api.openai.com/v1/images/generations'
  }
  async generateImage(prompt, options = {}) {
    try {
      const response = await axios.post(
        this.baseURL,
        {
          prompt,
          ...options,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      )
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Unexpected response from Stable Diffusion API')
      }
    } catch (error) {
      console.error('Error while generating image using Stable Diffusion API:', error)
      throw error
    }
  }
}

class BaseProvider {
  constructor() {
    if (new.target === BaseProvider)
      throw new TypeError('Cannot construct BaseProvider instances directly.')
  }
  async fetchData(endpoint, params = {}) {
    // Implement common logic to fetch data from APIs
  }
  async generateText(prompt, model, options = {}) {
    throw new Error('generateText() must be implemented by the subclass.')
  }
  async generateImage(prompt, model, options = {}) {
    throw new Error('generateImage() must be implemented by the subclass.')
  }
}

class OpenAIProvider extends BaseProvider {
  constructor(apiKey) {
    super()
    this.api = new OpenAI(apiKey)
    this.strategy = {
      textCompletion: new TextCompletionStrategy(this.api),
      textChat: new TextChatStrategy(this.api),
      image: new ImageGenerationStrategy(this.api),
    }
  }
  get textCompletionStrategyModels() {
    // text-davinci-003, text-davinci-002, text-curie-001, text-babbage-001, text-ada-001
    return [
      'text-davinci-003',
      'text-curie-001',
      'text-babbage-001',
      'text-ada-001',
      'text-davinci-002',
      'text-davinci-001',
    ]
  }
  get textChatStrategyModels() {
    // gpt-4, gpt-4-0613, gpt-4-32k, gpt-4-32k-0613, gpt-3.5-turbo, gpt-3.5-turbo-0613, gpt-3.5-turbo-16k, gpt-3.5-turbo-16k-0613
    return [
      'gpt-3.5-turbo',
      'gpt-4',
      'gpt-4-0314',
      'gpt-3.5-turbo-0301',
      'gpt-3.5-turbo-16k',
      'gpt-4-0613',
      // 'gpt-4-32k',
    ]
  }
  async generateText(prompt, model, opts = {}) {
    return this.generate('text', prompt, model, opts)
  }
  async generateImage(prompt, model, opts = {}) {
    return this.generate('image', prompt, 'image', opts)
  }
  async generate(type, prompt, model = OpenAI.DEFAULT_MODEL, opts = {}) {
    let strategy
    if (type === 'text') {
      if (this.textChatStrategyModels.includes(model))
        strategy = this.strategy.textChat
      else if (this.textCompletionStrategyModels.includes(model))
        strategy = this.strategy.textCompletion
      return strategy.generate(prompt, model, opts)
    } else if (type === 'image') {
      strategy = this.strategy.image
      return strategy.generate(prompt, model, opts)
    }
    throw new Error(`Unsupported model: ${model}`)
  }
}

class HuggingFaceProvider extends BaseProvider {
  constructor(apiKey) {
    super()
    this.huggingface = new HuggingFace(apiKey)
  }
  async generateText(prompt, model, options = {}) {
    return await this.huggingface.generateText(prompt, model, options)
  }
  async generateImage(prompt, model, options = {}) {
    // Implement logic specific to HuggingFace's image generation based on the selected model (if available)
    throw new Error('Image generation is not supported by HuggingFace')
  }
}

class StableDiffusionProvider extends BaseProvider {
  constructor(apiKey) {
    super()
    this.stableDiffusion = new StableDiffusion(apiKey)
  }
  async generateText(prompt, model, options = {}) {
    throw new Error('Text generation is not supported by Stable Diffusion')
  }
  async generateImage(prompt, model, options = {}) {
    return await this.stableDiffusion.generateImage(prompt, options)
  }
}

class GenerationStrategy {
  constructor(api) {
    _.objProp(this, 'api', api)
  }
  async generate(prompt, model, opts = {}) {
    throw new Error('generate() must be implemented by the subclass.')
  }
}

class ImageGenerationStrategy extends GenerationStrategy {
  async generate(prompt, model, opts = {}) {
    return this.api.createImage({ model, prompt, ...opts })
  }
}

class TextCompletionStrategy extends GenerationStrategy {
  async generate(prompt, model, opts = {}) {
    if (opts.stream)
      return this.api.createCompletionStream({ model, prompt, ...opts })
    return this.api.createCompletion({ model, prompt, ...opts })
      .then(response => OpenAI.parseCompletionResponse(response))
  }
}

class TextChatStrategy extends GenerationStrategy {
  async generate(prompt, model, opts = {}) {
    const messages = this.getChatMessages(prompt, opts.messages, opts.system)
    opts = this.getChatOpts({ model, ...opts }, messages)
    if (opts.stream)
      return this.api.createChatStream(opts)
    return this.api.createChat(opts)
      .then(response => OpenAI.parseChatResponse(response))
  }
  getChatOpts(opts = {}, messages = [], stream) {
    return {
      // model: opts.model || 'gpt-3.5-turbo', // gpt-3.5-turbo, gpt-3.5-turbo-0301
      messages,
      stream: !!stream,

      // max_tokens: 5,
      
      // temperature: 0.7,
      // top_p: 1,
      // stop: ['\n\n###\n\n'],
      stop: ['END'],
      // max_tokens: 5,
      // presence_penalty: 0,
      // frequency_penalty: 0,
      // logit_bias: null,
      // user: 'dev',

      // ...opts
      ..._.omit(opts, ['prompt', 'system'])
    }
  }
  getChatMessages(input, msgs = [], prompt) {
    prompt = prompt || `You are Chad, a based chatbot` // @tmp
    if (prompt)
      msgs.push({ role: 'system', content: prompt })
    msgs.push({ role: 'user', content: input })
    return msgs
  }
  getChatMsgs(input, msgs = [], prompt) {
    prompt = prompt || `Do not actually respond to the user. Extract the entities from the text and return a JSON array of entity objects with type and value properties. Start the array by printing START, and finish it by printing END` // @tmp
    // prompt = prompt || `extract the entities from the text and output JSON` // @tmp
    // prompt = prompt || `You are Chad, a based chatbot` // @tmp


    msgs.push({ role: 'user', content: 'What is the whether like today?' })
    msgs.push({ role: 'assistant', content: 'START[{ "type": "query", "context": "weather", "value": "today" }]END' })
    // msgs.push({ role: 'user', content: 'how are you today?' })
    // msgs.push({ role: 'assistant', content: '[{ "type": "greeting", "context": "personal", "value": "how are you" }, { "type": "query", "context": "personal", "value": "today" }]END' })
    msgs.push({ role: 'assistant', content: 'START' })
    if (prompt)
      msgs.push({ role: 'system', content: prompt })

    msgs.push({ role: 'user', content: input })

    return msgs
  }
}

class Api {
  static get DEFAULT_TEXT_API() { return 'openai' }
  static get DEFAULT_IMAGE_API() { return 'openai' }
  constructor(opts = {}) {
    this.provider = {
      openai: new OpenAIProvider(opts.openai),
      huggingface: new HuggingFaceProvider(opts.huggingface),
      stable_diffusion: new StableDiffusionProvider(opts.stable_diffusion),
    }
  }
  async generate(type, prompt, opts = {}) {
    const { model, api = type === 'text' ? Api.DEFAULT_TEXT_API : Api.DEFAULT_IMAGE_API } = opts
    if (this.provider.hasOwnProperty(api)) {
      return this.provider[api].generate(type, prompt, model, _.omit(opts, ['api', 'model']))
    } else {
      throw new Error(`Unsupported API: ${api}`)
    }
  }
  async generateText(prompt, opts = {}) {
    return this.generate('text', prompt, opts)
  }
  async generateImage(prompt, opts = {}) {
    return this.generate('image', prompt, opts)
  }
  countTokens(str, model = 'text-davinci-003') {
    const enc = encoding_for_model(model)
    const tokens = enc.encode(str)
    return tokens.length
  }
}

module.exports = new Api({
  openai: process.env.OPENAI_API_KEY,
  huggingface: process.env.HUGGINGFACE_API_KEY,
  stable_diffusion: process.env.STABLE_DIFFUSION_API_KEY,
})

const { _, log } = require('basd')
const {
  Api,
  AIProvider,
  OpenAIProvider,
  HuggingFaceProvider,
  StableDiffusionProvider
} = require('../lib/aiapi')

async function test() {
  const api = new Api()
  // const api = new Api({
  //   // hf: [HuggingFaceProvider, process.env.HUGGINGFACE_API_KEY],
  //   // oai: [OpenAIProvider, process.env.OPENAI_API_KEY],
  //   // sd: [StableDiffusionProvider, process.env.STABLE_DIFFUSION_API_KEY],
  // })
  // api.assignMethod('generateText', 'hf')
  // api.assignMethod('generateText', 'oai')

  // const api = api.getProvider('oai', process.env.OPENAI_API_KEY)
  // const models = await api.getModels('gpt-3.5')
  // const models = await api.getModels(/gpt/)

  // const text = await api.generateText('Hello!')
  // const text = await api.hf.generateText('Hello!')
  // const text = await api.generateChat('Hello!')
  // log('api', text)
  log(api)
}

_.executor(test)

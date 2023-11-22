## Classes

<dl>
<dt><a href="#AIProvider">AIProvider</a></dt>
<dd><p>Abstract class representing a generic AI provider.</p>
</dd>
<dt><a href="#Api">Api</a></dt>
<dd><p>A class representing the API to interact with various AI providers.</p>
</dd>
<dt><a href="#HuggingFaceProvider">HuggingFaceProvider</a></dt>
<dd><p>Provider for interacting with Hugging Face&#39;s natural language processing services.</p>
</dd>
<dt><a href="#OpenAIProvider">OpenAIProvider</a></dt>
<dd><p>Provider for interacting with OpenAI&#39;s various AI services.</p>
</dd>
<dt><a href="#StableDiffusionProvider">StableDiffusionProvider</a></dt>
<dd><p>Provider for interacting with Stable Diffusion&#39;s image generation and manipulation services.</p>
</dd>
</dl>

<a name="AIProvider"></a>

## AIProvider
Abstract class representing a generic AI provider.

**Kind**: global class  

* [AIProvider](#AIProvider)
    * [new AIProvider(apiKey, opts)](#new_AIProvider_new)
    * [.generateText(prompt)](#AIProvider+generateText) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.generateImage(prompt)](#AIProvider+generateImage) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.generateAudio(prompt)](#AIProvider+generateAudio) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_AIProvider_new"></a>

### new AIProvider(apiKey, opts)
Constructs an AIProvider instance.


| Param | Type | Description |
| --- | --- | --- |
| apiKey | <code>string</code> | The API key for the provider. |
| opts | <code>Object</code> | Additional options for the provider. |

<a name="AIProvider+generateText"></a>

### aiProvider.generateText(prompt) ⇒ <code>Promise.&lt;string&gt;</code>
Generates text based on a given prompt.
This is an abstract method and should be implemented by subclasses.

**Kind**: instance method of [<code>AIProvider</code>](#AIProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise that resolves to the generated text.  
**Throws**:

- <code>Error</code> If the method is not implemented.


| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> | The input prompt for text generation. |

<a name="AIProvider+generateImage"></a>

### aiProvider.generateImage(prompt) ⇒ <code>Promise.&lt;any&gt;</code>
Generates an image based on a given prompt.
This is an abstract method and should be implemented by subclasses.

**Kind**: instance method of [<code>AIProvider</code>](#AIProvider)  
**Returns**: <code>Promise.&lt;any&gt;</code> - A promise that resolves to the generated image.  
**Throws**:

- <code>Error</code> If the method is not implemented.


| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> | The input prompt for image generation. |

<a name="AIProvider+generateAudio"></a>

### aiProvider.generateAudio(prompt) ⇒ <code>Promise.&lt;any&gt;</code>
Generates audio based on a given prompt.
This is an abstract method and should be implemented by subclasses.

**Kind**: instance method of [<code>AIProvider</code>](#AIProvider)  
**Returns**: <code>Promise.&lt;any&gt;</code> - A promise that resolves to the generated audio.  
**Throws**:

- <code>Error</code> If the method is not implemented.


| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> | The input prompt for audio generation. |

<a name="Api"></a>

## Api
A class representing the API to interact with various AI providers.

**Kind**: global class  

* [Api](#Api)
    * [new Api(providers)](#new_Api_new)
    * [.createProviderInstance(providerClass, apiKey, opts)](#Api+createProviderInstance) ⇒ <code>Object</code>
    * [.registerProvider(providerName, providerInstance)](#Api+registerProvider)
    * [.assignMethod(method, providerName)](#Api+assignMethod)
    * [.getMethodProvider(method)](#Api+getMethodProvider) ⇒ <code>Object</code> \| <code>null</code>

<a name="new_Api_new"></a>

### new Api(providers)
Constructs the API object, initializing providers and assigning methods.


| Param | Type | Description |
| --- | --- | --- |
| providers | <code>Object</code> | An object mapping provider names to their configurations. |

<a name="Api+createProviderInstance"></a>

### api.createProviderInstance(providerClass, apiKey, opts) ⇒ <code>Object</code>
Creates an instance of a provider.

**Kind**: instance method of [<code>Api</code>](#Api)  
**Returns**: <code>Object</code> - An instance of the provider.  
**Throws**:

- <code>Error</code> If the provider class is invalid.


| Param | Type | Description |
| --- | --- | --- |
| providerClass | <code>function</code> | The class of the provider. |
| apiKey | <code>string</code> | The API key for the provider. |
| opts | <code>Object</code> | Additional options for the provider. |

<a name="Api+registerProvider"></a>

### api.registerProvider(providerName, providerInstance)
Registers a provider instance under a given name.

**Kind**: instance method of [<code>Api</code>](#Api)  

| Param | Type | Description |
| --- | --- | --- |
| providerName | <code>string</code> | The name to register the provider under. |
| providerInstance | <code>Object</code> | The instance of the provider. |

<a name="Api+assignMethod"></a>

### api.assignMethod(method, providerName)
Assigns a method to a provider.

**Kind**: instance method of [<code>Api</code>](#Api)  
**Throws**:

- <code>Error</code> If the provider or method does not exist.


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The name of the method. |
| providerName | <code>string</code> | The name of the provider. |

<a name="Api+getMethodProvider"></a>

### api.getMethodProvider(method) ⇒ <code>Object</code> \| <code>null</code>
Retrieves the provider instance assigned to a given method.

**Kind**: instance method of [<code>Api</code>](#Api)  
**Returns**: <code>Object</code> \| <code>null</code> - The provider instance or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The name of the method. |

<a name="HuggingFaceProvider"></a>

## HuggingFaceProvider
Provider for interacting with Hugging Face's natural language processing services.

**Kind**: global class  

* [HuggingFaceProvider](#HuggingFaceProvider)
    * [new HuggingFaceProvider(apiKey)](#new_HuggingFaceProvider_new)
    * [.generateText(prompt, model)](#HuggingFaceProvider+generateText) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.createEmbedding(input)](#HuggingFaceProvider+createEmbedding) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.createTranslation(text, sourceLanguage, targetLanguage)](#HuggingFaceProvider+createTranslation) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.createSummary(text)](#HuggingFaceProvider+createSummary) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.answerQuestion(question, context)](#HuggingFaceProvider+answerQuestion) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.recognizeEntities(text)](#HuggingFaceProvider+recognizeEntities) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.analyzeSentiment(text)](#HuggingFaceProvider+analyzeSentiment) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.classifyText(text)](#HuggingFaceProvider+classifyText) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.classifyTokens(text)](#HuggingFaceProvider+classifyTokens) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

<a name="new_HuggingFaceProvider_new"></a>

### new HuggingFaceProvider(apiKey)
Constructs a new HuggingFaceProvider instance.


| Param | Type | Description |
| --- | --- | --- |
| apiKey | <code>string</code> | The API key for accessing Hugging Face services. |

<a name="HuggingFaceProvider+generateText"></a>

### huggingFaceProvider.generateText(prompt, model) ⇒ <code>Promise.&lt;string&gt;</code>
Generates text based on a given prompt.

**Kind**: instance method of [<code>HuggingFaceProvider</code>](#HuggingFaceProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - The generated text.  

| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> | The text prompt to guide generation. |
| model | <code>string</code> | The model to use for text generation. |

<a name="HuggingFaceProvider+createEmbedding"></a>

### huggingFaceProvider.createEmbedding(input) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates embeddings from input text.

**Kind**: instance method of [<code>HuggingFaceProvider</code>](#HuggingFaceProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The generated embeddings.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | The input text for embedding. |

<a name="HuggingFaceProvider+createTranslation"></a>

### huggingFaceProvider.createTranslation(text, sourceLanguage, targetLanguage) ⇒ <code>Promise.&lt;string&gt;</code>
Translates text from a source language to a target language.

**Kind**: instance method of [<code>HuggingFaceProvider</code>](#HuggingFaceProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - The translated text.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text to be translated. |
| sourceLanguage | <code>string</code> | The source language code. |
| targetLanguage | <code>string</code> | The target language code. |

<a name="HuggingFaceProvider+createSummary"></a>

### huggingFaceProvider.createSummary(text) ⇒ <code>Promise.&lt;string&gt;</code>
Summarizes a block of text.

**Kind**: instance method of [<code>HuggingFaceProvider</code>](#HuggingFaceProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - The summarized text.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text to be summarized. |

<a name="HuggingFaceProvider+answerQuestion"></a>

### huggingFaceProvider.answerQuestion(question, context) ⇒ <code>Promise.&lt;string&gt;</code>
Answers a question based on a given context.

**Kind**: instance method of [<code>HuggingFaceProvider</code>](#HuggingFaceProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - The answer to the question.  

| Param | Type | Description |
| --- | --- | --- |
| question | <code>string</code> | The question to be answered. |
| context | <code>string</code> | The context for the question. |

<a name="HuggingFaceProvider+recognizeEntities"></a>

### huggingFaceProvider.recognizeEntities(text) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Recognizes named entities in a given text.

**Kind**: instance method of [<code>HuggingFaceProvider</code>](#HuggingFaceProvider)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - - The recognized entities.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text for entity recognition. |

<a name="HuggingFaceProvider+analyzeSentiment"></a>

### huggingFaceProvider.analyzeSentiment(text) ⇒ <code>Promise.&lt;string&gt;</code>
Analyzes the sentiment of a given text.

**Kind**: instance method of [<code>HuggingFaceProvider</code>](#HuggingFaceProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - The sentiment analysis result.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text for sentiment analysis. |

<a name="HuggingFaceProvider+classifyText"></a>

### huggingFaceProvider.classifyText(text) ⇒ <code>Promise.&lt;Object&gt;</code>
Classifies text into predefined categories.

**Kind**: instance method of [<code>HuggingFaceProvider</code>](#HuggingFaceProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The classification results.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text to be classified. |

<a name="HuggingFaceProvider+classifyTokens"></a>

### huggingFaceProvider.classifyTokens(text) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Classifies tokens in text for tasks like part-of-speech tagging.

**Kind**: instance method of [<code>HuggingFaceProvider</code>](#HuggingFaceProvider)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - - The token classification results.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text containing the tokens to be classified. |

<a name="OpenAIProvider"></a>

## OpenAIProvider
Provider for interacting with OpenAI's various AI services.

**Kind**: global class  

* [OpenAIProvider](#OpenAIProvider)
    * [new OpenAIProvider(apiKey, opts)](#new_OpenAIProvider_new)
    * [.countTokens(str, [model])](#OpenAIProvider+countTokens) ⇒ <code>number</code>
    * [.createSpeech(input)](#OpenAIProvider+createSpeech) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.createTranscription(audio)](#OpenAIProvider+createTranscription) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.createTranslation(text, targetLanguage)](#OpenAIProvider+createTranslation) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.generateChat(prompt, [model])](#OpenAIProvider+generateChat) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.createEmbedding(input)](#OpenAIProvider+createEmbedding) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.createFineTuningJob(data)](#OpenAIProvider+createFineTuningJob) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.listFineTuningJobs()](#OpenAIProvider+listFineTuningJobs) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.retrieveFineTuningJob(jobId)](#OpenAIProvider+retrieveFineTuningJob) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.cancelFineTuning(jobId)](#OpenAIProvider+cancelFineTuning) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.listFineTuningEvents(jobId)](#OpenAIProvider+listFineTuningEvents) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.listFiles()](#OpenAIProvider+listFiles) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.uploadFile(fileData)](#OpenAIProvider+uploadFile) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.deleteFile(fileId)](#OpenAIProvider+deleteFile) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.retrieveFile(fileId)](#OpenAIProvider+retrieveFile) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.retrieveFileContent(fileId)](#OpenAIProvider+retrieveFileContent) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.createImage(prompt)](#OpenAIProvider+createImage) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.editImage(imageData)](#OpenAIProvider+editImage) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.createImageVariation(imageData)](#OpenAIProvider+createImageVariation) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.describeImage(imageData)](#OpenAIProvider+describeImage) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.listModels([filter])](#OpenAIProvider+listModels) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.retrieveModel(modelId)](#OpenAIProvider+retrieveModel) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.deleteFineTuneModel(modelId)](#OpenAIProvider+deleteFineTuneModel) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.createModeration(content)](#OpenAIProvider+createModeration) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.createCompletion(prompt, [model])](#OpenAIProvider+createCompletion) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.createEdit(input)](#OpenAIProvider+createEdit) ⇒ <code>Promise.&lt;string&gt;</code>

<a name="new_OpenAIProvider_new"></a>

### new OpenAIProvider(apiKey, opts)
Constructs a new OpenAIProvider instance.


| Param | Type | Description |
| --- | --- | --- |
| apiKey | <code>string</code> | The API key for accessing OpenAI services. |
| opts | <code>Object</code> | Additional options for the provider. |

<a name="OpenAIProvider+countTokens"></a>

### openAIProvider.countTokens(str, [model]) ⇒ <code>number</code>
Counts the number of tokens in a string based on a specific model's encoding.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>number</code> - - The number of tokens in the string.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to count tokens in. |
| [model] | <code>string</code> | The model to use for token counting. |

<a name="OpenAIProvider+createSpeech"></a>

### openAIProvider.createSpeech(input) ⇒ <code>Promise.&lt;Object&gt;</code>
Generates an audio speech from a given text.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The generated audio speech.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | The text input to generate speech from. |

<a name="OpenAIProvider+createTranscription"></a>

### openAIProvider.createTranscription(audio) ⇒ <code>Promise.&lt;string&gt;</code>
Transcribes audio to text.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - The transcribed text.  

| Param | Type | Description |
| --- | --- | --- |
| audio | <code>Object</code> | The audio data to transcribe. |

<a name="OpenAIProvider+createTranslation"></a>

### openAIProvider.createTranslation(text, targetLanguage) ⇒ <code>Promise.&lt;string&gt;</code>
Translates text into a specified target language.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - The translated text.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text to translate. |
| targetLanguage | <code>string</code> | The target language for translation. |

<a name="OpenAIProvider+generateChat"></a>

### openAIProvider.generateChat(prompt, [model]) ⇒ <code>Promise.&lt;string&gt;</code>
Generates a chat response based on a given prompt.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - The chat response.  

| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> | The chat prompt. |
| [model] | <code>string</code> | The model to use for chat. |

<a name="OpenAIProvider+createEmbedding"></a>

### openAIProvider.createEmbedding(input) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates embeddings from the given input.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The generated embeddings.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | The input for embedding creation. |

<a name="OpenAIProvider+createFineTuningJob"></a>

### openAIProvider.createFineTuningJob(data) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a fine-tuning job with the given data.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - Details of the created fine-tuning job.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for fine-tuning. |

<a name="OpenAIProvider+listFineTuningJobs"></a>

### openAIProvider.listFineTuningJobs() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Lists all fine-tuning jobs.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - - A list of fine-tuning jobs.  
<a name="OpenAIProvider+retrieveFineTuningJob"></a>

### openAIProvider.retrieveFineTuningJob(jobId) ⇒ <code>Promise.&lt;Object&gt;</code>
Retrieves details of a specific fine-tuning job.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The details of the fine-tuning job.  

| Param | Type | Description |
| --- | --- | --- |
| jobId | <code>string</code> | The ID of the fine-tuning job. |

<a name="OpenAIProvider+cancelFineTuning"></a>

### openAIProvider.cancelFineTuning(jobId) ⇒ <code>Promise.&lt;void&gt;</code>
Cancels a specific fine-tuning job.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - Confirmation of the cancellation.  

| Param | Type | Description |
| --- | --- | --- |
| jobId | <code>string</code> | The ID of the fine-tuning job to cancel. |

<a name="OpenAIProvider+listFineTuningEvents"></a>

### openAIProvider.listFineTuningEvents(jobId) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Lists fine-tuning events for a specific job.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - - A list of fine-tuning events.  

| Param | Type | Description |
| --- | --- | --- |
| jobId | <code>string</code> | The ID of the fine-tuning job. |

<a name="OpenAIProvider+listFiles"></a>

### openAIProvider.listFiles() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Lists all files uploaded to OpenAI.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - - A list of files.  
<a name="OpenAIProvider+uploadFile"></a>

### openAIProvider.uploadFile(fileData) ⇒ <code>Promise.&lt;Object&gt;</code>
Uploads a file to OpenAI.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The details of the uploaded file.  

| Param | Type | Description |
| --- | --- | --- |
| fileData | <code>Object</code> | The file data to upload. |

<a name="OpenAIProvider+deleteFile"></a>

### openAIProvider.deleteFile(fileId) ⇒ <code>Promise.&lt;void&gt;</code>
Deletes a specific file from OpenAI.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - Confirmation of the deletion.  

| Param | Type | Description |
| --- | --- | --- |
| fileId | <code>string</code> | The ID of the file to delete. |

<a name="OpenAIProvider+retrieveFile"></a>

### openAIProvider.retrieveFile(fileId) ⇒ <code>Promise.&lt;Object&gt;</code>
Retrieves metadata for a specific file.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The file's metadata.  

| Param | Type | Description |
| --- | --- | --- |
| fileId | <code>string</code> | The ID of the file. |

<a name="OpenAIProvider+retrieveFileContent"></a>

### openAIProvider.retrieveFileContent(fileId) ⇒ <code>Promise.&lt;Object&gt;</code>
Retrieves the content of a specific file.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The file's content.  

| Param | Type | Description |
| --- | --- | --- |
| fileId | <code>string</code> | The ID of the file. |

<a name="OpenAIProvider+createImage"></a>

### openAIProvider.createImage(prompt) ⇒ <code>Promise.&lt;Object&gt;</code>
Generates an image based on a given prompt.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The generated image.  

| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> | The prompt to generate the image from. |

<a name="OpenAIProvider+editImage"></a>

### openAIProvider.editImage(imageData) ⇒ <code>Promise.&lt;Object&gt;</code>
Edits an existing image.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The edited image.  

| Param | Type | Description |
| --- | --- | --- |
| imageData | <code>Object</code> | The data of the image to edit. |

<a name="OpenAIProvider+createImageVariation"></a>

### openAIProvider.createImageVariation(imageData) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Creates variations of an existing image.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - - Variations of the image.  

| Param | Type | Description |
| --- | --- | --- |
| imageData | <code>Object</code> | The data of the image to create variations from. |

<a name="OpenAIProvider+describeImage"></a>

### openAIProvider.describeImage(imageData) ⇒ <code>Promise.&lt;string&gt;</code>
Describes or analyzes an image.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - The description of the image.  

| Param | Type | Description |
| --- | --- | --- |
| imageData | <code>Object</code> | The image data to be described. |

<a name="OpenAIProvider+listModels"></a>

### openAIProvider.listModels([filter]) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Lists available models, optionally filtered.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - - A list of available models.  

| Param | Type | Description |
| --- | --- | --- |
| [filter] | <code>function</code> \| <code>RegExp</code> \| <code>string</code> | Optional filter for model listing. |

<a name="OpenAIProvider+retrieveModel"></a>

### openAIProvider.retrieveModel(modelId) ⇒ <code>Promise.&lt;Object&gt;</code>
Retrieves information about a specific model.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - Information about the model.  

| Param | Type | Description |
| --- | --- | --- |
| modelId | <code>string</code> | The ID of the model to retrieve. |

<a name="OpenAIProvider+deleteFineTuneModel"></a>

### openAIProvider.deleteFineTuneModel(modelId) ⇒ <code>Promise.&lt;void&gt;</code>
Deletes a fine-tuned model.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - Confirmation of the deletion.  

| Param | Type | Description |
| --- | --- | --- |
| modelId | <code>string</code> | The ID of the fine-tune model to delete. |

<a name="OpenAIProvider+createModeration"></a>

### openAIProvider.createModeration(content) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a content moderation based on given content.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The moderation result.  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>Object</code> | The content to be moderated. |

<a name="OpenAIProvider+createCompletion"></a>

### openAIProvider.createCompletion(prompt, [model]) ⇒ <code>Promise.&lt;string&gt;</code>
Creates a completion using a language model.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - The generated text completion.  

| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> | The prompt to generate completion for. |
| [model] | <code>string</code> | The model to use for generation. |

<a name="OpenAIProvider+createEdit"></a>

### openAIProvider.createEdit(input) ⇒ <code>Promise.&lt;string&gt;</code>
Creates an edit of a given input using a language model.

**Kind**: instance method of [<code>OpenAIProvider</code>](#OpenAIProvider)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - The edited text.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | The input text to be edited. |

<a name="StableDiffusionProvider"></a>

## StableDiffusionProvider
Provider for interacting with Stable Diffusion's image generation and manipulation services.

**Kind**: global class  

* [StableDiffusionProvider](#StableDiffusionProvider)
    * [new StableDiffusionProvider(apiKey)](#new_StableDiffusionProvider_new)
    * [.generateImage(prompt)](#StableDiffusionProvider+generateImage) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.createImageVariation(imageData)](#StableDiffusionProvider+createImageVariation) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.translateImage(inputImage, targetStyle)](#StableDiffusionProvider+translateImage) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.enhanceImage(imageData)](#StableDiffusionProvider+enhanceImage) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.superResolveImage(imageData)](#StableDiffusionProvider+superResolveImage) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.generateConditionalImage(conditions)](#StableDiffusionProvider+generateConditionalImage) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.synthesizeImageFromText(description)](#StableDiffusionProvider+synthesizeImageFromText) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.composeImages(imageElements)](#StableDiffusionProvider+composeImages) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.transferStyle(contentImage, styleImage)](#StableDiffusionProvider+transferStyle) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.inpaintImage(imageData, mask)](#StableDiffusionProvider+inpaintImage) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.interactiveImageGeneration(baseImage, modifications)](#StableDiffusionProvider+interactiveImageGeneration) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.colorizeImage(bwImage)](#StableDiffusionProvider+colorizeImage) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_StableDiffusionProvider_new"></a>

### new StableDiffusionProvider(apiKey)
Constructs a new StableDiffusionProvider instance.


| Param | Type | Description |
| --- | --- | --- |
| apiKey | <code>string</code> | The API key for accessing Stable Diffusion services. |

<a name="StableDiffusionProvider+generateImage"></a>

### stableDiffusionProvider.generateImage(prompt) ⇒ <code>Promise.&lt;Object&gt;</code>
Generates an image based on a text prompt.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The generated image.  

| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> | The text prompt to guide image generation. |

<a name="StableDiffusionProvider+createImageVariation"></a>

### stableDiffusionProvider.createImageVariation(imageData) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Creates variations of an existing image.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - - Variations of the original image.  

| Param | Type | Description |
| --- | --- | --- |
| imageData | <code>Object</code> | The image data to create variations of. |

<a name="StableDiffusionProvider+translateImage"></a>

### stableDiffusionProvider.translateImage(inputImage, targetStyle) ⇒ <code>Promise.&lt;Object&gt;</code>
Translates an image to a different style.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The style-translated image.  

| Param | Type | Description |
| --- | --- | --- |
| inputImage | <code>Object</code> | The input image to be translated. |
| targetStyle | <code>string</code> | The target style for the translation. |

<a name="StableDiffusionProvider+enhanceImage"></a>

### stableDiffusionProvider.enhanceImage(imageData) ⇒ <code>Promise.&lt;Object&gt;</code>
Enhances the quality of an image.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The enhanced image.  

| Param | Type | Description |
| --- | --- | --- |
| imageData | <code>Object</code> | The image data to enhance. |

<a name="StableDiffusionProvider+superResolveImage"></a>

### stableDiffusionProvider.superResolveImage(imageData) ⇒ <code>Promise.&lt;Object&gt;</code>
Increases the resolution of an image.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The super-resolved image.  

| Param | Type | Description |
| --- | --- | --- |
| imageData | <code>Object</code> | The image data for resolution enhancement. |

<a name="StableDiffusionProvider+generateConditionalImage"></a>

### stableDiffusionProvider.generateConditionalImage(conditions) ⇒ <code>Promise.&lt;Object&gt;</code>
Generates images based on specified complex conditions or attributes.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The generated image.  

| Param | Type | Description |
| --- | --- | --- |
| conditions | <code>Object</code> | The conditions to guide image generation. |

<a name="StableDiffusionProvider+synthesizeImageFromText"></a>

### stableDiffusionProvider.synthesizeImageFromText(description) ⇒ <code>Promise.&lt;Object&gt;</code>
Synthesizes an image from a detailed text description.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The synthesized image.  

| Param | Type | Description |
| --- | --- | --- |
| description | <code>string</code> | The text description to synthesize the image from. |

<a name="StableDiffusionProvider+composeImages"></a>

### stableDiffusionProvider.composeImages(imageElements) ⇒ <code>Promise.&lt;Object&gt;</code>
Composes an image from multiple elements or images.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The composite image.  

| Param | Type | Description |
| --- | --- | --- |
| imageElements | <code>Array.&lt;Object&gt;</code> | The elements to compose the image from. |

<a name="StableDiffusionProvider+transferStyle"></a>

### stableDiffusionProvider.transferStyle(contentImage, styleImage) ⇒ <code>Promise.&lt;Object&gt;</code>
Applies the style of one image to the content of another.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The image with applied style.  

| Param | Type | Description |
| --- | --- | --- |
| contentImage | <code>Object</code> | The image with the content. |
| styleImage | <code>Object</code> | The image with the style to apply. |

<a name="StableDiffusionProvider+inpaintImage"></a>

### stableDiffusionProvider.inpaintImage(imageData, mask) ⇒ <code>Promise.&lt;Object&gt;</code>
Inpaints parts of an image based on a mask.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The inpainted image.  

| Param | Type | Description |
| --- | --- | --- |
| imageData | <code>Object</code> | The image data for inpainting. |
| mask | <code>Object</code> | The mask to guide the inpainting process. |

<a name="StableDiffusionProvider+interactiveImageGeneration"></a>

### stableDiffusionProvider.interactiveImageGeneration(baseImage, modifications) ⇒ <code>Promise.&lt;Object&gt;</code>
Generates images interactively based on user input or modifications.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The interactively generated image.  

| Param | Type | Description |
| --- | --- | --- |
| baseImage | <code>Object</code> | The base image for the interactive generation. |
| modifications | <code>Array.&lt;Object&gt;</code> | The modifications to apply during generation. |

<a name="StableDiffusionProvider+colorizeImage"></a>

### stableDiffusionProvider.colorizeImage(bwImage) ⇒ <code>Promise.&lt;Object&gt;</code>
Colorizes black and white images or modifies the color palette of an image.

**Kind**: instance method of [<code>StableDiffusionProvider</code>](#StableDiffusionProvider)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The colorized image.  

| Param | Type | Description |
| --- | --- | --- |
| bwImage | <code>Object</code> | The black and white image to colorize. |


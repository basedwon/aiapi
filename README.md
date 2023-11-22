# aiapi

[![npm](https://img.shields.io/npm/v/aiapi?style=flat&logo=npm)](https://www.npmjs.com/package/aiapi)
[![pipeline](https://gitlab.com/frenware/ai/aiapi/badges/master/pipeline.svg)](https://gitlab.com/frenware/ai/aiapi/-/pipelines)
[![license](https://img.shields.io/npm/l/aiapi)](https://gitlab.com/frenware/ai/aiapi/-/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dw/aiapi)](https://www.npmjs.com/package/aiapi) 

[![Gitlab](https://img.shields.io/badge/Gitlab%20-%20?logo=gitlab&color=%23383a40)](https://gitlab.com/frenware/ai/aiapi)
[![Github](https://img.shields.io/badge/Github%20-%20?logo=github&color=%23383a40)](https://github.com/basedwon/aiapi)
[![Twitter](https://img.shields.io/badge/@basdwon%20-%20?logo=twitter&color=%23383a40)](https://twitter.com/basdwon)
[![Discord](https://img.shields.io/badge/Basedwon%20-%20?logo=discord&color=%23383a40)](https://discordapp.com/users/basedwon)

A versatile library designed to interact with various AI services, including text generation, image processing, and audio conversion. It offers a flexible architecture that allows users to easily integrate multiple AI providers and switch between them based on their needs.

## Features

- **Multiple AI Providers**: Built-in support for popular AI providers like OpenAI, Hugging Face, and Stable Diffusion.
- **Dynamic Method Assignment**: Dynamically assign methods like `generateText`, `generateImage` to different providers.
- **Easy Provider Switching**: Quickly switch AI providers for different methods without altering your main application code.
- **Extensibility**: Add custom AI providers or override existing ones with ease.
- **Direct Provider Access**: Directly interact with a specific provider if needed.

## Installation

Install the package with:

```bash
npm install aiapi
```

## Usage

Import the `aiapi` library.

```js
import aiapi from 'aiapi'
```
or
```js
const aiapi = require('aiapi')
```

`aiapi` is designed to be flexible and easy to use, allowing you to interact with multiple AI services seamlessly. Below are some examples of how you can utilize the library in your projects.

### Basic Initialization

First, import and initialize the `Api` class with your desired AI providers:

```js
const Api = require('aiapi')

// Initialize with your API keys and options
const api = new Api({
  oai: [OpenAIProvider, 'your-openai-api-key', {/* options */}],
  hf: [HuggingFaceProvider, 'your-huggingface-api-key', {/* options */}],
  // Add more providers as needed
})
```

### Generating Content

Use the API to generate text, images, or audio. By default, the method will use the provider assigned to it:

```js
// Generate text using the default provider for text generation
api.generateText("Hello, world!").then(console.log)

// Generate an image
api.generateImage("A sunny beach").then(console.log)
```

### Direct Provider Access

You can also interact directly with a specific provider, bypassing the default method assignments:

```js
// Directly call the Hugging Face provider
api.providers.hf.generateText("Direct call to Hugging Face").then(console.log)
// Or just leverage the Proxy constructor
api.hf.generateText("Direct call to Hugging Face").then(console.log)
```

### Assigning Methods to Providers

The `assignMethod` function allows you to dynamically assign a specific method to a provider. This is useful if you want to change the provider for a particular functionality at runtime:

```js
// Assign the 'generateText' method to use the 'hf' (Hugging Face) provider
api.assignMethod('generateText', 'hf')

// Now, calling generateText will use the Hugging Face provider
api.generateText("Switched to Hugging Face").then(console.log)
```

### Adding or Overriding Providers

You can easily add a new provider or override an existing one:

```js
class CustomProvider extends AIProvider {
  // Implement your custom provider
}

// Register a new provider
api.registerProvider('custom', new CustomProvider('your-api-key', { /* options */ }))

// Optionally, assign methods to your new provider
api.assignMethod('generateText', 'custom')
```

## Documentation

- [API Reference](/docs/api.md)

### Built-in Providers

- **OpenAIProvider**: Interacts with OpenAI's APIs, offering functionalities like GPT-3 text generation.
- **HuggingFaceProvider**: Utilizes Hugging Face's APIs for text generation and more.
- **StableDiffusionProvider**: (Work in progress) Aims to offer image generation capabilities.

### Adding Custom Providers

You can extend the `AIProvider` class to create custom providers. This allows integrating any AI service into the `aiapi` ecosystem.

## Tests

In order to run the test suite, simply clone the repository and install its dependencies:

```bash
git clone https://gitlab.com/frenware/ai/aiapi.git
cd aiapi
npm install
```

To run the tests:

```bash
npm test
```

## Contributing

Thank you! Please see our [contributing guidelines](/docs/contributing.md) for details.

## Donations

If you find this project useful and want to help support further development, please send us some coin. We greatly appreciate any and all contributions. Thank you!

**Bitcoin (BTC):**
```
1JUb1yNFH6wjGekRUW6Dfgyg4J4h6wKKdF
```

**Monero (XMR):**
```
46uV2fMZT3EWkBrGUgszJCcbqFqEvqrB4bZBJwsbx7yA8e2WBakXzJSUK8aqT4GoqERzbg4oKT2SiPeCgjzVH6VpSQ5y7KQ
```

## License

aiapi is [MIT licensed](https://gitlab.com/frenware/ai/aiapi/-/blob/master/LICENSE).

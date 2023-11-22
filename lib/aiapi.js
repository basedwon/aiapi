require('dotenv').config()
const { _, log } = require('basd')
const AIProvider = require('./ai-provider')
const OpenAIProvider = require('./providers/openai')
const HuggingFaceProvider = require('./providers/hugging-face')
const StableDiffusionProvider = require('./providers/stable-diffusion')

/**
 * A class representing the API to interact with various AI providers.
 */
class Api {
  /**
   * Constructs the API object, initializing providers and assigning methods.
   * @param {Object} providers - An object mapping provider names to their configurations.
   */
  constructor(providers = {}) {
    if (_.isEmpty(providers)) {
      providers = {
        oai: [OpenAIProvider, process.env.OPENAI_API_KEY],
        hf: [HuggingFaceProvider, process.env.HUGGINGFACE_API_KEY],
        sd: [StableDiffusionProvider, process.env.STABLE_DIFFUSION_API_KEY],
      }
    }
    this.providers = {}
    this.methods = {}
    for (const [providerName, [providerClass, apiKey, opts]] of _.entries(providers)) {
      const providerInstance = this.createProviderInstance(providerClass, apiKey, opts)
      this.registerProvider(providerName, providerInstance)
      const methods = _.getMethods(providerInstance)
      for (const method of methods) {
        if (!this.methods[method]) {
          this.assignMethod(method, providerName)
        }
      }
    }
    return new Proxy(this, {
      get(target, prop, receiver) {
        // Direct access to a provider instance
        if (target.providers[prop])
          return target.providers[prop]
        // Check if the property is a method provided by a provider
        const provider = target.getMethodProvider(prop)
        if (provider) {
          if (_.isFunction(provider[prop])) {
            return (...args) => {
              try {
                return provider[prop].apply(provider, args)
              } catch (error) {
                throw new Error(`Error in method ${prop}: ${error.message}`)
              }
            }
          } else
            throw new Error(`Method ${prop} is not a function on provider ${provider.constructor.name}`)
        }
        // Default behavior
        return Reflect.get(target, prop, receiver)
      }
    })
  }

  /**
   * Creates an instance of a provider.
   * @param {Function} providerClass - The class of the provider.
   * @param {string} apiKey - The API key for the provider.
   * @param {Object} opts - Additional options for the provider.
   * @returns {Object} An instance of the provider.
   * @throws {Error} If the provider class is invalid.
   */
  createProviderInstance(providerClass, apiKey, opts) {
    try {
      if (!_.isFunction(providerClass) || !(providerClass.prototype instanceof AIProvider))
        throw new Error(`Invalid Provider Class`)
      return new providerClass(apiKey, opts)
    } catch (error) {
      throw new Error(`Error creating provider instance: ${error.message}`)
    }
  }

  /**
   * Registers a provider instance under a given name.
   * @param {string} providerName - The name to register the provider under.
   * @param {Object} providerInstance - The instance of the provider.
   */
  registerProvider(providerName, providerInstance) {
    this.providers[providerName] = providerInstance
  }

  /**
   * Assigns a method to a provider.
   * @param {string} method - The name of the method.
   * @param {string} providerName - The name of the provider.
   * @throws {Error} If the provider or method does not exist.
   */
  assignMethod(method, providerName) {
    const provider = this.providers[providerName]
    if (!provider)
      throw new Error(`Provider ${providerName} does not exist`)
    if (!_.isFunction(provider[method]))
      throw new Error(`Method ${method} does not exist on provider ${providerName}`)
    this.methods[method] = providerName
  }

  /**
   * Retrieves the provider instance assigned to a given method.
   * @param {string} method - The name of the method.
   * @returns {Object|null} The provider instance or null if not found.
   */
  getMethodProvider(method) {
    const providerName = this.methods[method]
    return this.providers[providerName] ? this.providers[providerName] : null
  }
}

module.exports = { Api, AIProvider, OpenAIProvider, HuggingFaceProvider, StableDiffusionProvider }

const { _, log } = require('basd')

/**
 * Abstract class representing a generic AI provider.
 */
class AIProvider {
  /**
   * Constructs an AIProvider instance.
   * @param {string} apiKey - The API key for the provider.
   * @param {Object} opts - Additional options for the provider.
   */
  constructor(apiKey, opts = {}) {
    _.objProp(this, 'apiKey', apiKey)
    _.objProp(this, 'opts', opts)
  }

  /**
   * Generates text based on a given prompt.
   * This is an abstract method and should be implemented by subclasses.
   * @param {string} prompt - The input prompt for text generation.
   * @returns {Promise<string>} A promise that resolves to the generated text.
   * @throws {Error} If the method is not implemented.
   */
  async generateText(prompt) {
    throw new Error(`Not implemented`)
  }

  /**
   * Generates an image based on a given prompt.
   * This is an abstract method and should be implemented by subclasses.
   * @param {string} prompt - The input prompt for image generation.
   * @returns {Promise<any>} A promise that resolves to the generated image.
   * @throws {Error} If the method is not implemented.
   */
  async generateImage(prompt) {
    throw new Error(`Not implemented`)
  }

  /**
   * Generates audio based on a given prompt.
   * This is an abstract method and should be implemented by subclasses.
   * @param {string} prompt - The input prompt for audio generation.
   * @returns {Promise<any>} A promise that resolves to the generated audio.
   * @throws {Error} If the method is not implemented.
   */
  async generateAudio(prompt) {
    throw new Error(`Not implemented`)
  }
}

module.exports = AIProvider

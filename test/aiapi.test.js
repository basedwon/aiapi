const { _, log } = require('basd')
const { Api, AIProvider } = require('../lib/aiapi')

class MockProvider extends AIProvider {
  generateText(prompt) {
    return `Mock text for: ${prompt}`
  }
}

describe('Api', () => {
  let api

  beforeEach(() => {
    // Setup Api with mock providers
    api = new Api({
      mock: [MockProvider, 'api-key', {}]
    })
  })

  describe('createProviderInstance', () => {
    it('should create an instance of a provider', () => {
      const provider = api.createProviderInstance(MockProvider, 'api-key', {})
      expect(provider).to.be.an.instanceof(MockProvider)
    })

    it('should throw an error for invalid provider class', () => {
      expect(() => api.createProviderInstance(function() {}, 'api-key', {}))
        .to.throw('Invalid Provider Class')
    })
  })

  describe('registerProvider', () => {
    it('should register a provider', () => {
      const provider = new MockProvider('api-key', {})
      api.registerProvider('mock', provider)
      expect(api.providers.mock).to.equal(provider)
    })
  })

  describe('assignMethod', () => {
    it('should assign a method to a provider', () => {
      api.assignMethod('generateText', 'mock')
      expect(api.methods.generateText).to.equal('mock')
    })

    it('should throw an error for non-existent provider', () => {
      expect(() => api.assignMethod('generateText', 'unknown'))
        .to.throw('Provider unknown does not exist')
    })
  })

  describe('getMethodProvider', () => {
    it('should return the correct provider for a method', () => {
      api.assignMethod('generateText', 'mock')
      const provider = api.getMethodProvider('generateText')
      expect(provider).to.be.an.instanceof(MockProvider)
    })

    it('should return null for unassigned method', () => {
      const provider = api.getMethodProvider('unassignedMethod')
      expect(provider).to.be.null
    })
  })

  describe('Proxy methods', () => {
    it('should correctly proxy a method to a provider', () => {
      const result = api.generateText('Hello')
      expect(result).to.equal('Mock text for: Hello')
    })

    it('should throw an error for non-existent method', () => {
      expect(() => api.nonExistentMethod()).to.throw()
    })
  })
})

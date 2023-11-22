## Classes

<dl>
<dt><a href="#AIProvider">AIProvider</a></dt>
<dd><p>Abstract class representing a generic AI provider.</p>
</dd>
<dt><a href="#Api">Api</a></dt>
<dd><p>A class representing the API to interact with various AI providers.</p>
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


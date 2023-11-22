/**
 * Represents options for a provider.
 */
interface ProviderOptions {
  [key: string]: any; // Replace 'any' with more specific types as needed
}

/**
 * Base class for AI providers.
 */
declare class AIProvider {
  apiKey: string;
  opts: ProviderOptions;

  constructor(apiKey: string, opts?: ProviderOptions);

  generateText(prompt: string): Promise<any>; // Specify the return type if known
  generateImage(prompt: string): Promise<any>; // Specify the return type if known
  generateAudio(prompt: string): Promise<any>; // Specify the return type if known
}

/**
 * Represents the structure of each provider entry in the Api constructor.
 */
interface Providers {
  [providerName: string]: [typeof AIProvider, string, ProviderOptions];
}

/**
 * The main API class for handling different AI providers.
 */
declare class Api {
  providers: { [key: string]: AIProvider };
  methods: { [method: string]: string };

  constructor(providers: Providers);

  createProviderInstance(providerClass: typeof AIProvider, apiKey: string, opts: ProviderOptions): AIProvider;

  registerProvider(providerName: string, providerInstance: AIProvider): void;

  assignMethod(method: string, providerName: string): void;

  getMethodProvider(method: string): AIProvider | null;
}

export { AIProvider, Api, ProviderOptions, Providers };

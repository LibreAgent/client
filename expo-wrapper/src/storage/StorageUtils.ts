import {
  AllModel,
  Chat,
  ChatMode,
  SwiftChatMessage,
  Model,
  SystemPrompt,
  Usage,
  TokenResponse,
} from '../types/Chat';
import {
  DefaultRegion,
  DefaultVoiceSystemPrompts,
  getDefaultImageModels,
  getDefaultSystemPrompts,
  getDefaultTextModels,
  VoiceIDList,
} from './Constants';

// Simple UUID generator function
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Simple in-memory storage that mimics MMKV interface
const memoryStorage = new Map<string, string>();

class MemoryStorageWrapper {
  getString(key: string): string | null {
    return memoryStorage.get(key) ?? null;
  }

  getNumber(key: string): number | null {
    const value = memoryStorage.get(key);
    return value ? Number(value) : null;
  }

  getBoolean(key: string): boolean | null {
    const value = memoryStorage.get(key);
    return value ? JSON.parse(value) : null;
  }

  set(key: string, value: string | number | boolean): void {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    memoryStorage.set(key, stringValue);
  }

  delete(key: string): void {
    memoryStorage.delete(key);
  }
}

export const storage = new MemoryStorageWrapper();

const initializeStorage = () => {
  const key = 'encryption_key';
  let encryptionKey = storage.getString(key);
  if (!encryptionKey) {
    encryptionKey = generateUUID();
    storage.set(key, encryptionKey);
  }

  return new MemoryStorageWrapper();
};

export const encryptStorage = initializeStorage();

const keyPrefix = 'bedrock/';
const messageListKey = keyPrefix + 'messageList';
const sessionIdPrefix = keyPrefix + 'sessionId/';
const currentSessionIdKey = keyPrefix + 'currentSessionId';
const hapticEnabledKey = keyPrefix + 'hapticEnabled';
const apiUrlKey = keyPrefix + 'apiUrlKey';
const apiKeyTag = keyPrefix + 'apiKeyTag';
const ollamaApiUrlKey = keyPrefix + 'ollamaApiUrlKey';
const deepSeekApiKeyTag = keyPrefix + 'deepSeekApiKeyTag';
const openAIApiKeyTag = keyPrefix + 'openAIApiKeyTag';
const openAICompatApiKeyTag = keyPrefix + 'openAICompatApiKeyTag';
const openAICompatApiURLKey = keyPrefix + 'openAICompatApiURLKey';
const openAICompatModelsKey = keyPrefix + 'openAICompatModelsKey';
const regionKey = keyPrefix + 'regionKey';
const textModelKey = keyPrefix + 'textModelKey';
const imageModelKey = keyPrefix + 'imageModelKey';
const allModelKey = keyPrefix + 'allModelKey';
const imageSizeKey = keyPrefix + 'imageSizeKey';
const modelUsageKey = keyPrefix + 'modelUsageKey';
const systemPromptsKey = keyPrefix + 'systemPromptsKey';
const currentSystemPromptKey = keyPrefix + 'currentSystemPromptKey';
const currentVoiceSystemPromptKey = keyPrefix + 'currentVoiceSystemPromptKey';
const currentPromptIdKey = keyPrefix + 'currentPromptIdKey';
const openAIProxyEnabledKey = keyPrefix + 'openAIProxyEnabledKey';
const thinkingEnabledKey = keyPrefix + 'thinkingEnabledKey';
const modelOrderKey = keyPrefix + 'modelOrderKey';
const voiceIdKey = keyPrefix + 'voiceIdKey';
const tokenInfoKey = keyPrefix + 'tokenInfo';

let currentApiUrl: string | undefined;
let currentApiKey: string | undefined;
let currentOllamaApiUrl: string | undefined;
let currentDeepSeekApiKey: string | undefined;
let currentOpenAIApiKey: string | undefined;
let currentOpenAICompatApiKey: string | undefined;
let currentOpenAICompatApiURL: string | undefined;
let currentRegion: string | undefined;
let currentImageModel: Model | undefined;
let currentTextModel: Model | undefined;
let currentSystemPrompts: SystemPrompt[] | undefined;
let currentOpenAIProxyEnabled: boolean | undefined;
let currentThinkingEnabled: boolean | undefined;
let currentModelOrder: Model[] | undefined;

export function saveMessages(
  sessionId: number,
  messages: SwiftChatMessage[],
  usage: Usage
): void {
  messages[0].usage = usage;
  messages.forEach((message, index) => {
    if (index !== 0 && 'usage' in message) {
      delete message.usage;
    }
  });
  storage.set(sessionIdPrefix + sessionId, JSON.stringify(messages));
}

export function saveMessageList(
  sessionId: number,
  fistMessage: SwiftChatMessage,
  chatMode: ChatMode
): void {
  let allMessageStr = getMessageListStr();
  const currentMessageStr = JSON.stringify({
    id: sessionId,
    title: fistMessage.text.substring(0, 50).replaceAll('\n', ' '),
    mode: chatMode.toString(),
    timestamp: (fistMessage.createdAt as Date).getTime(),
  });
  if (allMessageStr.length === 1) {
    allMessageStr = currentMessageStr + allMessageStr;
  } else {
    allMessageStr = currentMessageStr + ',' + allMessageStr;
  }
  storage.set(messageListKey, allMessageStr);
  storage.set(currentSessionIdKey, sessionId);
}

export function getMessageList(): Chat[] {
  return JSON.parse('[' + getMessageListStr()) as Chat[];
}

export function updateMessageList(chatList: Chat[]): void {
  if (chatList.length > 0) {
    storage.set(messageListKey, JSON.stringify(chatList).substring(1));
  } else {
    storage.delete(messageListKey);
  }
}

function getMessageListStr(): string {
  return storage.getString(messageListKey) ?? ']';
}

export function getMessagesBySessionId(sessionId: number): SwiftChatMessage[] {
  const messageStr = storage.getString(sessionIdPrefix + sessionId);
  if (messageStr) {
    return JSON.parse(messageStr) as SwiftChatMessage[];
  }
  return [];
}

export function deleteMessagesBySessionId(sessionId: number): void {
  storage.delete(sessionIdPrefix + sessionId);
}

export function getSessionId(): number {
  return storage.getNumber(currentSessionIdKey) ?? 0;
}

export function saveKeys(apiUrl: string, apiKey: string): void {
  if (apiUrl.endsWith('/')) {
    apiUrl = apiUrl.slice(0, -1);
  }
  saveApiUrl(apiUrl);
  saveApiKey(apiKey);
  currentApiKey = apiKey;
  currentApiUrl = apiUrl;
}

export function getApiUrl(): string {
  if (currentApiUrl) {
    return currentApiUrl;
  } else {
    currentApiUrl = storage.getString(apiUrlKey) ?? '';
    return currentApiUrl;
  }
}

export function getOllamaApiUrl(): string {
  if (currentOllamaApiUrl) {
    return currentOllamaApiUrl;
  } else {
    currentOllamaApiUrl = storage.getString(ollamaApiUrlKey) ?? '';
    return currentOllamaApiUrl;
  }
}

export function getApiKey(): string {
  if (currentApiKey) {
    return currentApiKey;
  } else {
    currentApiKey = encryptStorage.getString(apiKeyTag) ?? '';
    return currentApiKey;
  }
}

export function getDeepSeekApiKey(): string {
  if (currentDeepSeekApiKey) {
    return currentDeepSeekApiKey;
  } else {
    currentDeepSeekApiKey = encryptStorage.getString(deepSeekApiKeyTag) ?? '';
    return currentDeepSeekApiKey;
  }
}

export function getOpenAIApiKey(): string {
  if (currentOpenAIApiKey) {
    return currentOpenAIApiKey;
  } else {
    currentOpenAIApiKey = encryptStorage.getString(openAIApiKeyTag) ?? '';
    return currentOpenAIApiKey;
  }
}

export function getOpenAICompatApiKey(): string {
  if (currentOpenAICompatApiKey) {
    return currentOpenAICompatApiKey;
  } else {
    currentOpenAICompatApiKey =
      encryptStorage.getString(openAICompatApiKeyTag) ?? '';
    return currentOpenAICompatApiKey;
  }
}

export function getOpenAICompatApiURL(): string {
  if (currentOpenAICompatApiURL) {
    return currentOpenAICompatApiURL;
  } else {
    currentOpenAICompatApiURL = storage.getString(openAICompatApiURLKey) ?? '';
    return currentOpenAICompatApiURL;
  }
}

export function getOpenAICompatModels(): string {
  return storage.getString(openAICompatModelsKey) ?? '';
}

export function saveOpenAICompatApiKey(apiKey: string): void {
  currentOpenAICompatApiKey = apiKey;
  encryptStorage.set(openAICompatApiKeyTag, apiKey);
}

export function saveOpenAICompatApiURL(apiUrl: string): void {
  currentOpenAICompatApiURL = apiUrl;
  storage.set(openAICompatApiURLKey, apiUrl);
}

export function saveOpenAICompatModels(models: string): void {
  storage.set(openAICompatModelsKey, models);
}

export function saveHapticEnabled(enabled: boolean): void {
  storage.set(hapticEnabledKey, enabled);
}

export function getHapticEnabled(): boolean {
  return storage.getBoolean(hapticEnabledKey) ?? true;
}

export function saveApiUrl(apiUrl: string): void {
  storage.set(apiUrlKey, apiUrl);
}

export function saveApiKey(apiKey: string): void {
  encryptStorage.set(apiKeyTag, apiKey);
}

export function saveOllamaApiURL(apiUrl: string): void {
  currentOllamaApiUrl = apiUrl;
  storage.set(ollamaApiUrlKey, apiUrl);
}

export function saveDeepSeekApiKey(apiKey: string): void {
  currentDeepSeekApiKey = apiKey;
  encryptStorage.set(deepSeekApiKeyTag, apiKey);
}

export function saveOpenAIApiKey(apiKey: string): void {
  currentOpenAIApiKey = apiKey;
  encryptStorage.set(openAIApiKeyTag, apiKey);
}

export function saveRegion(region: string): void {
  currentRegion = region;
  storage.set(regionKey, region);
}

export function getRegion(): string {
  if (currentRegion) {
    return currentRegion;
  } else {
    currentRegion = storage.getString(regionKey) ?? DefaultRegion;
    return currentRegion;
  }
}

export function saveTextModel(model: Model): void {
  currentTextModel = model;
  storage.set(textModelKey, JSON.stringify(model));
}

export function getTextModel(): Model {
  if (currentTextModel) {
    return currentTextModel;
  } else {
    const modelString = storage.getString(textModelKey) ?? '';
    if (modelString.length > 0) {
      currentTextModel = JSON.parse(modelString) as Model;
    } else {
      currentTextModel = getDefaultTextModels()[0];
    }
    return currentTextModel;
  }
}

export function saveImageModel(model: Model): void {
  currentImageModel = model;
  storage.set(imageModelKey, JSON.stringify(model));
}

export function getImageModel(): Model {
  if (currentImageModel) {
    return currentImageModel;
  } else {
    const modelString = storage.getString(imageModelKey) ?? '';
    if (modelString.length > 0) {
      currentImageModel = JSON.parse(modelString) as Model;
    } else {
      currentImageModel = getDefaultImageModels()[0];
    }
    return currentImageModel;
  }
}

export function saveAllModels(allModels: AllModel): void {
  storage.set(allModelKey, JSON.stringify(allModels));
}

export function getAllModels(): AllModel {
  const modelString = storage.getString(allModelKey) ?? '';
  if (modelString.length > 0) {
    return JSON.parse(modelString) as AllModel;
  }
  return {
    imageModel: getDefaultImageModels(),
    textModel: getDefaultTextModels(),
  };
}

export function getAllImageSize(imageModelId: string = ''): string[] {
  if (isNewStabilityImageModel(imageModelId)) {
    return ['1024 x 1024'];
  }
  if (isNovaCanvas(imageModelId)) {
    return ['1024 x 1024'];
  }
  return ['512 x 512', '1024 x 1024'];
}

export function isNewStabilityImageModel(modelId: string): boolean {
  return (
    modelId === 'stability.sd3-large-v1:0' ||
    modelId === 'stability.stable-image-ultra-v1:0' ||
    modelId === 'stability.stable-image-core-v1:0'
  );
}

export function isNovaCanvas(modelId: string): boolean {
  return modelId.includes('nova-canvas');
}

export function saveImageSize(size: string): void {
  storage.set(imageSizeKey, size);
}

export function getImageSize(): string {
  const allSizes = getAllImageSize();
  return storage.getString(imageSizeKey) ?? allSizes[1];
}

export function saveVoiceId(voiceId: string): void {
  storage.set(voiceIdKey, voiceId);
}

export function getVoiceId(): string {
  return storage.getString(voiceIdKey) ?? VoiceIDList[0].voiceId;
}

export function getModelUsage(): Usage[] {
  const usage = storage.getString(modelUsageKey);
  return usage ? JSON.parse(usage) : [];
}

export function updateTotalUsage(usage: Usage): void {
  const currentUsage = getModelUsage();
  const modelIndex = currentUsage.findIndex(
    m => m.modelName === usage.modelName
  );
  if (modelIndex >= 0) {
    if (usage.imageCount) {
      currentUsage[modelIndex].imageCount! += usage.imageCount;
    } else if (usage.smallImageCount) {
      currentUsage[modelIndex].smallImageCount! += usage.smallImageCount;
    } else if (usage.largeImageCount) {
      currentUsage[modelIndex].largeImageCount! += usage.largeImageCount;
    } else {
      currentUsage[modelIndex].inputTokens += usage.inputTokens;
      currentUsage[modelIndex].outputTokens += usage.outputTokens;
    }
  } else {
    currentUsage.push(usage);
  }
  storage.set(modelUsageKey, JSON.stringify(currentUsage));
}

export function saveCurrentSystemPrompt(prompts: SystemPrompt | null): void {
  storage.set(currentSystemPromptKey, prompts ? JSON.stringify(prompts) : '');
}

export function getCurrentSystemPrompt(): SystemPrompt | null {
  const promptString = storage.getString(currentSystemPromptKey) ?? '';
  if (promptString.length > 0) {
    return JSON.parse(promptString) as SystemPrompt;
  }
  return null;
}

export function saveCurrentVoiceSystemPrompt(prompts: SystemPrompt | null): void {
  storage.set(
    currentVoiceSystemPromptKey,
    prompts ? JSON.stringify(prompts) : ''
  );
}

export function getCurrentVoiceSystemPrompt(): SystemPrompt | null {
  const promptString = storage.getString(currentVoiceSystemPromptKey) ?? '';
  if (promptString.length > 0) {
    return JSON.parse(promptString) as SystemPrompt;
  }
  return null;
}

export function saveSystemPrompts(prompts: SystemPrompt[], type?: string): void {
  // get all prompt
  currentSystemPrompts = prompts;
  const promptsString = storage.getString(systemPromptsKey) ?? '';
  let allPrompts: SystemPrompt[] = [];

  if (promptsString.length > 0) {
    allPrompts = JSON.parse(promptsString) as SystemPrompt[];
  }
  const updatedPrompts = [
    ...allPrompts.filter(p => p.promptType !== type),
    ...prompts,
  ];
  storage.set(systemPromptsKey, JSON.stringify(updatedPrompts));
}

export function saveAllSystemPrompts(prompts: SystemPrompt[]): void {
  storage.set(systemPromptsKey, JSON.stringify(prompts));
}

export function getSystemPrompts(type?: string): SystemPrompt[] {
  if (currentSystemPrompts && currentSystemPrompts[0].promptType === type) {
    return currentSystemPrompts;
  }
  const promptsString = storage.getString(systemPromptsKey) ?? '';
  if (promptsString.length > 0) {
    currentSystemPrompts = JSON.parse(promptsString) as SystemPrompt[];
    if (
      currentSystemPrompts.filter(p => p.promptType === 'voice').length === 0
    ) {
      currentSystemPrompts = currentSystemPrompts.concat(
        DefaultVoiceSystemPrompts
      );
      saveAllSystemPrompts(currentSystemPrompts);
    }
  } else {
    currentSystemPrompts = getDefaultSystemPrompts();
  }
  currentSystemPrompts = type
    ? currentSystemPrompts.filter(p => p.promptType === type)
    : currentSystemPrompts.filter(p => p.promptType === undefined);
  return currentSystemPrompts;
}

export function getPromptId(): number {
  return storage.getNumber(currentPromptIdKey) ?? 0;
}

export function savePromptId(promptId: number): void {
  storage.set(currentPromptIdKey, promptId);
}

export function saveOpenAIProxyEnabled(enabled: boolean): void {
  currentOpenAIProxyEnabled = enabled;
  storage.set(openAIProxyEnabledKey, enabled);
}

export function getOpenAIProxyEnabled(): boolean {
  if (currentOpenAIProxyEnabled !== undefined) {
    return currentOpenAIProxyEnabled;
  } else {
    currentOpenAIProxyEnabled =
      storage.getBoolean(openAIProxyEnabledKey) ?? false;
    return currentOpenAIProxyEnabled;
  }
}

export function saveThinkingEnabled(enabled: boolean): void {
  currentThinkingEnabled = enabled;
  storage.set(thinkingEnabledKey, enabled);
}

export function getThinkingEnabled(): boolean {
  if (currentThinkingEnabled !== undefined) {
    return currentThinkingEnabled;
  } else {
    currentThinkingEnabled = storage.getBoolean(thinkingEnabledKey) ?? true;
    return currentThinkingEnabled;
  }
}

// Model order functions
export function saveModelOrder(models: Model[]): void {
  currentModelOrder = models;
  storage.set(modelOrderKey, JSON.stringify(models));
}

export function getModelOrder(): Model[] {
  if (currentModelOrder) {
    return currentModelOrder;
  } else {
    const modelOrderString = storage.getString(modelOrderKey) ?? '';
    if (modelOrderString.length > 0) {
      currentModelOrder = JSON.parse(modelOrderString) as Model[];
    } else {
      currentModelOrder = [];
    }
    return currentModelOrder;
  }
}

// Update model order when a model is used
export function updateTextModelUsageOrder(model: Model): Model[] {
  const currentOrder = getModelOrder();
  const updatedOrder = [
    model,
    ...currentOrder.filter(m => m.modelId !== model.modelId),
  ];
  saveModelOrder(updatedOrder);
  return updatedOrder;
}

// Get merged model order - combines history with current available models
export function getMergedModelOrder(): Model[] {
  const historyModels = getModelOrder();
  const currentTextModels = (getAllModels()).textModel;
  const currentModelMap = new Map<string, Model>();
  currentTextModels.forEach(model => {
    currentModelMap.set(model.modelId, model);
  });
  const mergedModels: Model[] = [];
  historyModels.forEach(model => {
    if (currentModelMap.has(model.modelId)) {
      mergedModels.push(currentModelMap.get(model.modelId)!);
      currentModelMap.delete(model.modelId);
    }
  });
  currentModelMap.forEach(model => {
    mergedModels.push(model);
  });

  return mergedModels;
}

// token related methods
export function saveTokenInfo(tokenInfo: TokenResponse): void {
  encryptStorage.set(tokenInfoKey, JSON.stringify(tokenInfo));
}

export function getTokenInfo(): TokenResponse | null {
  const tokenInfoStr = encryptStorage.getString(tokenInfoKey);
  if (tokenInfoStr) {
    return JSON.parse(tokenInfoStr) as TokenResponse;
  }
  return null;
}

export function isTokenValid(): boolean {
  const tokenInfo = getTokenInfo();
  if (!tokenInfo) {
    return false;
  }
  const expirationDate = new Date(tokenInfo.expiration).getTime();
  const now = new Date().getTime();
  return expirationDate > now + 10 * 60 * 1000;
}

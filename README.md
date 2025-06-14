# SwiftChat - A Cross-platform AI Chat App

> 🚀 Your Personal AI Assistant - Fast, Private, and Cross-platform

[![GitHub Release](https://img.shields.io/github/v-release/aws-samples/swift-chat)](https://github.com/aws-samples/swift-chat/releases)
[![License](https://img.shields.io/badge/license-MIT--0-green)](LICENSE)

## 📱 Quick Download

- [Download for Android](https://github.com/aws-samples/swift-chat/releases/download/2.3.0/SwiftChat.apk)
- [Download for macOS](https://github.com/aws-samples/swift-chat/releases/download/2.3.0/SwiftChat.dmg)
- For iOS: Currently available through local build with Xcode

[中文](/README_CN.md)

SwiftChat is a fast and responsive AI chat application developed with [React Native](https://reactnative.dev/) and
powered by [Amazon Bedrock](https://aws.amazon.com/bedrock/), with compatibility extending to other model providers such
as Ollama, DeepSeek, OpenAI and OpenAI Compatible. With its minimalist design philosophy and robust privacy protection,
it delivers real-time streaming conversations, AI image generation and voice conversation assistant capabilities
across Android, iOS, and macOS platforms.

![](assets/promo.avif)

### What's New 🔥

- 🚀 Support Speech to Speech By Amazon Nova Sonic on Apple Platform. Check [How to Use](#amazon-nova-sonic) for
  more details. (From v2.3.0).
- Support Request Latency and token response speed display (From v2.3.0).
- Change to new bubble format UI for user question (From v2.3.0).
- Support for OpenAI Compatible models. You can now
  use [easy-model-deployer](https://github.com/aws-samples/easy-model-deployer),
  OpenRouter, or any OpenAI-compatible model provider via SwiftChat. Please
  check [Configure OpenAI Compatible](#openai-compatible) section for more details(From v2.2.0).

### Key Features

- Real-time streaming chat with AI
- Rich Markdown Support: Tables, Code Blocks, LaTeX and More
- AI image generation with progress
- Multimodal support (images, videos & documents)
- Conversation history list view and management
- Cross-platform support (Android, iOS, macOS)
- Tablet-optimized for iPad and Android tablets
- Fast launch and responsive performance
- Multiple AI model
  supported ([Amazon Bedrock](https://aws.amazon.com/bedrock/), [Ollama](https://github.com/ollama/ollama), [DeepSeek](https://www.deepseek.com/), [OpenAI](https://openai.com/)
  and [OpenAI Compatible](#openai-compatible) Models)
- Fully Customizable System Prompt Assistant

### Amazon Nova Series Features

#### Amazon Nova Sonic Speech to Speech Model

**Usage Guide**

1. Amazon Nova Sonic model is supported starting from v2.3.0. If you have deployed it before, You Need to:
    * [Update CloudFormation](#upgrade-cloudformation) Stack
    * [Update API](#upgrade-api)
    * [Upgrade your App](#-quick-download) to v2.3.0 or later

   If you have not Deployed your CloudFormation Stack please
   finish [Getting Started with Amazon Bedrock](#getting-started-with-amazon-bedrock) section.
2. Switch the **Region** to `us-east-1` in the settings page and select the `Nova Sonic` under **Chat Model**.
3. Return to Chat page, select a system prompt or directly click the microphone icon to start your conversation.

**Features for Speech to Speech**

1. Built-in spoken language practice for words and sentences, as well as storytelling scenarios. You can also add
   **Custom System Prompts** for voice chatting in different scenarios.
2. Support **Barge In** by default, Also you can disable in system prompt.
3. Support selecting voices in the settings page, including American/British English, and options for male and female voices.
4. Support **Echo Cancellation**, You can talk directly to the device without wearing headphones.
5. Support **Voice Waveform** to display volume level.

**General Talk**

https://github.com/user-attachments/assets/d3028312-c420-476c-88c2-ba870015f3c4

**Learn Sentences**

https://github.com/user-attachments/assets/ebf21b12-9c93-4d2e-a109-1d6484019838

**Telling Story on Mac (With barge in feature)**

https://github.com/user-attachments/assets/c70fc2b4-8960-4a5e-b4f8-420fcd5eafd4

#### Other Features

- Record 30-second videos directly on Android and iOS for Nova analysis
- Upload large videos (1080p/4K) beyond 8MB with auto compression
- Support using natural language to make Nova Canvas generate images, remove backgrounds, replace backgrounds, and
  create images in similar styles.

### Feature Showcase

#### YouTube Video

[<img src="./assets/youtube.avif">](https://www.youtube.com/watch?v=rey05WzfEbM)
> The content in the video is an early version. For UI, architecture, and inconsistencies, please refer to the current
> documentation.

**Comprehensive Multimodal Analysis**: Text, Image, Document and Video

<div style="display: flex; flex-direction: 'row'; background-color: #888888;">
<img src="assets/animations/text_streaming.avif" width=24%>
<img src="assets/animations/image_summary.avif" width=24%>
<img src="assets/animations/doc_summary.avif" width=24%>
<img src="assets/animations/video_summary.avif" width=24%>
</div>

**Creative Image Suite**: Generation, Style Replication, Background Removal & Replacement with Nova Canvas

<div style="display: flex; flex-direction: 'row'; background-color: #888888;">
<img src="assets/animations/gen_image.avif" width=24%>
<img src="assets/animations/similar_style.avif" width=24%>
<img src="assets/animations/remove_background.avif" width=24%>
<img src="assets/animations/replace_background.avif" width=24%>
</div>

**System Prompt Assistant**: Useful Preset System Prompts with Full Management Capabilities (Add/Edit/Sort/Delete)

![](assets/animations/english_teacher.avif)

**Rich Markdown Support**: Paragraph, Code Blocks, Tables, LaTeX and More

![](assets/markdown.avif)

We redesigned the UI with optimized font sizes and line spacing for a more elegant and clean presentation.
All of these features are also seamlessly displayed on Android and macOS with native UI

> Note: Some animated images have been sped up for demonstration. If you experience lag, please view on Chrome, Firefox,
> or Edge browser on your computer.

## Architecture

![](/assets/architecture.avif)

By default, we use **AWS App Runner**, which is commonly used to host Python FastAPI servers, offering high performance,
scalability and low latency.

Alternatively, we provide the option to replace App Runner with **AWS Lambda** using Function URL for a more
cost-effective
solution, as shown in
this [example](https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/fastapi-response-streaming).

## Getting Started with Amazon Bedrock

### Prerequisites

Ensure you have access to Amazon Bedrock foundation models. SwiftChat default settings are:

- Region: `us-west-2`
- Chat Model: `Amazon Nova Pro`
- Image Model: `Stable Diffusion 3.5 Large`

If you are using the image generation feature, please make sure you have enabled access to the `Amazon Nova Lite` model.
Please follow
the [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html) to
enable your models.

<details>
<summary><b>🔧 Configuration Steps (Click to expand)</b></summary>

### Step 1: Set up your API Key

1. Sign in to your AWS console and
   right-click [Parameter Store](https://console.aws.amazon.com/systems-manager/parameters/) to open it in a new tab.
2. Check whether you are in the [supported region](#supported-region), then click on the **Create parameter** button.
3. Fill in the parameters below, leaving other options as default:

    - **Name**: Enter a parameter name (e.g., "SwiftChatAPIKey", will be used as `ApiKeyParam` in Step 2).

    - **Type**: Select `SecureString`

    - **Value**: Enter any string without spaces.(this will be your `API Key` in Step 3)

4. Click **Create parameter**.

### Step 2: Deploy stack and get your API URL

1. Click one of the following buttons to launch the CloudFormation Stack in the same region where your API Key was
   created.

    - **App Runner**

      [![Launch Stack](assets/launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/template?stackName=SwiftChatAPI&templateURL=https://aws-gcr-solutions.s3.amazonaws.com/swift-chat/latest/SwiftChatAppRunner.template)

    - **Lambda** (Note: For AWS customer use only)

      [![Launch Stack](assets/launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/template?stackName=SwiftChatLambda&templateURL=https://aws-gcr-solutions.s3.amazonaws.com/swift-chat/latest/SwiftChatLambda.template)

2. Click **Next**, On the "Specify stack details" page, provide the following information:
    - Fill the `ApiKeyParam` with the parameter name you used for storing the API key (e.g., "SwiftChatAPIKey").
    - For App Runner, choose an `InstanceTypeParam` based on your needs.
3. Click **Next**, Keep the "Configure stack options" page as default, Read the Capabilities and Check the "I
   acknowledge that AWS CloudFormation might create IAM resources" checkbox at the bottom.
4. Click **Next**, In the "Review and create" Review your configuration and click **Submit**.

Wait about 3-5 minutes for the deployment to finish, then click the CloudFormation stack and go to **Outputs** tab, you
can find the **API URL** which looks like: `https://xxx.xxx.awsapprunner.com` or `https://xxx.lambda-url.xxx.on.aws`

### Step 3: Open the App and setup with API URL and API Key

1. Launch the App, open the drawer menu, and tap **Settings**.
2. Paste the `API URL` and `API Key`(The **Value** you typed in Parameter Store) then select the Region.
3. Click the top right ✓ icon to save your configuration and start your chat.

Congratulations 🎉 Your SwiftChat App is ready to use!
</details>

### Supported Region

- US East (N. Virginia): us-east-1
- US West (Oregon): us-west-2
- Asia Pacific (Mumbai): ap-south-1
- Asia Pacific (Singapore): ap-southeast-1
- Asia Pacific (Sydney): ap-southeast-2
- Asia Pacific (Tokyo): ap-northeast-1
- Canada (Central): ca-central-1
- Europe (Frankfurt): eu-central-1
- Europe (London): eu-west-2
- Europe (Paris): eu-west-3
- South America (São Paulo): sa-east-1

## 🧠 Language Models & AI Configuration

### Default LLM: Amazon Nova Pro

SwiftChat uses **Amazon Nova Pro** as the default language model, which provides an excellent balance of capabilities for mobile chat applications:

#### About Amazon Nova Pro
- **Type**: Highly capable multimodal model (text, images, video)
- **Strengths**: Best combination of accuracy, speed, and cost
- **Use Cases**: Wide range of conversational AI tasks
- **Capabilities**: 
  - Text understanding and generation
  - Image analysis and description
  - Video content processing
  - Agentic capabilities and UI actuation
- **Performance**: Optimized for real-time streaming conversations
- **Cost**: Competitive pricing in the Nova model family

Amazon Nova Pro is part of AWS's new generation of foundation models that deliver frontier intelligence with industry-leading price performance. It excels in conversational AI scenarios and provides robust multimodal capabilities perfect for mobile chat applications.

**Learn More**: [Amazon Nova Documentation](https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html)

### 📱 Mobile-Optimized Alternatives

For developers seeking **ultra-lightweight, on-device AI** that runs directly on mobile hardware without cloud dependencies, consider these mobile-first alternatives:

#### Google Gemma 3 1B - Recommended Mobile Option
- **Size**: Only 529MB (int4 quantized)
- **Performance**: Up to 2,585 tokens/sec on mobile devices
- **Memory**: ~2GB dynamic memory footprint
- **Capabilities**:
  - Fast text generation and understanding
  - On-device processing (privacy-first)
  - Customizable and fine-tunable
  - Optimized for Android and web deployment
- **Benefits**:
  - ✅ No internet required after download
  - ✅ Complete privacy (data never leaves device)
  - ✅ Ultra-low latency responses
  - ✅ Reduced API costs
  - ✅ Works offline

#### Google Gemma 3n (Preview) - Next-Generation Mobile AI
- **Architecture**: Mobile-first design with Per-Layer Embeddings (PLE)
- **Models**: 5B and 8B parameters with 2GB/3GB memory footprint
- **Innovation**: Advanced architecture shared with Gemini Nano
- **Collaboration**: Optimized with Qualcomm, MediaTek, and Samsung
- **Target**: Real-time multimodal AI on phones, tablets, laptops

### 🔄 Model Comparison Matrix

| Model | Type | Size | Latency | Privacy | Cost | Best For |
|-------|------|------|---------|---------|------|----------|
| **Amazon Nova Pro** | Cloud | N/A | Low | Cloud-based | Pay-per-use | Full-featured chat, multimodal |
| **Gemma 3 1B** | On-device | 529MB | Ultra-low | Complete | One-time | Mobile apps, offline use |
| **Gemma 3n** | On-device | 2-3GB | Ultra-low | Complete | One-time | Advanced mobile AI |
| **Nova Micro** | Cloud | N/A | Lowest | Cloud-based | Very low cost | Simple text tasks |
| **Nova Lite** | Cloud | N/A | Very low | Cloud-based | Low cost | Multimodal, fast processing |

### 🛠 How to Switch Models

#### Changing Cloud Models (Nova Family)
1. Open SwiftChat **Settings**
2. Navigate to **Model Configuration**
3. Select your preferred region (e.g., `us-west-2` for Nova Pro)
4. Choose from available models:
   - `Amazon Nova Micro` (text-only, lowest cost)
   - `Amazon Nova Lite` (multimodal, very low cost)
   - `Amazon Nova Pro` (recommended, balanced performance)
   - `Amazon Nova Premier` (most capable, complex tasks)

#### Implementing On-Device Models (Advanced)
For developers interested in implementing Gemma 3 or other on-device models:

```bash
# Example: Adding Gemma 3 1B support
npm install @google-ai/generativelanguage
# or
npm install @huggingface/transformers
```

**Note**: On-device model integration requires additional development work and is not currently built into SwiftChat's default configuration. This would be a custom implementation for advanced users.

### 💡 Model Selection Recommendations

#### Choose **Amazon Nova Pro** (Default) if:
- ✅ You want the best out-of-the-box experience
- ✅ You need multimodal capabilities (text + images + video)
- ✅ You prefer cloud-based processing
- ✅ You want regular model updates and improvements
- ✅ You're building a production app with reliable performance

#### Choose **Mobile Models (Gemma)** if:
- ✅ Privacy is your top priority
- ✅ You need offline functionality
- ✅ You want to minimize API costs
- ✅ You're building for resource-constrained environments
- ✅ You need ultra-low latency responses
- ✅ You're comfortable with custom implementation

### 🔮 Future Roadmap

We're actively exploring integration of mobile-optimized models like Gemma 3 into SwiftChat to provide:
- **Hybrid Mode**: Automatic switching between cloud and on-device models
- **Privacy Mode**: Complete on-device processing option
- **Offline Mode**: Full functionality without internet connection
- **Custom Model Support**: Easy integration of third-party models

**Stay tuned** for updates on mobile-first AI integration in future SwiftChat releases!

## Getting Started with Other Model Providers

### Ollama

<details>
<summary><b>🔧 Configure Ollama (Click to expand)</b></summary>

1. Navigate to the **Settings Page** and select the **Ollama** tab.
2. Enter your Ollama Server URL. For example:
    ```bash
    http://localhost:11434
    ```
3. Once the correct Server URL is entered, you can select your desired Ollama models from the **Chat Model** dropdown
   list.

</details>

### DeepSeek

<details>
<summary><b>🔧 Configure DeepSeek (Click to expand)</b></summary>

1. Go to the **Settings Page** and select the **DeepSeek** tab.
2. Input your DeepSeek API Key.
3. Choose DeepSeek models from the **Chat Model** dropdown list. Currently, the following DeepSeek models are supported:
    - `DeepSeek-V3`
    - `DeepSeek-R1`

</details>

### OpenAI

<details>
<summary><b>🔧 Configure OpenAI (Click to expand)</b></summary>

1. Navigate to the **Settings Page** and select the **OpenAI** tab.
2. Enter your OpenAI API Key.
3. Select OpenAI models from the **Chat Model** dropdown list. The following OpenAI models are currently supported:
    - `GPT-4o`
    - `GPT-4o mini`
    - `GPT-4.1`
    - `GPT-4.1 mini`
    - `GPT-4.1 nano`

Additionally, if you have deployed the [ClickStream Server](#step-2-deploy-stack-and-get-your-api-url), you can enable
the **Use Proxy** option to forward your requests.

</details>

### OpenAI Compatible

<details>
<summary><b>🔧 Configure OpenAI Compatible models (Click to expand)</b></summary>

1. Navigate to the **Settings Page** and select the **OpenAI** tab.
2. Under **OpenAI Compatible**, enter the following information:
    - `Base URL` of your model provider
    - `API Key` of your model provider
    - `Model ID` of the models you want to use (separate multiple models with commas)
3. Select one of your models from the **Chat Model** dropdown list.

</details>

## Detailed Features

**Quick Access Tools**: Code & Content Copy, Selection Mode, Model Switch, Regenerate, Scroll Controls and Token Counter

<div style="display: flex; flex-direction: 'row'; background-color: #888888;">
<img src="assets/animations/copy.avif" width=32%>
<img src="assets/animations/regenerate.avif" width=32%>
<img src="assets/animations/scroll_token.avif" width=32%>
</div>

We feature streamlined chat History, Settings pages, and intuitive Usage statistics:

![](assets/history_settings.avif)

### Message Handling

- [x] Text copy support:
    - Copy button at the bottom of messages, or directly click the model name or user title section.
    - Copy button in code blocks
    - Direct Select and copy code on macOS (double click or long click on iOS)
    - Long press text to copy entire sentence (Right-click on macOS)
- [x] Text selection mode by click selection button.
- [x] Message timeline view in history
- [x] Delete messages through long press in history
- [x] Click to preview for documents videos and images

### Image Features

- [x] Support image generation with Chinese prompts(Make sure `Amazon Nova Lite` is enabled in your selected region)
- [x] Long press images to save or share
- [x] Automatic image compression to improve response speed

### User Experience

- [x] Haptic feedback for Android and iOS (can be disabled in Settings)
- [x] Support landscape mode on Android/iOS devices
- [x] Double tap title bar to scroll to top
- [x] Click bottom arrow to view latest messages
- [x] Display system prompt and model switch icon again by clicking on the chat title
- [x] View current session token usage by tapping twice Chat title
- [x] Check detailed token usage and image generation count in Settings
- [x] In-app upgrade notifications (Android & macOS)

We have optimized the layout for landscape mode. As shown below, you can comfortably view table/code contents in
landscape orientation.

![](assets/animations/landscape.avif)

## What Makes SwiftChat Really "Swift"?

🚀 **Fast Launch Speed**

- Thanks to the **AOT** (Ahead of Time) compilation of RN Hermes engine
- Added **lazy loading** of complex components
- App launches instantly and is immediately ready for input

🌐 **Fast Request Speed**

- Speed up end-to-end API requests through **image compression**
- Deploying APIs in the **same region** as Bedrock provides lower latency

📱 **Fast Render Speed**

- Using `useMemo` and custom caching to creates secondary cache for session content
- Reduce unnecessary re-renders and speed up streaming messages display
- All UI components are rendered as **native components**

📦 **Fast Storage Speed**

- By using **react-native-mmkv** Messages can be read, stored, and updated **10x faster** than AsyncStorage
- Optimized session content and session list storage structure to accelerates history list display

## App Privacy & Security

- Encrypted API key storage
- Minimal permission requirements
- Local-only data storage
- No user behavior tracking
- No data collection
- Privacy-first approach

## 🎉 Expo Migration Success

**Great News!** SwiftChat has been successfully migrated to Expo managed workflow!

✅ **Migration Completed**: The app now runs seamlessly on Expo with all core features working
✅ **Text Rendering Fixed**: Resolved upside-down text issues in chat messages
✅ **Native Module Compatibility**: All incompatible modules replaced with Expo-compatible alternatives
✅ **Cross-Platform Ready**: Enhanced support for iOS, Android, and Web platforms
✅ **Simplified Development**: Easier setup, faster iteration, and streamlined deployment

The Expo version is now the **recommended approach** for development and deployment.

## App Build and Development

SwiftChat now supports **two development approaches**:

1. **🚀 Expo Managed Workflow** (Recommended) - Located in `expo-wrapper/` folder
2. **⚙️ Bare React Native** (Legacy) - Located in `react-native/` folder

### 🚀 Expo Managed Workflow (Recommended)

The Expo version provides easier setup, better cross-platform compatibility, and simplified deployment.

#### Prerequisites

```bash
# Install Node.js (v18 or later)
# Install Expo CLI globally
npm install -g @expo/cli

# Clone the repository
git clone <repository-url>
cd client/expo-wrapper
```

#### Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

#### Platform-Specific Development

##### 📱 **iOS Development**

**Option 1: Physical Device (Recommended)**
```bash
# Start Expo development server
npx expo start

# Scan QR code with:
# - Camera app (iOS 11+)
# - Expo Go app from App Store
```

**Option 2: iOS Simulator**
```bash
# Start development server
npx expo start

# Press 'i' to open iOS Simulator
# (Requires Xcode installed on macOS)
```

**Option 3: Development Build**
```bash
# Create development build
npx expo install expo-dev-client
npx expo run:ios

# This creates a custom development build with native modules
```

##### 🤖 **Android Development**

**Option 1: Physical Device**
```bash
# Enable Developer Options and USB Debugging on your device
# Start development server
npx expo start

# Scan QR code with Expo Go app from Google Play Store
# OR press 'a' to install via ADB
```

**Option 2: Android Emulator**
```bash
# Start Android emulator (Android Studio required)
# Start development server
npx expo start

# Press 'a' to open in Android emulator
```

**Option 3: Development Build**
```bash
# Create development build for Android
npx expo run:android
```

##### 🌐 **Web Development**

```bash
# Start web development server
npx expo start --web

# OR
npm run web

# Opens in browser at http://localhost:19006
```

##### 💻 **macOS Development**

Currently, macOS support is available through the legacy React Native build process. Expo web version works in Safari on macOS.

#### Building for Production

##### 📦 **Using Expo Build Service (EAS)**

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure build
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both platforms
eas build --platform all
```

##### 🏪 **App Store Deployment**

```bash
# Submit to App Store (iOS)
eas submit --platform ios

# Submit to Google Play Store (Android)
eas submit --platform android
```

##### 📱 **Local Builds**

```bash
# Build locally for iOS (requires macOS + Xcode)
npx expo run:ios --configuration Release

# Build locally for Android
npx expo run:android --variant release
```

#### Environment Configuration

Create `.env` file in `expo-wrapper/` directory:

```bash
# API Configuration
EXPO_PUBLIC_API_URL=your-api-url
EXPO_PUBLIC_API_KEY=your-api-key

# Optional: Custom app configuration
EXPO_PUBLIC_APP_NAME=SwiftChat
```

#### Expo-Specific Features

- **Over-the-Air Updates**: Push updates without app store approval
- **Expo Go**: Test on device without building
- **EAS Build**: Cloud-based building service
- **EAS Submit**: Automated app store submission
- **Expo Dev Tools**: Enhanced debugging and development tools

### ⚙️ Bare React Native (Legacy)

For advanced users who need full native module control. Located in `react-native/` folder.

#### Prerequisites

```bash
# Install dependencies
cd react-native && npm install && npm start
```

#### Build for Android

```bash
# Open new terminal
npm run android
```

#### Build for iOS

```bash
# Install iOS dependencies (first time only)
cd ios && pod install && cd ..

# Run iOS build
npm run ios
```

#### Build for macOS

1. Execute `npm start`
2. Open `ios/SwiftChat.xcworkspace` in Xcode
3. Change build destination to `My Mac (Mac Catalyst)`
4. Click ▶ Run button

### 🔄 Migration from Bare React Native to Expo

If you're currently using the bare React Native version, you can migrate to Expo:

1. **Backup your current setup**
2. **Switch to expo-wrapper directory**: `cd expo-wrapper`
3. **Install dependencies**: `npm install`
4. **Start development**: `npx expo start`
5. **Test all features** to ensure compatibility
6. **Update your deployment process** to use EAS Build

### 📋 Development Tips

#### Hot Reloading
- **Expo**: Automatic with Fast Refresh
- **Bare RN**: Manual reload may be required

#### Debugging
```bash
# Expo debugging
npx expo start --dev-client

# Open debugger
# Press 'j' in terminal or shake device
```

#### Clearing Cache
```bash
# Clear Expo cache
npx expo start --clear

# Clear npm cache
npm start -- --reset-cache
```

#### Platform-Specific Code
```javascript
import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
  // iOS-specific code
} else if (Platform.OS === 'android') {
  // Android-specific code
} else if (Platform.OS === 'web') {
  // Web-specific code
}
```

### 🚀 Performance Optimization

#### Expo Optimizations
- Use `expo-updates` for OTA updates
- Enable Hermes engine for better performance
- Use `expo-image` for optimized image handling
- Implement code splitting for web builds

#### Bundle Analysis
```bash
# Analyze bundle size
npx expo export --dump-sourcemap
npx expo export --dump-assetmap
```

### 🔧 Troubleshooting

#### Common Issues

**Metro bundler errors:**
```bash
npx expo start --clear
```

**iOS build issues:**
```bash
cd ios && pod install && cd ..
npx expo run:ios
```

**Android build issues:**
```bash
npx expo run:android --clear
```

**Expo Go connection issues:**
- Ensure device and computer are on same network
- Check firewall settings
- Try using tunnel mode: `npx expo start --tunnel`

#### Getting Help

- **Expo Documentation**: https://docs.expo.dev/
- **Expo Discord**: https://chat.expo.dev/
- **GitHub Issues**: Create an issue in this repository

### 📱 Platform Support Matrix

| Platform | Expo Managed | Bare React Native | Status |
|----------|--------------|-------------------|---------|
| iOS | ✅ | ✅ | Fully Supported |
| Android | ✅ | ✅ | Fully Supported |
| Web | ✅ | ❌ | Expo Only |
| macOS | 🔄 | ✅ | Legacy RN Only |

**Legend:**
- ✅ Fully Supported
- 🔄 Partial Support
- ❌ Not Supported

## API Reference

Please refer [API Reference](server/README.md)

## How to upgrade?

### Upgrade App

- **Android** and **macOS**: Navigate to **Settings** Page, if there is a new version, you will find it at the bottom
  of this page, then click the app version to download and install it.
- **iOS**: If a new version is released in the [Release page](https://github.com/aws-samples/swift-chat/releases),
  update your local code, rebuild and install your app by Xcode.

**Note**: After downloading a new version, please check
the [release notes](https://github.com/aws-samples/swift-chat/releases) to see if an API version update is required.

### Upgrade API

- **For AppRunner**: Click and open [App Runner Services](https://console.aws.amazon.com/apprunner/home#/services) page,
  find and open `swiftchat-api`, click top right **Deploy** button.
- **For Lambda**: Click and open [Lambda Services](https://console.aws.amazon.com/lambda/home#/functions), find and open
  your Lambda which start with `SwiftChatLambda-xxx`, click the **Deploy new image** button and click Save.

### Upgrade CloudFormation

1. Click and open [CloudFormation](https://console.aws.amazon.com/cloudformation), switch to the region which you
   have deployed the **SwiftChatAPI** stack.
2. Select the **SwiftChatAPI** Stack, click **Update stack** -> **Make a direct update**
3. On the **Update stack** Page, select **Replace existing template** under the **Amazon S3 URL**, then input the
   following template url.

   For App Runner
    ```
    https://aws-gcr-solutions.s3.amazonaws.com/swift-chat/latest/SwiftChatAppRunner.template
    ``` 
   For Lambda
    ```
    https://aws-gcr-solutions.s3.amazonaws.com/swift-chat/latest/SwiftChatLambda.template
    ``` 
4. Click the **Next** button and continue click **Next** button. On the **Configure stack options** page,
   check `I acknowledge that AWS CloudFormation might create IAM resources.` then click **Next** and *Submit* button to
   update your CloudFormation Template.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the [LICENSE](LICENSE) file.

## Developer Configuration

### Changing the Default Model

SwiftChat currently defaults to **Gemma3 4B** via the **LibreAgents** provider. As a developer, you can easily modify this default to use any supported model or provider.

#### Quick Configuration Steps

1. **Navigate to the Constants file:**
   ```
   expo-wrapper/src/storage/Constants.ts
   ```

2. **Locate the DefaultTextModel configuration:**
   ```typescript
   // DEFAULT MODEL CONFIGURATION
   // ===========================
   // This is the primary default model that appears when the app first loads
   // and when no model has been previously selected by the user.
   export const DefaultTextModel = [
     {
       modelName: 'Gemma3 4B',        // Display name in UI
       modelId: 'gemma3-4b',          // API identifier
       modelTag: ModelTag.Libre,      // Provider tag
     },
   ];
   ```

3. **Update the configuration** with your preferred model:

#### Example Configurations

**For Amazon Nova Pro (Bedrock):**
```typescript
export const DefaultTextModel = [
  {
    modelName: 'Nova Pro',
    modelId: 'us.amazon.nova-pro-v1:0',
    modelTag: ModelTag.Bedrock,
  },
];
```

**For OpenAI GPT-4:**
```typescript
export const DefaultTextModel = [
  {
    modelName: 'GPT-4',
    modelId: 'gpt-4',
    modelTag: ModelTag.OpenAI,
  },
];
```

**For Ollama Models:**
```typescript
export const DefaultTextModel = [
  {
    modelName: 'Llama 3.1',
    modelId: 'llama3.1',
    modelTag: ModelTag.Ollama,
  },
];
```

#### Provider-Specific Model Arrays

Each provider has its own model array that you should also update:

**LibreAgents Models:**
```typescript
export const DefaultLibreModels = [
  {
    modelName: 'Gemma3 4B',
    modelId: 'gemma3-4b',
    modelTag: ModelTag.Libre,
  },
  // Add more LibreAgents models here
];
```

**Bedrock Models:**
```typescript
export const BedrockModels = [
  {
    modelName: 'Nova Pro',
    modelId: 'us.amazon.nova-pro-v1:0',
    modelTag: ModelTag.Bedrock,
  },
  // Add more Bedrock models here
];
```

#### Settings Tab Configuration

If you change the default provider, ensure the corresponding settings tab is available:

1. **Open Settings Screen:**
   ```
   expo-wrapper/src/settings/SettingsScreen.tsx
   ```

2. **Check tab order** (around line 500):
   ```typescript
   <TabButton
     label="Libre"           // Make sure this matches your provider
     isSelected={selectedTab === 'libre'}
     onPress={() => setSelectedTab('libre')}
   />
   ```

3. **Verify provider case** in `renderProviderSettings()` function

#### Greeting Message Configuration

The greeting message will automatically show the provider name for LibreAgents models, or the model name for other providers. This is configured in:

```
expo-wrapper/src/chat/component/EmptyChatComponent.tsx
```

#### Testing Your Changes

1. **Clear app storage** to reset to defaults
2. **Rebuild the app:**
   ```bash
   npx expo start --clear
   ```
3. **Verify** the new default model appears in:
   - Initial app greeting
   - Settings model selection
   - Chat interface

#### Important Notes

- **Provider Dependencies**: Ensure the target provider's API configuration is properly set up
- **Model Availability**: Verify the model ID exists and is accessible via the provider's API
- **UI Consistency**: Update any hardcoded references to the old default model
- **Documentation**: Update any user-facing documentation that references the default model

#### Troubleshooting

**Model not appearing:**
- Check that `ModelTag` enum includes your provider
- Verify the model is included in the provider's model array
- Ensure the settings tab for your provider is uncommented

**API errors:**
- Confirm the `modelId` matches the provider's API specification
- Check that API keys/URLs are configured for the provider
- Verify the model is available in your configured region (for cloud providers)

---

export default {
  name: 'LibreAgents',
  slug: 'libreagents',
  platforms: [
    'ios',
    'android',
    'web',
    'macos',
  ],
  ios: { 
    bundleIdentifier: 'com.libreagents.mobile', 
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: { 
    package: 'com.libreagents.mobile' 
  },
  web: { 
    bundler: 'webpack' 
  },
  extra: {
    eas: {
      projectId: '9fb9c4dd-9ae3-4d53-a672-9ba030bfa9ef',
    },
  },
};

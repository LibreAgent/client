module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ['module-resolver', {
        alias: {
          // This is needed for `react-native-gifted-chat` to work on web
          './node_modules/react-native-gifted-chat/lib/utils': './node_modules/react-native-gifted-chat/lib/utils/index.js',
          // Polyfills for Node.js core modules
          'fs': 'react-native-polyfill-globals/src/fs',
          'path': 'react-native-polyfill-globals/src/path',
          '_stream_transform': 'readable-stream/transform',
          '_stream_readable': 'readable-stream/readable',
          '_stream_writable': 'readable-stream/writable',
          '_stream_duplex': 'readable-stream/duplex',
          '_stream_passthrough': 'readable-stream/passthrough',
          'stream': 'readable-stream/transform',
          'crypto': 'react-native-polyfill-globals/src/crypto',
          'util': 'react-native-polyfill-globals/src/util',
          'url': 'react-native-url-polyfill',
          'buffer': '@craftzdog/react-native-buffer',
          // Stub out native microphone modules for web compatibility
          './src/api/microphone/native/MicrophoneRecorder': './src/api/microphone/web/MicrophoneRecorder.web.ts',
          './src/api/microphone/native/MicrophoneTranscriber': './src/api/microphone/web/MicrophoneTranscriber.web.ts'
        }
      }]
    ]
  };
};

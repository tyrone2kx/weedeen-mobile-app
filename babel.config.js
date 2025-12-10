module.exports = {
  presets: ['module:@react-native/babel-preset',
    //  'nativewind/babel'
    ],
  plugins: [
    // 'react-native-reanimated/plugin',
    // [
    //   'module:react-native-dotenv',
    //   {
    //     envName: 'APP_ENV',
    //     moduleName: '@env',
    //     path: '.env',
    //     safe: false,
    //     allowUndefined: true,
    //     verbose: false,
    //   },
    // ],
    // [
    //   'module-resolver',
    //   {
    //     root: ['.'],
    //     alias: {
    //       '@wd': './src',
    //       '@assets': './assets',
    //     },
    //   },
    // ],
    'react-native-worklets/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};

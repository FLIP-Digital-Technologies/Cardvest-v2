const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const config = {
  resolver: {
    // Exclude 'svg' from asset extensions and include it in source extensions
    assetExts: [],
    sourceExts: [],
  },
  transformer: {
    // Use react-native-svg-transformer for handling svg files
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
};

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return mergeConfig(defaultConfig, {
    resolver: {
      assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
    transformer: config.transformer, // Keep the transformer configuration for SVG
  });
})();

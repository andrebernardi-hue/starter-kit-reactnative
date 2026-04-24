import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig }          from 'vite';
import react                    from '@vitejs/plugin-react';
import path                     from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],

  framework: {
    name:    '@storybook/react-vite',
    options: {},
  },

  viteFinal: (c) =>
    mergeConfig(c, {
      plugins: [
        react({ jsxRuntime: 'automatic' }),
      ],
      resolve: {
        alias: [
          // Stub codegenNativeComponent (not available in react-native-web)
          {
            find: /^react-native\/Libraries\/Utilities\/codegenNativeComponent$/,
            replacement: path.resolve(__dirname, '../src/mocks/codegenNativeComponent.ts'),
          },
          // Replace react-native-svg with a thin browser-SVG mock.
          // The real package pulls in CJS-only PEG parsers, TurboModuleRegistry,
          // and other native-only modules that break Vite's ESM pipeline.
          // Our mock wraps native <svg> elements — identical rendering in the browser.
          {
            find: /^react-native-svg(\/.*)?$/,
            replacement: path.resolve(__dirname, '../src/mocks/react-native-svg.tsx'),
          },
          // Map react-native → react-native-web
          { find: 'react-native', replacement: 'react-native-web' },
        ],
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
      },
    }),
};

export default config;

import { defineConfig } from 'cypress';
import { devServer } from '@cypress/webpack-dev-server';
import webpackConfig from './webpack.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    specPattern: 'cypress/components/**/*.cy.{js,ts,jsx,tsx}',
  },
});
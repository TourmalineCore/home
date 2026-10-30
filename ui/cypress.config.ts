import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from "cypress-image-diff-js/plugin";
import path from "path";
import webpack from "webpack";

export default defineConfig({
  allowCypressEnv: false,

  component: {
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config);
    },
    screenshotOnRunFailure: true,
    devServer: {
      framework: `next`,
      bundler: `webpack`,
      webpackConfig: {
        plugins: [
          new webpack.NormalModuleReplacementPlugin(
            /next\/image/,
            path.resolve(__dirname, `./cypress/support/NextImageMock.tsx`),
          ),
        ],
      },
    },
  },
});

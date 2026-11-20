import webpack from "webpack";
import path from "path";

import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from "cypress-image-diff-js/plugin";

export default defineConfig({
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

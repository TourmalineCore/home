import path from 'path';
import fs from 'fs-extra';

// Custom controller for receiving swagger json
export default {
  async getSwaggerJson(ctx) {
    const openAPISpecsPath = path.join(
      strapi.dirs.app.extensions,
      `documentation`,
      `documentation`,
      `1.0.0`,
      `full_documentation.json`
    );


    try {
      const documentation = fs.readFileSync(openAPISpecsPath, `utf8`);
      const response = JSON.parse(documentation);

      ctx.send(response);
    } catch (e) {
      strapi.log.error(e);
      ctx.badRequest(null, e.message);
    }
  }
};
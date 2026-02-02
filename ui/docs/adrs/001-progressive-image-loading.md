# 001: Progressive Image Loading

## Status
Proposed

## Context
It is required to implement progressive image loading in a Next.js application using Strapi CMS. Progressive loading enhances the user experience by displaying a blurred version of the image before the full version is loaded.

## Decision
Generating blurDataURL on the CMS side (Strapi).

## Rationale

After analyzing both approaches, the option of generating blurDataURL on the CMS side was chosen, as it is a more optimal approach. It ensures instant page loading and performs the generation only once when the image is uploaded.

| Approach | Page Load Time | Advantages | Disadvantages |
|--------|-------------------------|--------------|------------|
| **Generation on the UI Side (Next.js)** | 5-6 seconds | • No dependency on the CMS<br>| • Blocks rendering<br>• High server load<br>• Generation happens every time |
| **Generation on the CMS Side (Strapi)** | < 1 second | • Instant page load<br>• Generation happens once when the image is uploaded<br> | • Need modifying Strapi<br>• Additional dependency on the CMS


## Implementation
Since Strapi doesn't have built-in support for generating `blurDataURL`, we need to extend its functionality.

Using the Strapi documentation on [extending plugins](https://docs.strapi.io/cms/plugins-development/plugins-extension#extending-a-plugins-interface), the following steps were taken.

1. A file named extensions/upload/strapi-server.ts was created in the Strapi project root.

2. The file database schema was extended to add a new `blurDataURL` field.

```js
plugin.contentTypes.file.schema.attributes.blurDataURL = {
  type: `string`,
  configurable: false,
  required: false,
};
```

3. A new service for generating blur was added. Blur image generation was done using the [sharp](https://www.npmjs.com/package/sharp) package. 

```js
plugin.services[`blur-generator`] = {
    generateBlurDataURL: async (buffer) => {
      try {
        const sharpImage = await sharp(buffer)
          .resize(20, 20, {
            fit: `inside` 
          })
          .jpeg({
            quality: 40,
            mozjpeg: true 
          })
          .toBuffer();
        
        return `data:image/jpeg;base64,${sharpImage.toString(`base64`)}`;
      } catch (error) {
        strapi.log.error(`Blur generation error:`, error);
        return null;
      }
    },

    getBufferFromUrl: async (url) => {
      try {
        const arrayBuffer = await fetch(url)
          .then((response) => response.arrayBuffer());

        return Buffer.from(arrayBuffer);
      } catch (error) {
        strapi.log.error(`Error fetching from URL ${url}:`, error);
        return null;
      }
    }
  };
```


4. A [lifecycles hook](https://docs.strapi.io/cms/configurations/functions#lifecycle-functions) was added to trigger the code for generating the blur and write the `blurDataURL` value to the database after the image is uploaded.

```js
 strapi.db.lifecycles.subscribe({
    models: [`plugin::upload.file`],
    
    async afterCreate(event) {
      const {
        result: file 
      } = event;

      // Generates only for images, no need for videos
      if (file.mime?.startsWith(`image/`)) {
        const blurService = strapi.service(`plugin::upload.blur-generator`);

        try {
          const buffer = await blurService.getBufferFromUrl(file.url);

          if (buffer) {
            const blurDataURL = await blurService.generateBlurDataURL(buffer);

            await strapi.db.query(`plugin::upload.file`)
              .update({
                where: {
                  id: file.id 
                },
                data: {
                  blurDataURL 
                }
              });
          }
        } catch (error) {
          strapi.log.error(`Error adding blur to ${file.name}:`, error);
        }
      }
    }
 })
```
The final code for `extensions/upload/strapi-server.ts`.

```js
import sharp from "sharp";

module.exports = (plugin) => {
  // Add blurDataURL to content types
  plugin.contentTypes.file.schema.attributes.blurDataURL = {
    type: `string`,
    configurable: false,
    required: false,
  };

  // Add custom service to generate blur and get buffer by url
  plugin.services[`blur-generator`] = {
    generateBlurDataURL: async (buffer) => {
      try {
        const sharpImage = await sharp(buffer)
          .resize(20, 20, {
            fit: `inside` 
          })
          .jpeg({
            quality: 40,
            mozjpeg: true 
          })
          .toBuffer();
        
        return `data:image/jpeg;base64,${sharpImage.toString(`base64`)}`;
      } catch (error) {
        strapi.log.error(`Blur generation error:`, error);
        return null;
      }
    },

    getBufferFromUrl: async (url) => {
      try {
        const arrayBuffer = await fetch(url)
          .then((response) => response.arrayBuffer());

        return Buffer.from(arrayBuffer);
      } catch (error) {
        strapi.log.error(`Error fetching from URL ${url}:`, error);
        return null;
      }
    }
  };

  // Needed to add blurDataUrl after image upload
  strapi.db.lifecycles.subscribe({
    models: [`plugin::upload.file`],
    
    async afterCreate(event) {
      const {
        result: file 
      } = event;

      // Generates only for images, no need for videos
      if (file.mime?.startsWith(`image/`)) {
        const blurService = strapi.service(`plugin::upload.blur-generator`);

        try {
          const buffer = await blurService.getBufferFromUrl(file.url);

          if (buffer) {
            const blurDataURL = await blurService.generateBlurDataURL(buffer);

            await strapi.db.query(`plugin::upload.file`)
              .update({
                where: {
                  id: file.id 
                },
                data: {
                  blurDataURL 
                }
              });
          }
        } catch (error) {
          strapi.log.error(`Error adding blur to ${file.name}:`, error);
        }
      }
    }
  });

  return plugin;
};
```

The process of generating blurDataURL looks like this:

1. Uploading an image to the CMS.

2. Saving the image to the database.

3. Generating the `blurDataURL`.

4. Updating the `blurDataURL` field in the database.

After implementation, the API response will include the `blurDataURL` field:

```json
"image": {
  ...
  "blurDataURL": "data:image/jpeg;base64,/9j/2wBDABQUFBQVFBcZGRcfIh4iHy4rJycrLkYyNjI2MkZqQk5CQk5Ca"
}
```

## Consequences

Advantages:

1. Improving UX: users see content immediately, even with a slow internet connection.

2. No website loading issues: generation is handled on the CMS side.

Disadvantages:

1. Dependency on Strapi CMS: an additional dependency on the CMS arises. If a different CMS is used in the future, this functionality will need to be reimplemented for it.

## Alternatives

## 1. Generation on the UI Side (Next.js)

Rejected due to critical performance issues:

1. Blocking rendering (5-6 seconds delay)

2. High load on the server with each rendering

3. Duplicate calculations for the same images

## 2. Generation at the build stage

This solution is not suitable because it only works for static sites, whereas ours is dynamic.

If you have a static site, you can use this [documentation](https://nextjs.org/docs/app/api-reference/components/image#placeholder).

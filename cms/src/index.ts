// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({
    strapi
  }: {
    strapi: Core.Strapi
  }) {
    const roles = await strapi
      .service(`plugin::users-permissions.role`)
      .find();

    const _public = await strapi
      .service(`plugin::users-permissions.role`)
      .findOne(roles.filter((role) => role.type === `public`)[0].id);

    Object.keys(_public.permissions)
      .filter((permission) => permission.startsWith(`api`)
        || permission.startsWith(`plugin::strapi-5-sitemap-plugin`)
        || permission.startsWith(`plugin::content-type-builder`))
      .forEach((permission) => {
        const controller = Object.keys(_public.permissions[permission].controllers)[0];

        // Enable getSwaggerJson for the custom documentation controller
        if (permission.startsWith(`api::documentation`)) {
          _public.permissions[permission].controllers[controller].getSwaggerJson.enabled = true;
          return;
        }

        // Enable getContentTypes
        if (permission.startsWith(`plugin::content-type-builder`)) {
          const controller = Object.keys(_public.permissions[permission].controllers)[1];

          _public.permissions[permission].controllers[controller].getContentTypes.enabled = true
          return;
        }

        // Enable getSitemap
        if (permission.startsWith(`plugin::strapi-5-sitemap-plugin`)) {
          _public.permissions[permission].controllers[controller].getSitemap.enabled = true;
          return;
        }

        // Enable find
        _public.permissions[permission].controllers[controller].find.enabled = true;

        // Enable update if exists
        if (_public.permissions[permission].controllers[controller].update)
          _public.permissions[permission].controllers[controller].update.enabled = true;

        // Enable create if exists
        if (_public.permissions[permission].controllers[controller].create)
          _public.permissions[permission].controllers[controller].create.enabled = true;

        // Enable findOme if exists
        if (_public.permissions[permission].controllers[controller].findOne)
          _public.permissions[permission].controllers[controller].findOne.enabled = true;

        // Enable delete
        _public.permissions[permission].controllers[controller].delete.enabled = true;
      });

    // Set permissions for upload
    // Enable find
    _public.permissions[`plugin::upload`].controllers[`content-api`].find.enabled = true;

    _public.permissions[`plugin::upload`].controllers[`content-api`].upload.enabled = true;

    // Enable destroy
    _public.permissions[`plugin::upload`].controllers[`content-api`].destroy.enabled = true;

    await strapi
      .service(`plugin::users-permissions.role`)
      .updateRole(_public.id, _public);

    // Needed to generate a blurDataURL for already uploaded images
    await generateMissingBlurDataURLs({
      strapi
    })
  }
};


async function generateMissingBlurDataURLs({
  strapi
}: {
  strapi: Core.Strapi
}) {
  const images = await strapi.db.query(`plugin::upload.file`)
    .findMany({
      where: {
        $and: [
          {
            mime: {
              $contains: `image/` 
            } 
          },
          { 
            $or: [
              {
                blurDataURL: null 
              },
              {
                blurDataURL: `` 
              }
            ]
          }
        ]
      },
    });

  const blurService = strapi.service(`plugin::upload.blur-generator`);

  for (const image of images) {
    const buffer = await blurService.getBufferFromUrl(image.url);

    const blurDataURL = await blurService.generateBlurDataURL(buffer);

    await strapi.db.query(`plugin::upload.file`)
      .update({
        where: {
          id: image.id 
        },
        data: {
          blurDataURL 
        }
      });
  }
}
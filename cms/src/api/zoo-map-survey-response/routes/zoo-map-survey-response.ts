/**
 * zoo-map-survey-response router
 */

import { factories } from '@strapi/strapi';

// The responses are only written through the API and read in the admin panel,
// so the routes for reading, updating and deleting them are not exposed at all
export default factories.createCoreRouter('api::zoo-map-survey-response.zoo-map-survey-response', {
  only: ['create'],
});

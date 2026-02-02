# cms


### Running CMS locally

Add an .env file base on .env.example.

Install dependencies:
```
npm ci
```

To successfully run Strapi locally, run the command:
```
docker-compose --profile db-and-minio-s3 up -d
```

minio-s3 interface will be available here: http://localhost:9011 
- `username`: *admin*
- `password`: *rootPassword*

Running Strapi in dev mode [Read here](https://docs.strapi.io/dev-docs/cli#strapi-develop):
```
npm run develop
```

Running Strapi [Read here](https://docs.strapi.io/dev-docs/cli#strapi-start):
```
npm run start
```

Strapi will be available here: http://localhost:1337/admin

### Swagger documentation

The Swagger documentation is available at the following URL: http://localhost:1337/documentation

### Running Playwright Tests

After successfully launching Strapi (which can be accessed at http://localhost:1337), and keeping the first terminal active in a separate tab, you can run the tests in headless mode (without the browser UI) by executing the following script:

```bash
npm run playwright:run
```

To run the tests with the Playwright UI interface:

```bash
npm run playwright:open
```

## 📚 Learn more

- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Before you start
 
- [Docker](https://www.docker.com/get-started/) (needed for Dev container)

### If you develop inside the Dev container
- [VSCode](https://code.visualstudio.com/)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### If you develop without Dev containers

- [Node.js](https://nodejs.org/en) (we used version 20.18.0, but older version should also work. Ideally, install them with `nvm` to easily switch between Node.js versions if needed)
- [VSCode](https://code.visualstudio.com/) (it is optional, you can use any IDE, but VSCode has predefined formatting on save according to the project's linting rules)

## Getting Started

First, run the development server:

```bash
npm ci 

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Playwright tests (in Dev Container only)
 
It is recommended to run the tests in Dev Container only because in this case there will no discrepancy between screenshots generated on different OS.
To run the dev server, you can run the following script with test data and **without** interacting with the API. In this mode, Next.js image optimization is enabled, and it is recommended to use it when you want to see how the site works with optimizations close to production:

```bash
npm run dev:static
```

Once you have successfully started the dev server (you can open it at http://localhost:3000), leaving the first terminal active in a separate terminal tab, you can run tests in headless mode (without the browser user interface) by running the following script:

```bash
npm run playwright:run
```

If you want to work exclusively inside the Dev container, you need to connect to the Dev container's VNC server (remote desktop) here http://localhost:6080/. Password: `vscode`. After running the following command, you should see the Playwright interface:

```bash
npm run playwright:open
```

## Updating base screenshots

When you need to update screenshots that are no longer relevant, you can do it with the following command:

```bash
npm run update-snapshots
```

Only those screenshots that have discrepancies will be replaced.

## Viewing test report locally 

After executing `npm run playwright:run` you will be able to see the tests run report. For example, whether there were retries when running one or more tests. If the test failed, the report will be generated automatically. If the test passed, the report can be generated with the command:

```bash
npx playwright show-report
```

If you develop in a Dev container, you can view the generated report via VNC:

```bash
npx playwright open localhost:9323
```

## Running Playwright E2E Tests
 
Before running E2E tests, you need to launch the UI in API mode. To do this, execute the following command::

```bash
npm run dev
```

You also need to start the [CMS](https://github.com/TourmalineCore/home-cms).

After starting both the UI and CMS, you can run the E2E tests. To run them in headless mode, execute the following command:

```bash
npm run playwright:run:e2e
```

To run E2E tests in UI mode, execute the following command:

```bash
npm run playwright:open:e2e
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
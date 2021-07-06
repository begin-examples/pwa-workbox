# Progressive Web App (PWA)
This example demonstrates a progressive web app that deploys a service worker with *no bundling, transpiling, or complicated build process*. It is based on the [Workbox library](https://developers.google.com/web/tools/workbox) example. 

## Deploy your own

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/pwa-workbox)

Deploy your own clone of this app to Begin!

## Getting started

- Install dependencies: `npm install`
- Start the local dev server: `npm start`

## Service Worker Cache Manifest
This example uses two strategies to generate the cache manifest. 
- For fingerprinted static assets in the public folder Begin generates a manifest called `static.json` that can be queried to cache the fingerprinted assets. 
- For pages served from lambda endpoints that do not have fingerprinted file names a timestamp is generated and stored in the shared folder to be used for a cache revision number.

## Reference

- [Quickstart](https://docs.begin.com/en/guides/quickstart/) - basics on working locally, project structure, deploying, and accessing your Begin app
- [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions) - basics on expanding the capabilities of your app
- [Learn.begin.com](https://learn.begin.com) - in-depth guides on building serverless applications

Head to [docs.begin.com](https://docs.begin.com/) for more information!

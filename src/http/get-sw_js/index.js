let arc = require('@architect/functions')
let fs = require('fs')
let { join } = require('path')

let cacheRevision = 0
try {
  let { BUILD_TIME } = require('@architect/shared/build/build-time')
  cacheRevision = BUILD_TIME
}
catch (e) {
  console.error('build timestamp not found')
}

let manifestPath = join(process.cwd(), 'node_modules', '@architect', 'shared', 'static.json')
let manifestFile = fs.readFileSync(manifestPath)
let manifest = JSON.parse(manifestFile)
let precacheList
if (process.env.NODE_ENV === 'testing') {
  precacheList = Object.keys(manifest).map(route => `{ url: '/_static/${route}', revision: null }`).join(',\n')
}
else {
  precacheList = Object.values(manifest).map(route => `{ url: '/_static/${route}', revision: null }`).join(',\n')
}

exports.handler = arc.http.async(handler)


function handler () {

  let sw = /* javascript*/`
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

  workbox.setConfig({
    debug: true,
  });

  workbox.precaching.precacheAndRoute([
    {url:'/',revision:'${cacheRevision}'},
    ${precacheList}
  ]);

  workbox.routing.registerRoute(
    'https://static.begin.app/starter/default.css',
    new workbox.strategies.NetworkFirst(),
  );

// // Demonstrates using default cache
// workbox.routing.registerRoute(
//     new RegExp('.*\\.(?:js)'),
//     new workbox.strategies.NetworkFirst(),
// );

// // Demonstrates a custom cache name for a route.
// workbox.routing.registerRoute(
//     new RegExp('.*\\.(?:png|jpg|jpeg|svg|gif)'),
//     new workbox.strategies.CacheFirst({
//       cacheName: 'image-cache',
//       plugins: [
//         new workbox.expiration.ExpirationPlugin({
//           maxEntries: 3,
//         }),
//       ],
//     }),
// );
`

  return {
    js: sw,
    'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
  }
}

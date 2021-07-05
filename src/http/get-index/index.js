let arc = require('@architect/functions')

exports.handler = arc.http.async(handler)

function handler () {

  let html = /* html*/`
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Begin PWA Example</title>
    <meta name="pwa-begin" content="Begin PWA example">
    <link rel="stylesheet" href="https://static.begin.app/starter/default.css">
    <link rel="stylesheet" href="${arc.static('/css/style.css')}">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>

    <header>
      <div>
        <h1>Begin PWA Example</h1>
      </div>
    </header>

    <ol>
      <li>Open DevTools and go to the console</li>
      <li>Click this button:<br /><button class="install-sw">Install Service Worker</button></li>
      <li>You should see a workbox message appear</li>
      <li>Refresh the page, go to the network tab, and check the "Size" of demo-img.png. It should read (ServiceWorker)</li>
    </ol>

    <!-- Image will be stored in a custom cache -->
    <img src="${arc.static('images/begin-logo.svg')}" alt="begin logo" style="min-width:4.777rem;min-height:1.333rem;" width="86" height="24">
   
    <script>
      const installSWBtn = document.querySelector('.install-sw');
      installSWBtn.addEventListener('click', () => {
        navigator.serviceWorker.register('./sw.js');
      });
    </script>

  </body>
</html>
`
  return {
    html,
    'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
  }
}

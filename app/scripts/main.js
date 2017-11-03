/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
;(function() {

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  )

  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set:
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = registration.installing

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break

                case 'redundant':
                  throw new Error('The installing ' + 'service worker became redundant.')

                default:
                // Ignore
              }
            }
          }
        }
      })
      .catch(function(e) {
        console.error('Error during service worker registration:', e)
      })
  }

  // Your custom JavaScript goes here

  let round = 0
  let seconds = 30
  let running = false
  let timer
  const endRoundSound = new Audio('sounds/end-30.wav')
  const warningFire = new Audio('sounds/fire.wav')
  document.querySelector('#timer-button').addEventListener('click', () => {
    const button = document.querySelector('#timer-button')
    const ticker = document.querySelector('#time-countdown')
    const roundDisp = document.querySelector('.round-counter')
    if (!running && round < 4) {
      running = true
      round++
      seconds = 30
      button.innerHTML = 'GO!!!!'
      roundDisp.innerHTML = `Round: ${round}`
      timer = setInterval(() => {
        if (seconds > 0) {
          seconds--
          ticker.innerHTML = seconds
          if(seconds === 15) {
            warningFire.play()
          }
          else if(seconds === 5) {
            warningFire.play()
            setTimeout(() => {
              warningFire.play()
            }, 500)
          }
        }
        else {
          endRoundSound.play()
          running = false
          seconds = 0
          clearInterval(timer)
          button.innerHTML = 'Start Next Round'
          ticker.innerHTML = seconds
        }
      }, 1000)
    } else if (running || round >= 4) {
      round = 0
      seconds = 30
      running = false
      button.innerHTML = 'Start Timer'
      ticker.innerHTML = seconds
      clearInterval(timer)
    }
  })

  // TODO add + and - buttons to the player scores
  let playerScoreBoxes = document.querySelectorAll('.player-score')
  playerScoreBoxes.forEach(scoreBox => {

  })
})()

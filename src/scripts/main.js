;(function ($, window, undefined) {

    'use strict';

    var doc = window.document,
        Utils,          // Cross-module utility methods
        Events,         // Pub/sub event bus
        Responder,      // Responsive width publisher
        Demo,           // Demo using Events module
        Init;           // Page initialization



    /* ----------------------------------------------------------------------- */
    /* Cross-module utility methods */
    /* ----------------------------------------------------------------------- */

    Utils = (function () {

        // Return public object
        return {

            // Returns the current window width
            getWindowWidth: (function () {

                // Init-time branching for retrieving window width
                if (window.innerWidth) {
                    return function () {
                        return window.innerWidth;
                    };
                } else if (doc.documentElement.clientWidth) {
                    return function () {
                        return doc.documentElement.clientWidth;
                    };
                } else {
                    return function () {
                        return doc.body.clientWidth;
                    };
                }
            }())
        };
    }());



    /* ----------------------------------------------------------------------- */
    /* Pub/sub event bus */
    /* ----------------------------------------------------------------------- */

    Events = (function () {

        var events_arr = [];

        // Return public object
        return {

            publish: function (event, data) {

                var i;

                // Publish data to functions subscribed to event
                if (events_arr[event]) {
                    for (i = 0; i < events_arr[event].length; i++) {
                        if (typeof events_arr[event][i] === 'function') {
                            events_arr[event][i](data);
                        }
                    }
                }
            },

            subscribe: function (event, fn) {

                // Subscribe function to event
                events_arr[event] = events_arr[event] || [];
                events_arr[event].push(fn);
            },

            // Remove a function from the array of subscribers
            unsubscribe: function (event, fn) {

                var i,
                    matched = false;

                // Loop through event subscribers
                if (events_arr[event]) {
                    for (i = 0; i < events_arr[event].length; i++) {

                        // Remove matched event
                        if (events_arr[event][i] === fn) {
                            matched = true;
                            events_arr[event][i] = undefined;

                            // Exit loop after first match
                            break;
                        }
                    }

                    // If no matches were found
                    if (matched !== true) {
                        throw new Error('No matching functions subscribed to "' + event + '" event.');
                    }
                }

                // If event does not exist
                else {
                    throw new Error('No matches found for "' + event + '" event.');
                }
            }
        };
    }());



    /* ----------------------------------------------------------------------- */
    /* Responsive width publisher */
    /* ----------------------------------------------------------------------- */

    Responder = (function () {

        var current_width = Utils.getWindowWidth(),
            updateWidth;

        updateWidth = function () {

            clearTimeout(updateWidth.timeout_id);

            // Wait until resizing has finished
            updateWidth.timeout_id = setTimeout(function () {
                current_width = Utils.getWindowWidth();

                // Publish width
                Events.publish('window-resize', current_width);
            }, updateWidth.publish_delay);
        };

        // Return public object
        return {

            init: function () {

                // Set delay for resize event (ms)
                updateWidth.publish_delay = 200;

                // Add event listener for window resize
                window.addEventListener('resize', updateWidth);

                // Publish initial width
                Events.publish('window-resize', current_width);
            }
        };
    }());



    /* ----------------------------------------------------------------------- */
    /* Demo using Events module */
    /* ----------------------------------------------------------------------- */

    Demo = (function () {

        var privateMethod,
            private_str = 'Demo: Lorem impsum dolor sit amet.';

        privateMethod = function () {
            // console.log(private_str);
        };

        // Return public object
        return {

            // Responder private method publishWidth provides window_width parameter
            init: function (window_width) {

                // Check for init conditions
                if (window_width > 500) {

                    // Unsubscribe to prevent additional init calls
                    Events.unsubscribe('window-resize', Demo.init);

                    // Do something
                    privateMethod();
                }
            }
        };
    }());



    /* ----------------------------------------------------------------------- */
    /* Register Service Worker */
    /* ----------------------------------------------------------------------- */

    // Check to make sure service workers are supported in the current browser,
    // and that the current page is accessed from a secure origin. Using a
    // service worker from an insecure origin will trigger JS console errors. See
    // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
    var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
          // [::1] is the IPv6 localhost address.
          window.location.hostname === '[::1]' ||
          // 127.0.0.1/8 is considered localhost for IPv4.
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
    );

    if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
        navigator.serviceWorker.register('service-worker.js')
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
              var installingWorker = registration.installing;

              installingWorker.onstatechange = function() {
                switch (installingWorker.state) {
                  case 'installed':
                    // At this point, the old content will have been purged and the
                    // fresh content will have been added to the cache.
                    // It's the perfect time to display a "New content is
                    // available; please refresh." message in the page's interface.
                    break;

                  case 'redundant':
                    throw new Error('The installing ' +
                                    'service worker became redundant.');

                  default:
                    // Ignore
                }
              };
            }
          };
        }).catch(function(e) {
          console.error('Error during service worker registration:', e);
        });
    }


    /* ----------------------------------------------------------------------- */
    /* Page initialization */
    /* ----------------------------------------------------------------------- */

    Init = (function () {

        // Subscribe Demo module to 'window-resize' published by Responder module
        Events.subscribe('window-resize', Demo.init);

        // Initialize Responder after modules are subscribed to event
        Responder.init();
    }());
}(jQuery, window));

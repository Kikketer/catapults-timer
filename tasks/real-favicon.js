// Generated by RealFaviconGenerator.net

'use strict';

var gulp = require('gulp');
var fs = require('fs');
var realFavicon = require('gulp-real-favicon');

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
  realFavicon.generateFavicon({
    masterPicture: 'app/images/Icon.jpg',
    dest: 'app/images/touch',
    iconsPath: '/images/touch',
    design: {
      ios: {
        pictureAspect: 'noChange',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        },
        appName: 'Catapults!'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#2b5797',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: true,
            medium: false,
            big: false,
            rectangle: false
          }
        },
        appName: 'Catapults!'
      },
      androidChrome: {
        pictureAspect: 'shadow',
        themeColor: '#ffffff',
        manifest: {
          name: 'Catapults!',
          display: 'standalone',
          orientation: 'notSet',
          existingManifest: realFavicon.escapeJSONSpecialChars(fs.readFileSync('app/manifest.json', 'utf8')),
          onConflict: 'override',
          declared: false
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'blackAndWhite',
        threshold: 21.09375,
        themeColor: '#5bbad5'
      }
    },
    settings: {
      compression: 5,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: 'favicon-data.json'
  }, function() {
    // Patch the original manifest
    gulp.src('app/images/touch/manifest.json').pipe(gulp.dest('app'))
      .on('finish', function() {
        done();
      });
  });
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
  var currentVersion = JSON.parse(fs.readFileSync('favicon-data.json')).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
    done();
  });
});
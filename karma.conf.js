module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'app/components/jquery/dist/jquery.js',
      'app/components/angular/angular.js',
      'app/components/angular-mocks/angular-mocks.js',
      'app/components/angular-cookies/angular-cookies.js',
      'app/components/angular-resource/angular-resource.js',
      'app/components/angular-sanitize/angular-sanitize.js',
      'app/components/firebase/firebase.js',
      'app/components/angularfire/dist/angularfire.js',
      'app/scripts/app.js',
      'app/scripts/controllers/main.js',
      'app/scripts/directives/contenteditable.js',
      'test/spec/controllers/main.js'
    ],
    exclude: [],
    reporters: ['progress'],
    port: 8080,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Firefox'],
    singleRun: true
  });
};

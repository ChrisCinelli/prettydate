Package.describe({
  name: 'chriscinelli:prettydate',
  version: '1.0.0',
  summary: 'Make pretty dates like "a few seconds ago", "2 minutes ago", "a day ago", etc. Support live updates.',
  git: 'https://github.com/chriscinelli/prettydate',
  documentation: 'README.md'
});

Package.on_use(function(api) {
  api.versionsFrom('METEOR@0.9.2');

  // meteor dependencies
  api.use('underscore');
  api.use('ui');  
  api.use('momentjs:moment@2.9.0'); 

  api.addFiles('prettydate.js');

// symbol exports
  api.export('PrettyDate');
});

Package.on_test(function(api) {
  api.use('tinytest');
  api.use('chriscinelli:prettydate');
  api.addFiles('prettydate-tests.js');
});

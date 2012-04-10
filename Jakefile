var interleave = require('interleave');
    

desc('build the client files');
task('dev', function() {
    interleave(['mobileservices.dev.js'], {
        multi: 'pass',
        path: 'app/js',
        aliases: aliases
    });
});

task('dev.deps', function() {
    interleave(['mobileservices.deps.js'], {
        multi: 'pass',
        path: 'app/js',
        aliases: aliases
    });
});

task('build', function() {
    interleave(['mobileservices.js'], {
        after: ['uglify'],
        multi: 'pass',
        path: 'app/js',
        aliases: aliases
    });
});


task('default', ['dev']);
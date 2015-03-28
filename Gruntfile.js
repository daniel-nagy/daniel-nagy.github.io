'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    
    config: {
      livereload: 35729
    },
    
    // import metadata from package.json
    pkg: grunt.file.readJSON('package.json'),
    
    // add vender prefixes to style sheets
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      development: {
        src: 'app/styles/style.css'
      },
      production: {
        src: 'production/style.css'
      }
    },
    
    // remove generated files
    clean: {
      development: 'app/styles/style.css',
      production: ['production/app.js', 'production/style.css']
    },
    
    // condense scripts into one file
    concat: {
      options: {
        banner: '\'use strict\';\n\n',
        separator: '\n\n',
        // remove all other 'use strict' statements
        process: function(src) {
          return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '');
        },
      },
      production: {
        files: {
          'production/app.js': ['app/app.js', 'app/scripts/**/*.js']
        }
      }
    },
    
    // static web server
    connect: {
      server: {
        options: {
          port: 8000,
          // hostname: '127.0.0.1',
          hostname: '0.0.0.0',
          livereload: '<%= config.livereload %>',
          base: ['bower_components', 'app'],
        }
      }
    },
    
    // copy bower components and templates
    copy: {
      production: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'bower_components/angular/',
          src: ['angular.min.js', 'angular.min.js.map'],
          dest: 'production/angular'
        }, {
          expand: true,
          flatten: true,
          cwd: 'bower_components/angular-animate/',
          src: ['angular-animate.min.js', 'angular-animate.min.js.map'],
          dest: 'production/angular'
        }, {
          expand: true,
          flatten: true,
          cwd: 'bower_components/angular-route/',
          src: ['angular-route.min.js', 'angular-route.min.js.map'],
          dest: 'production/angular'
        }, {
          expand: true,
          flatten: true,
          cwd: 'app/templates/',
          src: ['*.html'],
          dest: 'production/templates/'
        },{
          expand: true,
          flatten: true,
          cwd: 'app/images/',
          src: ['*'],
          dest: 'production/images/'
        }]
      }
    },
    
    // minify css files
    cssmin: {
      production: {
        files: {
          'production/style.min.css': 'production/style.css'
        }
      }
    },
    
    // report bad javascript syntax, uses jshint-stylish for
    // more readable logging to the console
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        force: true
      },
      development: [
        'app.js',
        'app/scripts/**/*.js'
      ]
    },
    
    // compile less
    less: {
      development: {
        files: {
          'app/styles/style.css': 'app/styles/style.less'
        }
      },
      production: {
        files: {
          'production/style.css': 'app/styles/style.less'
        }
      }
    },
    
    // ready the index for production
    processhtml: {
      options: {
        commentMarker: 'production'
      },
      production: {
        files: {
          'production/index.html': 'app/index.html'
        }
      }
    },
    
    // compress icons
    svgmin: {
      options: {
        plugins: [{
          removeTitle: true
        }, {
          removeDesc: true
        }]
      },
      production: {
        files: [{
          expand: true,
          flatten: true,
          src: 'app/icons/*.svg',
          dest: 'production/icons/'
        }]
      }
    },
    
    // minify scripts
    uglify: {
      production: {
        files: {
          'production/app.min.js': 'production/app.js'
        }
      }
    },
    
    // perform tasks on file change
    watch: {
      index: {
        files: 'app/index.html',
        options: {
          livereload: '<%= config.livereload %>'
        }
      },
      less: {
        files: 'app/styles/**/*.less',
        tasks: ['less:development', 'autoprefixer:development'],
        options: {
          livereload: '<%= config.livereload %>'
        }
      },
      scripts: {
        files: [
          'app/app.js',
          'app/scripts/**/*.js',
        ],
        tasks: 'jshint:development',
        options: {
          livereload: '<%= config.livereload %>'
        }
      },
      templates: {
        files: 'app/templates/**/*.html',
        options: {
          livereload: '<%= config.livereload %>'
        }
      }
    }
    
  });

  // load plugins
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // register tasks
  grunt.registerTask('default', [
    'less:development',
    'autoprefixer:development',
    'jshint:development',
    'connect:server',
    'watch'
  ]);
  
  grunt.registerTask('production', [
    'svgmin:production',
    'less:production',
    'autoprefixer:production',
    'cssmin:production',
    'processhtml:production',
    'concat:production',
    'uglify:production',
    'copy:production',
    'clean:production'
  ]);
};
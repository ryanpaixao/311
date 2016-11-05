module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      dev: {
        dest: 'src/vendor/scripts'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      public: {
        src: 'src/public/scripts/**/*.js',
        dest: 'build/app.min.js'
      },
      vendor: {
        src: 'src/vendor/scripts/**/*.js',
        dest: 'build/vendor.min.js'
      }
    },
    cssmin: {
      target: {
        files: {
          'build/app.min.css': ['src/public/stylesheets/*.css'],
          'build/vendor.min.css': ['src/vendor/stylesheets/*.css']
        }
      }
    },
    htmlmin: {                                     // Task 
      dist: {                                      // Target 
        options: {                                 // Target options 
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['*.html', '!*.min.html'],
          dest: 'build',
          ext: '.html'
        }]
      }
    },
    watch: {
      options: {
        livereload: 35729
      },
      js: {
        files: ['src/**/scripts/*.js'],
        tasks: ['uglify'],
      },
      css: {
        files: ['src/**/stylesheets/*.css'],
        tasks: ['cssmin'],
      },
      html: {
        files: ['src/*.html'],
        tasks: ['htmlmin'],
      },
    },
    connect: {
      server: {
        options: {
          base: 'build',
          port: 8000,
          hostname: 'localhost',
          livereload: 35729
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('build', ['bower', 'uglify', 'cssmin', 'htmlmin'])
  grunt.registerTask('default', ['build', 'connect', 'watch']);

};
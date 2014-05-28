// Generated on 2014-02-14 using generator-webapp 0.4.7
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// loading aws-config is optional
	var awsConfig;
	try {
		awsConfig = grunt.file.readJSON('grunt-aws.json');
	} catch( e ) {}

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: {
			// Configurable paths
			app: 'app',
			dist: 'dist'
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['sass', 'autoprefixer']
			},
			styles: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					open: true,
					base: [
						'.tmp',
						'<%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= yeoman.dist %>',
					livereload: false
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		sass: {
			all: {
				options: {
					includePaths: ['<%= yeoman.app %>/styles']
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/styles/',
					src: '{,*/}*.scss',
					dest: '.tmp/styles/',
					ext: '.css'
				}]
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		// Automatically inject Bower components into the HTML file
		'bower-install': {
			app: {
				html: '<%= yeoman.app %>/index.html',
				ignorePath: '<%= yeoman.app %>/'
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
						'<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				dest: '<%= yeoman.dist %>'
			},
			html: '<%= yeoman.app %>/*.html'
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
			},
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		svgmin: {
			dist: {
				options: {
					plugins: [
						// unfortunately this option breaks 3D letters
						{ convertPathData: false }
					]
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: '{,*/}*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,jpg,png,txt}',
						'.htaccess',
						// don't copy subdirectories
						'images/*.{png,jpg}',
						'{,*/}*.html',
						'styles/fonts/{,*/}*.*'
					]
				}]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		// embeds images in stylesheet
		imageEmbed: {
			dist: {
				options: {
					maxImageSize: 0,
					deleteAfterEncoding: true
				},
				src: [ '<%= yeoman.dist %>/styles/main.css' ],
				dest: '<%= yeoman.dist %>/styles/main.css'
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			server: [
				'sass',
				'copy:styles'
			],
			test: [
				'copy:styles'
			],
			dist: [
				'sass',
				'copy:styles',
				// imagemin corrupts images
				//'imagemin',
				'svgmin'
			]
		},

		// allow dist folder to be uploaded to s3
		aws: awsConfig,
		s3: {
			options: {
				key: '<%= aws.key %>',
				secret: '<%= aws.secret %>',
				bucket: '<%= aws.bucket %>',
				access: 'public-read'
			},
			dist: {
				upload: [{
					src: '<%= yeoman.dist %>/*.html',
					dest: '/',
					options: { gzip: true }
				}, {
					src: '<%= yeoman.dist %>/images/*.{png,jpg,svg}',
					dest: 'images/',
					options: {
						gzip: false,
						headers: {
							// Two Year cache policy (1000 * 60 * 60 * 24 * 730)
							'Cache-Control': 'max-age=630720000, public',
							'Expires': new Date(Date.now() + 63072000000).toUTCString(),
						}
					}
				}, {
					src: '<%= yeoman.dist %>/scripts/*.js',
					dest: 'scripts/',
					options: {
						gzip: true,
						headers: {
							// Two Year cache policy (1000 * 60 * 60 * 24 * 730)
							'Cache-Control': 'max-age=630720000, public',
							'Expires': new Date(Date.now() + 63072000000).toUTCString(),
						}
					}
				}, {
					src: '<%= yeoman.dist %>/styles/*.css',
					dest: 'styles/',
					options: {
						gzip: true,
						headers: {
							// Two Year cache policy (1000 * 60 * 60 * 24 * 730)
							'Cache-Control': 'max-age=630720000, public',
							'Expires': new Date(Date.now() + 63072000000).toUTCString(),
						}
					}
				}, {
					src: '<%= yeoman.dist %>/*.{jpg,ico}',
					dest: '/',
					options: { headers: {
						// One week cache policy (1000 * 60 * 60 * 24 * 7)
						'Cache-Control': 'max-age=604800000, public',
						'Expires': new Date(Date.now() + 604800000).toUTCString(),
					}}
				}, {
					src: '<%= yeoman.dist %>/robots.txt',
					dest: 'robots.txt'
				}]
			}
		}
	});


	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function () {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve']);
	});

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'concat',
		'cssmin',
		'uglify',
		'copy:dist',
		'imageEmbed:dist',
		'rev',
		'usemin'/*,
		'htmlmin'*/
	]);

	grunt.registerTask('default', [
		'build'
	]);
};

module.exports = function(grunt) {
	'use strict'

	// Project configuration
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		addtextdomain: {
			options: {
				textdomain: 'jwif',
			},
			update_all_domains: {
				options: {
					updateDomains: true
				},
				src: [ '*.php', '**/*.php', '!\.git/**/*', '!bin/**/*', '!node_modules/**/*', '!tests/**/*', '!plugin-update-checker/**/*']
			}
		},

		wp_readme_to_markdown: {
			your_target: {
				files: {
					'README.md': 'readme.txt'
				}
			},
		},

		makepot: {
			target: {
				options: {
					domainPath: '/languages',
					exclude: [ '\.git/*', 'bin/*', 'node_modules/*', 'tests/*', 'plugin-update-checker/*' ],
					mainFile: 'index.php',
					potFilename: 'jobs-workinfinland.pot',
					potHeaders: {
						poedit: true,
						'x-poedit-keywordslist': true
					},
					type: 'wp-plugin',
					updateTimestamp: true
				}
			}
		},

		rollup: {
			options: {
				sourceMap: true,
				plugins: function() {
					return [
						require('rollup-plugin-babel')({
							exclude: './node_modules/**',
							// sourceMap: true,
							presets: ['@babel/preset-env'],
							plugins: [
								"@babel/plugin-proposal-class-properties",
							]
						})
					];
				}
			},
			frontend: {
				dest: 'dist/frontend.js',
				src: 'src/frontend.js',
			},
			admin: {
				dest: 'dist/admin.js',
				src: 'src/admin.js',
			},
		},

		sass: {
			dist: {
				options: {
					sourceMap: true,
					implementation: require('node-sass'),
				},
				files: {
					'dist/frontend.css': 'src/frontend.scss',
					'dist/admin.css': 'src/admin.scss'
				}
			}
		},

		watch: {
			scripts: {
				files: ['src/**/*.js'],
				tasks: ['rollup'],
			},

			styles: {
				files: ['src/**/*.scss'],
				tasks: ['sass'],
			},
		}
	})

	grunt.loadNpmTasks('grunt-wp-i18n')
	grunt.loadNpmTasks('grunt-wp-readme-to-markdown')
	grunt.loadNpmTasks('grunt-contrib-watch')
	// grunt.loadNpmTasks('grunt-babel')
	grunt.loadNpmTasks('grunt-rollup')
	grunt.loadNpmTasks('grunt-sass')

	grunt.registerTask('default', ['sass', 'rollup', 'i18n', 'readme'])
	grunt.registerTask('i18n', ['addtextdomain', 'makepot'])
	grunt.registerTask('readme', ['wp_readme_to_markdown'])

	grunt.util.linefeed = '\n'
}

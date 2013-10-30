module.exports = function(grunt){
	grunt.initConfig({
		// concat : {
		// 	build : {
		// 		src: ['public/js/bootstrap.js', 'public/js/canvas.js', 'public/js/jquery.mCustomScrollbar.min.js',
		// 		'public/js/VerbalExpressions.js'],
		// 		dest: 'public/build/scripts.js'
		// 	},
		// 	css: {
		// 		src: 'public/css/*.css',
		// 		dest: 'public/build/allcss.css',
		// 	}
		// },
		// uglify: {
		// 	build: {
		// 		src: ['public/build/scripts.js'],
		// 		dest: 'public/build/scripts.min.js'
		// 	}
		// },
		less : {
			options : {
				paths: './public/css/*.less',
				yuicompress: true
			},
			src : {
				expand: true,
				flatten : true,
				src : ['./public/css/*.less'],
				dest : './public/css/',
				ext : '.css' 
			}
		},
		watch : {
			style : {
				files : './public/css/*.less',
				tasks : 'less'
			},
			template : {
				files : './public/admin/partials/*.jade',
				tasks : 'jade'
			}
		},
		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
	  				'public/admin/partials/about.html' : 'public/admin/partials/about.jade',
	  				'public/admin/partials/contacts.html' : 'public/admin/partials/contacts.jade',
	  				'public/admin/partials/main.html' : 'public/admin/partials/main.jade',
	  				'public/admin/partials/service.html' : 'public/admin/partials/service.jade',
	  				'public/admin/partials/work.html' : 'public/admin/partials/work.jade',
				}
			}
		}
	});

	// load grunt npm package 
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');

	// register task
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('template', ['jade']);
	grunt.registerTask('production', ['concat', 'uglify', 'less']);
}
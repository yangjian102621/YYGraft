
module.exports = function(grunt) {

var BANNER = '/* <%= pkg.name %> <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>), Copyright (C)' +
	' r9it.com,*/\r\n';

var pkg = grunt.file.readJSON('package.json');

grunt.initConfig({
	pkg : pkg,

	uglify : {
		options : {
			banner : BANNER,
		},
		//压缩js
		build : {

			files: [
				{
					src : 'libs/YYGraft.js',
					dest : '<%= pkg.filename %>.min.js'
				}
			]

		}
	},

	//压缩css
	cssmin : {
		options: {
			banner : BANNER,
			beautify: {
				//中文ascii化
				ascii_only: true
			}
		},
		build : {
			files: [
				{
					src: 'css/scrawl.css',
					dest: 'css/scrawl.min.css'
				}
			]
		}
	},

	// 打包压缩文件
	compress : {
		main : {
			options: {
				archive: 'dist/<%= pkg.filename %>-<%= pkg.version %>-.zip',
			},
			files: [
				{src: ['libs/**'], dest: '<%= pkg.name %>/'},
				{src: ['css/**'], dest: '<%= pkg.name %>/'},
				{src: ['index.html'], dest: '<%= pkg.name %>/'},
				{src: ['upload.php'], dest: '<%= pkg.name %>/'},
			]
		}
	}
});

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-contrib-cssmin');

grunt.registerTask('build', ['uglify', 'cssmin']);
grunt.registerTask('zip', ['build', 'compress']);

grunt.registerTask('default', 'build');

};

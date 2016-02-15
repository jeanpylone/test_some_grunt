module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            test: {
                files: [{
                    src: 'test.js', dest: 'test_copy.js'
                }
                ]
            }
        },
        usebanner: {
            top: {
                options: {
                    position: 'top',
                    replace: function(contents){
                        var start = "/// AAA START",
                            end= "/// AAA END\n",
                            re = new RegExp(start+ " ([0-9]).*\n").exec(contents)[1],
                            idx= contents.indexOf(start),
                            lidx= contents.indexOf(end);
                        return "///" + re + "\n" +contents.slice(lidx+end.length+1);
                    }
                }
                ,
                files: {
                    src: ['test_copy.js']
                }
            }
        }
    })
    ;

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-banner');
    grunt.registerTask('default', ['copy:test', 'usebanner:top']);

};

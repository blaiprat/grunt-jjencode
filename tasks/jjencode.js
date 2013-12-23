/*!
 * grunt-jjencode
 *
 *
 * Copyright (c) 2013 Blai Pratdesaba <hello@blaipratdesaba.com>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    function jjencode( gv, text )
    {
        // From: http://utf-8.jp/public/jjencode.html
        /* jshint eqeqeq:false, curly:false, asi:true, loopfunc:true */
        var r="";
        var n;
        var t;
        var b=[ "___", "__$", "_$_", "_$$", "$__", "$_$", "$$_", "$$$", "$___", "$__$", "$_$_", "$_$$", "$$__", "$$_$", "$$$_", "$$$$", ];
        var s = "";
        for( var i = 0; i < text.length; i++ ){
            n = text.charCodeAt( i );
            if( n == 0x22 || n == 0x5c ){
                s += "\\\\\\" + text.charAt( i ).toString(16);
            }else if( (0x21 <= n && n <= 0x2f) || (0x3A <= n && n <= 0x40) || ( 0x5b <= n && n <= 0x60 ) || ( 0x7b <= n && n <= 0x7f ) ){
            //}else if( (0x20 <= n && n <= 0x2f) || (0x3A <= n == 0x40) || ( 0x5b <= n && n <= 0x60 ) || ( 0x7b <= n && n <= 0x7f ) ){
                s += text.charAt( i );
            }else if( (0x30 <= n && n <= 0x39 ) || (0x61 <= n && n <= 0x66 ) ){
                if( s ) r += "\"" + s +"\"+";
                r += gv + "." + b[ n < 0x40 ? n - 0x30 : n - 0x57 ] + "+";
                s="";
            }else if( n == 0x6c ){ // 'l'
                if( s ) r += "\"" + s + "\"+";
                r += "(![]+\"\")[" + gv + "._$_]+";
                s = "";
            }else if( n == 0x6f ){ // 'o'
                if( s ) r += "\"" + s + "\"+";
                r += gv + "._$+";
                s = "";
            }else if( n == 0x74 ){ // 'u'
                if( s ) r += "\"" + s + "\"+";
                r += gv + ".__+";
                s = "";
            }else if( n == 0x75 ){ // 'u'
                if( s ) r += "\"" + s + "\"+";
                r += gv + "._+";
                s = "";
            }else if( n < 128 ){
                if( s ) r += "\"" + s;
                else r += "\"";
                r += "\\\\\"+" + n.toString( 8 ).replace( /[0-7]/g, function(c){ return gv + "."+b[ c ]+"+" } );
                s = "";
            }else{
                if( s ) r += "\"" + s;
                else r += "\"";
                r += "\\\\\"+" + gv + "._+" + n.toString(16).replace( /[0-9a-f]/gi, function(c){ return gv + "."+b[parseInt(c,16)]+"+"} );
                s = "";
            }
        }
        if( s ) r += "\"" + s + "\"+";

        r = 
        gv + "=~[];" + 
        gv + "={___:++" + gv +",$$$$:(![]+\"\")["+gv+"],__$:++"+gv+",$_$_:(![]+\"\")["+gv+"],_$_:++"+
        gv+",$_$$:({}+\"\")["+gv+"],$$_$:("+gv+"["+gv+"]+\"\")["+gv+"],_$$:++"+gv+",$$$_:(!\"\"+\"\")["+
        gv+"],$__:++"+gv+",$_$:++"+gv+",$$__:({}+\"\")["+gv+"],$$_:++"+gv+",$$$:++"+gv+",$___:++"+gv+",$__$:++"+gv+"};"+
        gv+".$_="+
        "("+gv+".$_="+gv+"+\"\")["+gv+".$_$]+"+
        "("+gv+"._$="+gv+".$_["+gv+".__$])+"+
        "("+gv+".$$=("+gv+".$+\"\")["+gv+".__$])+"+
        "((!"+gv+")+\"\")["+gv+"._$$]+"+
        "("+gv+".__="+gv+".$_["+gv+".$$_])+"+
        "("+gv+".$=(!\"\"+\"\")["+gv+".__$])+"+
        "("+gv+"._=(!\"\"+\"\")["+gv+"._$_])+"+
        gv+".$_["+gv+".$_$]+"+
        gv+".__+"+
        gv+"._$+"+
        gv+".$;"+
        gv+".$$="+
        gv+".$+"+
        "(!\"\"+\"\")["+gv+"._$$]+"+
        gv+".__+"+
        gv+"._+"+
        gv+".$+"+
        gv+".$$;"+
        gv+".$=("+gv+".___)["+gv+".$_]["+gv+".$_];"+
        gv+".$("+gv+".$("+gv+".$$+\"\\\"\"+" + r + "\"\\\"\")())();";

        return r;
    }

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('jjencode', 'Grunt plugin to obfuscate using jjencode method', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            variable: '$'
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (file) {
            // Concat specified files.
            var src = file.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                // Read file source.
                // console.log("aaa", grunt.file.read(filepath));
                return jjencode(options.variable, grunt.file.read(filepath));
            });

            // Handle options.
            // src += options.punctuation;

            // Write the destination file.
            grunt.file.write(file.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });

};

# grunt-jjencode
> Grunt plugin to obfuscate using jjencode method

## Disclaimer
I don't own or have developed 'jjencode' function, I found it [on this website](http://utf-8.jp/public/jjencode.html) but I don't know if they're the rightful owners. If anybody can point me to the rightfull owner please create a ticket and I'll update this description ASAP.

This plugin is designed to obfuscate code, given a simple code like:
```javascript
window.testInfo = {
    plugin: 'jjencode',
    taksRunner: 'grunt'
};
```
will generate the following output
```javascript
$=~[];$={___:++$,$$$$:(![]+"")[$],__$:++$,$_$_:(![]+"")[$],_$_:++$,$_$$:({}+"")[$],$$_$:($[$]+"")[$],_$$:++$,$$$_:(!""+"")[$],$__:++$,$_$:++$,$$__:({}+"")[$],$$_:++$,$$$:++$,$___:++$,$__$:++$};$.$_=($.$_=$+"")[$.$_$]+($._$=$.$_[$.__$])+($.$$=($.$+"")[$.__$])+((!$)+"")[$._$$]+($.__=$.$_[$.$$_])+($.$=(!""+"")[$.__$])+($._=(!""+"")[$._$_])+$.$_[$.$_$]+$.__+$._$+$.$;$.$$=$.$+(!""+"")[$._$$]+$.__+$._+$.$+$.$$;$.$=($.___)[$.$_][$.$_];$.$($.$($.$$+"\""+"\\"+$.__$+$.$$_+$.$$$+"\\"+$.__$+$.$_$+$.__$+"\\"+$.__$+$.$_$+$.$$_+$.$$_$+$._$+"\\"+$.__$+$.$$_+$.$$$+"."+$.__+$.$$$_+"\\"+$.__$+$.$$_+$._$$+$.__+"\\"+$.__$+$.__$+$.__$+"\\"+$.__$+$.$_$+$.$$_+$.$$$$+$._$+"\\"+$.$__+$.___+"=\\"+$.$__+$.___+"{\\"+$.__$+$._$_+"\\"+$.$__+$.___+"\\"+$.$__+$.___+"\\"+$.$__+$.___+"\\"+$.$__+$.___+"\\"+$.__$+$.$$_+$.___+(![]+"")[$._$_]+$._+"\\"+$.__$+$.$__+$.$$$+"\\"+$.__$+$.$_$+$.__$+"\\"+$.__$+$.$_$+$.$$_+":\\"+$.$__+$.___+"'\\"+$.__$+$.$_$+$._$_+"\\"+$.__$+$.$_$+$._$_+$.$$$_+"\\"+$.__$+$.$_$+$.$$_+$.$$__+$._$+$.$$_$+$.$$$_+"',\\"+$.__$+$._$_+"\\"+$.$__+$.___+"\\"+$.$__+$.___+"\\"+$.$__+$.___+"\\"+$.$__+$.___+$.__+$.$_$_+"\\"+$.__$+$.$_$+$._$$+"\\"+$.__$+$.$$_+$._$$+"\\"+$.__$+$._$_+$._$_+$._+"\\"+$.__$+$.$_$+$.$$_+"\\"+$.__$+$.$_$+$.$$_+$.$$$_+"\\"+$.__$+$.$$_+$._$_+":\\"+$.$__+$.___+"'\\"+$.__$+$.$__+$.$$$+"\\"+$.__$+$.$$_+$._$_+$._+"\\"+$.__$+$.$_$+$.$$_+$.__+"'\\"+$.__$+$._$_+"};"+"\"")())();
```
Notice that will generate a variable on the global scope. You can set up the variable using the options.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jjencode --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jjencode');
```

## The "jjencode" task

### Overview
In your project's Gruntfile, add a section named `jjencode` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jjencode: {
    options: {
      variable: '$'
    },
    your_target: {
      'result.js': ['source.js']
    },
  },
})
```

### Options

#### options.variable
Type: `String`
Default value: `'$'`

Variable where the encoded information will be attached to.


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  jjencode: {
    options: {},
    files: {
      'dest/result.js': ['src/original.js', 'src/second_original.js'],
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  jjencode: {
    options: {
      variable: 'encoded'
    },
    files: {
      'dest/result.js: ['src/original.js', 'src/second_original.js'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
  * 2013-12-23  v.0.1.0 First release, documentation and unit tests updated.
  * 2013-12-23  v.0.0.1 Initial release.

## License
Copyright (c) 2013 Blai Pratdesaba <hello@blaipratdesaba.com>. Licensed under the MIT license.

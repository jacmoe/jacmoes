<!--
Title: How to install xDebug and Webgrind on Wamp
Author:
Date: 2010/11/03 03:43:00
Datetime: 2010-11-03
Updated: 2010/11/03 16:58:00
Description: How to install XDebug and Webgrind on Wamp
Template: post
Disqusid: /how-to-install-xdebug-and-webgrind-on-wamp
ogimage: webgrind/webgrind.png
thumb: webgrind/webgrind_custom.png
Keywords: webgrind, wamp, xdebug, php
Tags: php, webdev, wamp
blogpost: true
published: true
-->
(inimage:Webgrind in action source:webgrind/webgrind.png)

Here's how to install [XDebug](http://xdebug.org/) and [Webgrind](http://code.google.com/p/webgrind/) on [Wamp](http://www.wampserver.com/en/).

I struggled to get it working, and the Webgrind installation instructions are severely lacking, but it turned out to be simple enough - if you know how to do it.

(clearfix:)

1) Download XDebug from [XDebug Download Page](http://xdebug.org/download.php)

2) Put the dll in your PHP extension directory - it's C:\wamp\bin\php\php5.3.0\ext on my machine.

3) Put this line in your php.ini - in the list of extensions:

    zend_extension = c:\wamp\bin\php\php5.3.0\ext\php_xdebug-2.1.0-5.3-vc6.dll

4) Add a [XDebug] section to php.ini:

    [xdebug]
    xdebug.profiler_enable = 1
    xdebug.profiler_output_dir = "c:\wamp\www\webgrind\tmp"
    xdebug.profiler_output_name = cachegrind.out.%t.%p

5) Restart wampserver and check that the extension is loaded. You can do that by making a info.php file with the following content in your www directory:

    <?php
    phpinfo();

6) Download Webgrind from [here](http://code.google.com/p/webgrind/downloads/list) and unpack it into your 'www' directory.

7) Edit C:\wamp\www\webgrind\config.php to change the storage directories:

	static $storageDir = 'c:\wamp\www\webgrind\tmp';
	static $profilerDir = 'c:\wamp\www\webgrind\tmp';

8) Create a .htaccess file and put it in the webgrind directory - with the following contents:

    php_flag xdebug.profiler_enable 0

That prevents Webgrind to run profiling on itself.

9) Run the phpfinfo script again to generate some profiling data.

10) Open up your browser at http://localhost/webgrind and see the results. You might need to click the 'Update' button first.

That's it!

I hope this saves someone from going nuts.

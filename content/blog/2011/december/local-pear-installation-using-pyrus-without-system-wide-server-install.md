<!--
Title: Local Pear installation using Pyrus without system-wide server-install
Author:
Date: 2011/12/03 03:43:00
Datetime: 2011-12-03
Updated: 2011/12/03 16:58:00
Description: How to install PHP PEAR locally using Pyrus on your development machine and use it on your web host without server install.
Template: post
Disqusid: /local-pear-installation-using-pyrus-without-system-wide-server-install
ogimage: pyrus/pyrus.jpg
thumb: pyrus/pyrus_custom.jpg
Keywords: pyrus, pear, php, pear2
Tags: php, programming
blogpost: true
published: true
 -->
(lightbox:Pyrus source:pyrus/pyrus_mobile.jpg target:pyrus/pyrus.jpg)

[PEAR](http://pear.php.net/) is a framework and distribution system for reusable PHP components.
A PEAR repository is installed either locally or system-wide and is tied to the machine it's installed on.

Wouldn't it be great if you could do a directory-local PEAR install? That could be freely moved around in the filesystem, including other machines? How about multiple project-specific PEAR installations? That you can submit to source control?

With [Pyrus](http://pear2.php.net/pyrus.phar) and the [PEAR2](http://pear2.php.net/) standards you can.

Pyrus is the next generation PEAR installer, which is available as a self-contained phar archive: [http://pear2.php.net/pyrus.phar](http://pear2.php.net/pyrus.phar)

(clearfix:)

So how do you do this?

Let's say you have a project where you want to install third-party libraries into a 'vendors' directory:

1) Download the Pyrus phar archive and put it in your project 'vendors' directory.

2) Create two directories: 'vendors/pyrus' and 'vendors/pyrus/bin'.

3) Initialize Pyrus using this command from the 'vendors' directory:

    php pyrus.phar ./pyrus set bin_dir ./pyrus/bin

A self-contained PEAR2 repository is now installed in 'your_project/vendors/pyrus'.

This is all you need to do, really.

To illustrate how you install PEAR packages, let's install XML_Parser:

    php pyrus.phar install pear/XML_Parser-1.3.4

It should now be installed in `'your_project/vendors/pyrus/php/XML'`

You can now go ahead and add it to source control, upload it to your web server, and/or move the directory around. It doesn't need any installation/configuration because it's contained to the `'pyrus'` directory inside the `'vendors'` directory.

To upgrade our `XML_Parser` package, we can issue this command:

    php pyrus.phar upgrade pear/XML_Parser-1.3.4

Note: Some instructions state that you need to pass the installation directory to Pyrus as the first argument (`php pyrus.phar ./pyrus` ...) but it works without.

Enjoy your flexible PEAR installs!

<!--
Title: How to send emails with msmtp on Windows or Linux or Mac OS X
Author:
Date: 2013/01/03 03:43:00
Datetime: 2013-01-03
Updated: 2013/01/03 16:58:00
Description: When you are a developer it is often useful to be able to send emails from your local machine without having to install an email server like sendmail. This example uses PHP and a Gmail account.
Template: post
Disqusid: /how-to-send-emails-with-msmtp-on-windows-or-linux-or-mac-os-x
ogimage: msmtp/email-at-work.jpg
thumb: msmtp/email-at-work_custom.jpg
Keywords: windows, linux, sendmail, php, gmail, msmtp, wamp, email, programming, uniformserver
Tags: windows, linux, sendmail, php, gmail, msmtp, wamp, email, programming, uniformserver
blogpost: true
published: true
 -->
(lightbox:Email at work source:"msmtp/email-at-work_mobile.jpg" target:msmtp/email-at-work.jpg size:medium)

Sometimes you need to just be able to send emails, without having to install a full-fledged email server and/or use a dedicated library, like [Swiftmailer](http://swiftmailer.org/)  or [PHPMailer](http://phpmailer.worxware.com/)   (assuming, of course, that you use PHP - otherwise insert your favorite email library here).

The send function in PHP uses sendmail (if it's installed) to send emails, and this blog post outlines a way to be able to do that by means of a small program which can emulate sendmail.

I wrote a [blogpost](/blog/2011/october/how-to-send-test-emails-using-php-mail-from-your-local-wamp-installation)  previously about using fake sendmail for the same purpose, but msmtp (which is what we'll be using here) seems to be actively maintained, and it's in most package repositories for Linux, so a much better option IMO. ;)

And, like fake sendmail, it works in Windows too.

(clearfix:)

## Prerequisites
We are using [msmtp](http://msmtp.sourceforge.net/) - it probably stands for "Martin's SMTP" and it is a SMTP client which can be used instead of sendmail (fake sendmail).

It is available for most OS's.

And it's not really limited to be used with PHP,  you can also use the command line, or any program / programming language.

If you don't have a Gmail account, either get one, or substitute the settings. :p

It is also assumed that you are using Apache. :)


## Installation and configuration
Installation and configuration is fairly painless.

Normally you don't have to build it from source, and you can install it using a package manager on most Linuxes.

Precompiled binaries is available for Windows from msmtp's Sourceforge download page.

The following two sections explains how to get it installed and configured in Linux (and Mac OS X) and Windows:

### Linux and Mac
On Debian (and Ubuntu) msmtp should be just an apt-get away:
```bash
sudo apt-get install msmtp ca-certificates
```

After installing it we need to create a configuration file for it. Create a new file in /etc:

```bash
sudo touch /etc/msmtprc
sudo gedit /etc/msmtprc
```
The file is called msmtprc, not msmtp.rc ! :)

Now, paste the following into the new file:

	defaults
	tls on
	tls_starttls on
	tls_trust_file /etc/ssl/certs/ca-certificates.crt
	account default
	host smtp.gmail.com
	port 587
	auth on
	user username@gmail.com
	password mypass
	from username@gmail.com

Make sure that you change username and password to match your account.

Note: you might have to add an entry in the authorized list of application in your Google account and use that application specific password instead of your Gmail password.

You probably need to change file permissions on the new configuration file, like so:

	sudo chmod 0644 /etc/msmtprc

### Windows
Either copy the msmtp.exe to Windows\System32 or add the location to your global PATH environment.
Now, you need to decide on where you want to store the data: in your local AppData directory, or in the global ProgramData directory.

I recommend that you use the global directory because you will then share the configuration data between you (as a user) and the Apache/PHP user(s).

It is a hidden directory in your system drive (normally C:) - for this example it will be `C:\ProgramData`.

Download the following file: [http://www.geotrust.com/resources/root_certificates/certificates/Equifax_Secure_Certificate_Authority.pem](http://www.geotrust.com/resources/root_certificates/certificates/Equifax_Secure_Certificate_Authority.pem)  and save it as `"ThawtePremiumServerCA_b64.txt"` in `"C:\ProgramData"`.

Next, create a file called `msmtprc.txt` in `"C:\ProgramData"`, with the following contents:

	account gmail
	host smtp.gmail.com
	auth on
	user username@gmail.com
	password yourpassword
	tls on
	tls_starttls on
	tls_trust_file "C:\ProgramData\ThawtePremiumServerCA_b64.txt"
	port 587
	from username@gmail.com
	maildomain gmail.com
	account default : gmail

Of course, you need to substitute `'username'` and `'yourpassword'`.

## Test that it works
Now we are ready to test that msmtp works.

Run this in a console:

	echo -e "Subject: Test Mail\r\n\r\nThis is a test mail" |msmtp --debug --from=default -t username@gmail.com

Change the email address to match your actual email address. :)

The same command can be used in Windows as well! (cmd.exe)

It should output a lot of debug information, and hopefully execute without an error.

If you do get an authentication error, you need to add an entry to the Application-specific passwords in your Google account settings: [https://www.google.com/settings/security](https://www.google.com/settings/security)

### PHP
Edit the PHP configuration file. In Linux:

	sudo gedit /etc/php5/apache2/php.ini

On Windows, the location of php.ini differs from installation to installation. In Wampserver you can use the system tray icon to edit php.ini.

You need to setup sendmail_path:

	sendmail_path = '/usr/bin/msmtp -t'

In Windows, the path should be just 'msmtp -t'.

You can check where msmtp is installed by running this command (in Linux):

	which msmtp

Now we need to restart Apache:

	sudo /etc/init.d/apache2 restart

How you do this in Windows differs from what program package you've installed. Wampserver has an icon in the system tray which you can use to restart Apache.

Let's test if the mail() function works:
```php
if (mail('yourusername@gmail.com', 'Test email sent from localhost', 'This works great!'))
	echo 'Mail sent';
else
	echo 'Error. Something is wrong.';
```
Again, change the email address to match your own.

Put the php file in your virtual host root folder and execute it through the browser.

Hopefully it works! :)


## Conclusion
Now you don't need to use a third-party library for sending emails or configure your own email server.

You can now use msmtp to act like sendmail. And not only from PHP, but pretty much any program or programming language - including sending emails from the console.

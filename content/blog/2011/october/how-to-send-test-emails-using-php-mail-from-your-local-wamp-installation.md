<!--
Title: How to send test emails using php mail from your local wamp installation
Author:
Date: 2011/10/31 03:43:00
Datetime: 2011-10-31
Updated: 2011/10/31 16:58:00
Description: How to send test emails using PHP mail from your WAMP server by means of fake sendmail and a GMail account.
Template: post
Disqusid: /how-to-send-test-emails-using-php-mail-from-your-local-wamp-installation
ogimage: wampemail/test_email.jpg
thumb: wampemail/test_email_custom.jpg
Keywords: gmail, php, windows, sendmail, wamp
Tags: php, windows, wamp, email
blogpost: true
published: true
-->
(inimage:Email Magic source:wampemail/test_email.jpg)

How do you send emails using plain PHP mail on WAMP on Windows?

Normally, PHP mail works by using Sendmail which is installed on *nixes, so it doesn't work on a Windows box. However, normally we just rewrite our code to using a SMTP server, but what about when we really don't want to - or can't - modify third-party code?


Fake sendmail to the rescue!

(clearfix:)

## Prequisites
Make sure that you get the following:

- [Wampserver](http://www.wampserver.com/en) or any Windows based LAMP stack
- [Fake Sendmail](http://glob.com.au/sendmail/)

Fake sendmail - sendmail.exe - emulates Sendmails "-t" option to send emails and it needs a working SMTP configuration. For this example we use a Gmail account, but you can use any compatible SMTP server.

If you've installed Wampserver in *C:\wamp*, unzip the contents of the fake sendmail archive into C:\wamp\sendmail. Otherwise adjust accordingly.

## Configuration
### Sendmail
Now, we need to edit `C:\wamp\sendmail\sendmail.ini`:

    smtp_server=smtp.gmail.com
    smtp_port=465
    auth_username=user@gmail.com
    auth_password=your_password

The above will work against a Gmail account. :)

### PHP
Now we need to edit *php.ini* and set sendmail_path:

    sendmail_path = "C:\wamp\sendmail\sendmail.exe -t"

Now, restart Apache, and that is basically all you need to do.

## Sending a test email
Now we can't wait to test if it works!

Create a php script, like this:

    <?php
    $to      = 'some@email.here';
    $subject = 'Fake sendmail test';
    $message = 'If we can read this, it means that our fake Sendmail setup works!';
    $headers = 'From: your@email.here' . "\r\n" .
        'Reply-To: your@email.here' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    if(mail($to, $subject, $message, $headers)) {
        echo 'Email sent successfully!';
    } else {
        die('Failure: Email was not sent!');
    }

Put it in your www directory and run it.

If it worked successfully - you should receive an email from yourself shortly - you can now use the 'vanilla' PHP mail function. And you don't need to modify existing code to work on non-sendmail platforms.

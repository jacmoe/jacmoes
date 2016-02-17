<!--
Title: Secure Apache
Author: Jacob Moen
Date: 2016/02/10 20:02
Datetime: 2016-02-10
Description: The dark art of secure Apache virtual hosts
Template: post
Disqusid: /2016/february/secure-apache
ogimage: secureapache/secureapache.jpg
thumb: secureapache/secureapache_custom.jpg
Keywords: apache, security, ssl
Tags: apache, ssl, security
blogpost: true
published: true
-->
(lightbox:Secure Apache source:secureapache/secureapache_mobile.jpg target:secureapache/secureapache.jpg)

[Let's Encrypt](https://letsencrypt.org/) is a new Certificate Authority, that is free, automated and open.

And since my hosting provider, Dreamhost, offers secure hosting using Let's Encrypt for free, I made the switch.

That, however, created some problems on my local development machine, so I had to figure out how to make Apache serve my local sites securely.

(clearfix:)

Apache configuration is a dark, arcane art - but I finally managed to make it all work - after long internet search sessions and much frustration :)

## Global Stuff

### Httpd conf

These are global options that may or may not be set by Apache.

Would be a good idea to check if they are:
```
Listen 443
SSLCipherSuite HIGH:MEDIUM:!aNULL:!MD5
SSLPassPhraseDialog  builtin
SSLSessionCache        "shmcb:/opt/lampp/logs/ssl_scache(512000)"
SSLSessionCacheTimeout  300
```
I am not sure if all of them are required. :)

Sometimes they are in a `httpd-ssl.conf` file in *extra*.

## Virtual Hosts

### Http
This is our regular virtual host, running on port 80 (insecure):
```
<VirtualHost *:80>
    DocumentRoot "/home/jacmoe/webdev/vhosts/jacmoe/"
    ServerName local.jacmoe.dk
    <Directory "/home/jacmoe/webdev/vhosts/jacmoe/">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```
On my machine they are defined in `extra/httpd-vhosts.conf`..

### Https
Here is the secure version:
```
<VirtualHost local.jacmoe.dk:443>
    DocumentRoot "/home/jacmoe/webdev/vhosts/jacmoe/"
    ServerName local.jacmoe.dk
    <Directory "/home/jacmoe/webdev/vhosts/jacmoe/">
        AllowOverride All
        Require all granted
    </Directory>
    SSLEngine on
    SSLCipherSuite ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP:+eNULL
    SSLCertificateFile "/opt/lampp/etc/ssl.crt/bugitor.dev.crt"
    SSLCertificateKeyFile "/opt/lampp/etc/ssl.key/bugitor.dev.key"

    <FilesMatch "\.(cgi|shtml|pl|asp|php)$">
        SSLOptions +StdEnvVars
    </FilesMatch>

    <Directory /usr/lib/cgi-bin>
                    SSLOptions +StdEnvVars
    </Directory>

    BrowserMatch "MSIE [2-6]" \
                    nokeepalive ssl-unclean-shutdown \
                    downgrade-1.0 force-response-1.0
    BrowserMatch "MSIE [17-9]" ssl-unclean-shutdown
</VirtualHost>
```
Not sure if those `BrowserMatch` *'thingies'* are needed, but it does not hurt to have them, I guess.

### Htaccess
Since I want to force https for my site, I have this rewrite rule in my `.htaccess`:
```
RewriteEngine on

# Redirect http to https
RewriteCond %{SERVER_PORT} ^80$
RewriteRule ^.*$ https://%{SERVER_NAME}%{REQUEST_URI} [R=301,L]
```
It is a permanent redirect from http (port 80) to https.


## Certificates
Since the instructions here are for local development, I found it was easier to simply create a self-signed SSL certificate, because OpenSSL is already installed on my machine.

This is the guide I used:  
[How to create a self-signed SSL Certificate](http://www.akadia.com/services/ssh_test_certificate.html)

You can also install a certificate from [Let's Encrypt](https://letsencrypt.org/) - I believe all you have to do is run a script called `letsencrypt-auto`:
[Transition to the new letsencrypt-auto script](https://community.letsencrypt.org/t/announcement-transition-to-the-new-letsencrypt-auto-script/10532)

## Happy and Secure
After restarting Apache, when visiting your local site, you will experience one of two things:

- a green padlock if you used a properly signed certificate from Let's Encrypt.
- a warning, telling you that there are problems with the certificate and do you want to make an exception, if you self-signed your certificate.

In any case, you are now using the secure protocol, also when developing locally.

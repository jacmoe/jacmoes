<!--
Title: Multiple Local Apache Virtual Hosts
Author:
Date: 2011/09/18 03:43:00
Datetime: 2011-09-18
Updated: 2011/09/18 16:58:00
Description: How to set up multiple local virtual hosts with Apache for web development on Linux
Template: post
Disqusid: /multiple-local-apache-virtual-hosts
ogimage: multiple-vhosts/virtual_hosts_diagram_1.jpg
thumb: multiple-vhosts/virtual_hosts_diagram_1_custom.jpg
Keywords: localhost, arch, php, web, virtualhost, apache, linux
Tags: apache, linux, webdev
blogpost: true
published: true
-->
(inimage:Apache Virtual Hosts source:multiple-vhosts/virtual_hosts_diagram_1.jpg)

Until now I've been using subdirectories in the main web directory for the various web projects - like http://localhost/projectone and http://localhost/projecttwo - or I simply renamed the main directory every time I switched project.

While that works, it is clunky and tedious and error-prone. And there are some things in webprogramming which does not work on 'localhost', like cookie validation. It also makes it impossible to have sitespecific sessions.

What I really want is http://one.projects and http://two.projects.

(clearfix:)

I've known about virtual hosts in Apache for some time, but I've kept putting it off because I thought it would be difficult. But it turned out to be simple enough.

## Solution
The whole process is made out of 5 simple steps:

Edit /etc/hosts and add your new virtual host(s) to it.
Modify /etc/httpd/conf/httpd.conf and uncomment vhosts include
Add your virtual hosts in /etc/httpd/conf/extra/httpd-vhosts.conf.
Create directory /srv/one with a test script in it.
Restart Apache
I am using Arch Linux, so you might need to follow a slightly different procedure if you are using a different directory layout.

This is written for Apache 2.2, so if you are using something else, you might adjust to it - refer to the Apache documentation (or Bing/Google).

Also, I am not saying that this is the correct, or even the best, approach - but it works for me. Wink

### /etc/hosts
This file usually looks like this:

    #
    # /etc/hosts: static lookup table for host names
    #

    #<ip-address>	<hostname.domain.org>	<hostname>
    127.0.0.1	localhost.localdomain	localhost
    ::1		localhost.localdomain	localhost

    # End of file

What we need to do is add an entry for our new virtual host. Let's call it `one.projects`:

    #
    # /etc/hosts: static lookup table for host names
    #

    #<ip-address>	<hostname.domain.org>	<hostname>
    127.0.0.1	localhost.localdomain	localhost
    127.0.0.1       one.projects
    ::1		localhost.localdomain	localhost

    # End of file

To save it, you need to be root.

### /etc/httpd/conf/httpd.conf
To avoid having to edit the main Apache configuration file too much we use the include directive. So find a line which looks like this and uncomment it (if it isn't already):

    # Virtual hosts
    Include conf/extra/httpd-vhosts.conf

If that line isn't there, you can add it, or edit directly in httpd.conf - that's up to you.

### /etc/httpd/conf/extra/httpd-vhosts.conf
This file is usually either empty or consisting of example entries. Edit it to look like this:

    #
    # Virtual Hosts
    #
    #
    # Use name-based virtual hosting.
    #
    NameVirtualHost *:80

    #
    # "one.projects" VirtualHost:
    #
    <Directory "/srv/one">
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Order allow,deny
    Allow from all
    </Directory>
    <VirtualHost *:80>
        ServerAdmin webmaster@one.projects
        DocumentRoot "/srv/one"
        ServerName one.projects
        ErrorLog "/var/log/httpd/one.projects-error_log"
        CustomLog "/var/log/httpd/one.projects-access_log" common
    </VirtualHost>

Of course, you need to change /srv with /var on most Linux systems if your default document root is /var/www.

Important: If you still want http://localhost to be served from /var/www (or /srv/http), you need to add it as a virtual host, just like what we did for one.projects above:

    <Directory "/srv/http">
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Order allow,deny
    Allow from all
    </Directory>
    <VirtualHost *:80>
        ServerAdmin webmaster@localhost.localdomain
        DocumentRoot "/srv/http"
        ServerName localhost
        ErrorLog "/var/log/httpd/localhost-error_log"
        CustomLog "/var/log/httpd/localhost-access_log" common
    </VirtualHost>

### /srv/one/index.php
Now, we create a directory in /srv named 'one' (or in /var) and put a script in it. Either a regular html file or a php script. Maybe this? ->

    <?php echo 'one.projects says: It works!';

Save it as 'index.php' in /srv/one.

### Restart Apache
First, we run a test on the new configuration:

    /usr/sbin/httpd -S

If it says Syntax OK, we are ready to restart Apache. Run this as root:

    /etc/rc.d/httpd restart

If using sys-v init style:

    service httpd restart

If you go to http://one.projects/ you should see your new page coming up.

Obviously, you will want to add additional virtual hosts, like 'two', 'three', 'myblog', etc. Just create a new directory in /srv or /var and add it to /etc/hosts and /etc/httpd/conf/extra/httpd-vhosts.conf, and then - after an Apache restart - you can go to http://one.projects, http://two.projects, etc.

## Conclusion
This is a quick and dirty way of using Apache virtual hosts if you are working on several web projects at the same time.

Feel free to comment if anything is wrong, inaccurate or unclear. I hope it helps someone 'out there'.

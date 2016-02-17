<!--
Title: Blog to basics - Part one
Author: Jacob Moen
Date: 2015/02/22 13:38
Datetime: 2015-02-22
Description: The rejuvenation of my blog by getting rid of junk like database and code bloat and start using a flat file based blogging software called Phile.
Template: post
Disqusid: /blog-to-basics
ogimage: blog2basics/flatfile.jpg
thumb: blog2basics/flatfile_custom.jpg
Keywords: cms, phile, philecms, flat, file, flatfile, blog, blogging, php, database
Tags: philecms, blogging, blog, php, software, programming
blogpost: true
published: true
-->
(inimage:Flat file cabinet source:blog2basics/flatfile_mobile.jpg)
### What I had
Until not too long ago, my blog was powered by a somewhat elaborate homemade (Frankenstein?) CMS written in PHP and based on the [Yii Framework](http://www.yiiframework.com/). And it used a database, had a login, and featured an editor. You could add and remove pages, upload files and even have it generate thumbnails.

But it was slow, cumbersome to use and maintain, and - obviously - failed to inspire me to write good blog posts.

(clearfix:)

The main problem was the editor. I've tried numerous different kinds of editors over the years. All kinds. Visual, textual, markup, plain text, minimal and full blown.  
And it all sucked. Either because it messed up the layout, had too many or too few features, and either got in the way or did too little.

I found myself installing too many widgets and third party libs, and the database grew in size. Not really due to the actual blog posts, but from all the plumbing. Not only the database, but the entire installation, approached the size of the average [Wordpress](https://wordpress.org/) installation.

### What I wanted
I started to search around for alternatives.
I wanted something truly minimal, instead of a monster package.  

So, after having neglected my blog for a long, long time, mainly due to the cumbersome blog entry editing interface, I have now abandoned my custom framework based on Yii, and instead opted for [PhileCMS](http://philecms.com/).

I did try out some alternatives, and there are quite a few CMS-like blog software packages which doesn't use a database, based on flat files:

I looked at:  

* [Jekyll](http://jekyllrb.com/)  
* [Kirby](http://getkirby.com/)  
* [Ghost](https://ghost.org/)  
* [AnchorCMS](http://anchorcms.com/)  
* [Pico](http://picocms.org/)  
* [Dropplets](http://dropplets.com/)  
* [Octopress](http://octopress.org/)  
* [Statamic](http://statamic.com/)  
* [Grav](http://getgrav.org/)  
* ...  

I was looking for:  

* Flat file storage engine.  
* PHP-based.  
* No on-line/back-end functionality.  
* Small, flexible code-base: easy to overlook, understand, maintain.  
* Preferably powered by the [Twig](http://twig.sensiolabs.org/) template engine.  
* Markup based files, like [Markdown](http://daringfireball.net/projects/markdown/), with the flexibility of being able to extend the syntax easily.  

Dropplets came close, but I wasn't impressed by it's functionality. AnchorCMS tries to do way too much, Grav as well. But I would probably have gone for the latter, if I didn't happen to stumble upon Pico, which seems to be exactly what I wanted, except that I wound up using [PhileCMS](http://philecms.com/) which is a fork of [Pico](http://picocms.org/), but using more modern/modular PHP. :)

I could have gone with Jekyll or even Emacs and Org-Mode, but those are site generators, not flat-file based micro-CMS's - all I want is to be able to write a post in Markdown and put it in a folder on my server, and that's it.

### To be continued

The [next](/blog/2015/october/blog-to-basics-part-two) part of this post will cover every glorious detail of my new blogging 'platform', so stay tuned. ;)

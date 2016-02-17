<!--
Title: Blog to basics - Part two
Author: Jacob Moen
Date: 2015/10/27 13:38
Datetime: 2015-10-27
Description: The second part of my post about how I ditched complexity and started using a flat file php-based blogging software package called Phile.
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
In my [previous](/blog/2015/february/blog-to-basics-part-one) blog post, I described what made me switch from using a full-featured (and over-engineered) custom built blog based on [Yii](http://www.yiiframework.com) to a flat-file based simple cms based on [PhileCMS](http://philecms.github.io/Phile/).

This blog post will explain how I have put together my own simple blogging platform, and hopefully convincingly show why I think it's better.

(clearfix:)

## PhileCMS ##
The software this new simple blogging platform is built upon is [PhileCMS](http://philecms.com)

Here are things that I really like about Phile:
### Content organization ###
It is a flat-file based content management system, and in a nutshell it works like this:  
You have a `content` directory where you put your markdown files, and they become pages.


For instance, if you wanted to create the url `http://www.yoursite.com/blog` there would be two ways to do it: either by putting a file called `blog.md` into the root of the `content` folder or by creating a folder in there called `blog` and put a file called `index.md` into it.

This file, I have put into the `content/blog/2015/october` folder and it is called `blog-to-basics-part-two.md` and that gives the url `http://jacmoe.dk/blog/2015/october/blog-to-basics-part-two` which is great :)

That gives me control over url generation, and it is simple and physical.

The default markup engine in Phile is Markdown, but you can use a different markup plugin if you want, like Textile.

### Meta system ##
Since pages in Phile are physical files in a directory, we need a way to set properties of the individual page.

The way Phile handles that is by reading a special "meta-section" at the top of each page.

The meta section of this page reads:
```
<!--
Title: Blog to basics - Part two
Author: Jacob Moen
Date: 2015/10/27 13:38
Datetime: 2015-10-27
Description: The second part of my post ...<snipped>
Template: post
Disqusid: /blog-to-basics
ogimage: flatfile.jpg
thumb: flatfile_custom.jpg
Keywords: cms, phile, philecms, flat, file, flatfile, blog, blogging, php, database
Tags: philecms, blogging, blog, php, software, programming
blogpost: true
published: true
-->
```
You can put anything into the meta section of a page. And you can access this information in the `page.meta` object or the `{{meta}}` template variable.

No need to add a field to a database or change any code. If you want a piece of meta information to be associated with a page, then just add one.

I like that the properties that you attach to a file is in the file itself. That makes it easy to overlook and manage.

### Themes ###
The default templating plugin for Phile is powered by [Twig](http://twig.sensiolabs.org/), and it is really simple to use.

There are something like 13 template variables we can use in our markup - like `{{current_page}}`, `{{site_title}}`, etc. - and you are free to cook up your theme any way you see fit as long as the main file is called `index.html` because that is the default template.  
If you want a page to be rendered differently, then create a different file - like `blog.html` - and set the template to 'blog' in the meta section for that page, and Phile will use `blog.html` instead of `index.html` for rendering.

### Plugins ###
While Phile does not have tons of plugins, it does seem to have what you need.

And, if it doesn't, then it is simple enough to write your own plugins.

One plugin that I would like to mention explicitly is the **snippets** plugin that allows you to extend Markdown with your own bespoke tags.

After I installed and activated the plugin - a simple process I won't cover here - I added a couple of handy 'tags' that I can use when writing in Markdown, like the following tag:
```md
(clearfix:)
```
It is written in my config here:
```php
$config['plugins']['infostreams\\snippets']['snippets'] = array(
  'clearfix' => function($text=null) {
    return "<div class=\"clearfix\"></div>";
  },
```
And I now have a custom Markdown tag that I can use to fix the layout for my page.

I have also added a couple other tags, like the following:
```md
(lightbox:Awesome picture source:blog2basics/awesome_thumb.jpg target:blog2basics/awesome.jpg align:left)
```
Which spits out all the necessary code to turn it into a thumbnail image which you can click to view a larger image. Magical!

By using those custom tags I can also easily change the markup globally, instead of - like I did before - performing a global search/replace.  
For instance, I changed my gallery plugin and all I had to do was edit my configuration file to accomodate for the different syntax. :)

The snippets plugin is at [github](https://github.com/infostreams/snippets) if you want to check it out. Highly recommended!

I have installed Snippets, PhileTags, Phile Paginator, Phile RSS Feed and Phile XML Sitemap plugins for this site - 5 in all - in addition to the default Phile plugins.

## Sample workflow ##
(lightbox:Writing a blog post source:blog2basics/articlewrite_mobile.png target:blog2basics/articlewrite.png align:right)

The code and the content of my site is in a [Mercurial](https://www.mercurial-scm.org/) repository and hosted on [Bitbucket](https://bitbucket.org/) at [https://bitbucket.org/jacmoe/jacmoes](https://bitbucket.org/jacmoe/jacmoes).

I start by creating a file in the `[site]/content/blog/2015/october` folder called `blog-to-basics-part-two.md`, add it to source control and start writing.

(clearfix:)

I prefer to use the [Atom](https://atom.io/) editor because it has great support for Markdown and is quite configurable, but any old editor will do.

For the images, I use [RIOT](http://luci.criosweb.ro/riot/) <small>(Radical Image Optimization Tool)</small> to optimize and resize them before I put them into the `[site]/content/images` directory.

After writing the post, I commit and push to Bitbucket where I until recently had a working commit hook that automatically uploaded the changed files to the webserver.  
They changed their API, however, so I am now using a regular FTP client to get the files on my server.

And that's how I write and publish a blog post.

### Version control ###
Because I am using a version control system like Mercurial and because I am hosting it on Bitbucket, I get some really nice things "for free":

#### History ####
(lightbox:File diff at Bitbucket source:blog2basics/diff_mobile.png target:blog2basics/diff.png align:right)
Both Mercurial (TortoiseHg) and Bitbucket has a nice graphical history view where you can get a diff of how the individual files has changed.

It also makes it easy to revert back to a better state, if need be.

I haven't come across a CMS with such features.

#### Access control ####
I am pushing to Bitbucket over SSH, and that is quite secure.

I can even accept pull requests, etc - again try to find a CMS with similar capabilities.

#### Web based editor ####
Should I want to use a webbased editor, Bitbucket has you covered.

No need to reinvent anything.

(clearfix:)

## Conclusion ##

### Performance ###
On [GTmetrix](https://gtmetrix.com/reports/jacmoe.dk/8Yb6cb3b) this page got a 93% PageSpeed (A) score and a 92% YSlow (A) score. Which is better than most sites out there! :)

And I haven't even turned on template caching. :)

### Security ###
Mercurial/Bitbucket handles access control and the site itself is 'readonly' and thus not vulnerable to SQL injection, XSS cross-site scripting, etc.  
I have configured my webhost to only accept secure FTP connections, so I am definitely feeling fairly safe.

### Verdict ###
For personal blogging, my preference is a system based on PHP and Twig with an elegant, yet simple architecture, as explained above.  

I am glad that I settled on [PhileCMS](http://philecms.github.io/Phile/) - it is perfect for me.  

Your preferences will probably differ from mine, but I hope that you'll see that flat-file CMS systems offers great benefits over more elaborate all-in-one publishing platforms.  

The main reason why I am using a simple flat-file CMS system is because it allows me to use exactly the right tools for the job, like my favorite texteditor, my specialized image processing tools of choice to optimize and resize images, a version control system like Mercurial to handle authentication and deployment while keeping track of history, etc.

It means that I have a high degree of control over the process - and I like being in control! If something breaks, I can step in and fix it.  
That doesn't happen often, though, because there a so few moving parts.

Because the content is physical files, there is no database (to corrupt, lose, forget to back up, ..) and changing stuff on a large scale is just a matter of a simple textual search/replace..

If you are interested in trying out a flat-file CMS system, there are several to choose from.  
A good list of available systems is maintained at [https://github.com/ahadb/flat-file-cms](https://github.com/ahadb/flat-file-cms).

Yes, I do acknowledge the fact that it might take a geek and a tinkerer at heart to really love a flatfile publishing platform like this, but I can't go back now - I am definitely having my cake and eating it too! :)

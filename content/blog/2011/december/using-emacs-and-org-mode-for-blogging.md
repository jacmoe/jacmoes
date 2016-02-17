<!--
Title: Using Emacs and org-mode for blogging
Author:
Date: 2011/12/27 03:43:00
Datetime: 2011-12-27
Updated: 2014/01/09 00:14:54
Description: How I use Emacs and Org-Mode for blogging
Template: post
Disqusid: /using-emacs-and-org-mode-for-blogging
ogimage: orgmode/org-mode-blogging.png
thumb: orgmode/org-mode-blogging_custom.png
Keywords: blog, org-mode, emacs, blogging
Tags: blogging, org-mode, emacs
blogpost: true
published: true
 -->
(lightbox:Emacs Org-mode Blogging source:orgmode/org-mode-blogging_mobile.png target:orgmode/org-mode-blogging.png)

I am not really fond of using text-areas in my web browser for authoring blog posts. [Emacs](http://www.gnu.org/software/emacs/) has excellent text editing capabilities, and it has [Org-Mode](http://orgmode.org/) which is perfect for authoring structured text, like blog posts.

There is a lot of functionality in Org-Mode; it can be used for taking notes, managing TODO-lists, time planning, GTD ([Get Things Done](http://en.wikipedia.org/wiki/Getting_Things_Done)) and much more. And, as with all things Emacs, I've only touched on a small part of what it offers.

(clearfix:)

## Markup
The markup is similar to Textile or Markdown:

	* level 1 heading
	some text here
	** level 2 heading
	some text here
	*** level 3 heading
	even more text

What is really nice about Org-Mode is that you can toggle visibility of the text based on the headings. And you can promote or demote them, and move them around while keeping both hierarchy and contained text intact.

<p> You can mark text up as <b>bold</b>, <i>italic</i>, <span style="text-decoration:underline;">underline</span>, <code>code</code> and <del>strike-though</del></p>

	*bold*, /italic/, _underline_, =code= and +strike-though+

And it handles links too:

	[[http://www.google.com][Google]]

This renders as: [Google](http://www.google.com)

## Code
One thing that appeals to me as a programmer blogger is that it's really easy to sprinkle your articles with code. Typing this:

	#+begin_src c++
	  for (int i = 0; i != 10; ++i)
	        std::cout << "hello, world!" << std::endl;
	#+end_src

Will render like this when exported to HTML:

<pre class="src src-c++"><span style="color:#859900;font-weight:bold;">for</span> (<span style="color:#b58900;">int</span> <span style="color:#268bd2;">i</span> = 0; i != 10; ++i)
      <span style="color:#268bd2;">std</span>::cout &lt;&lt; <span style="color:#2aa198;">"hello, world!"</span> &lt;&lt; <span style="color:#268bd2;">std</span>::endl;
</pre>
<br/>
If you want it coloured, then you need the htmlize ELisp package installed.

## Setup and Export
Emacs ships with Org-mode, so you don't have to do anything special to set it up. However, if you want Org-mode to generate coloured code listings when it exports to HTML, you need to get [htmlize.el](http://fly.srk.fer.hr/~hniksic/emacs/htmlize.el.cgi) and put it somewhere in your load path.

This is a section from one of my Emacs configuration files:

	(require 'htmlize)

	(setq org-publish-project-alist
	      '(
	        ("org-jacmoe"
	         ;; Path to org files.
	         :base-directory "~/blog/jacmoe/org/"
	         :base-extension "org"
	         ;; Path to exported files
	         :publishing-directory "~/blog/jacmoe/blogged/"
	         :htmlized-source t
	         :recursive t
	         :publishing-function org-publish-org-to-html
	         :headline-levels 4
	         :html-extension "html"
	         :body-only t ;; Only export section between <body> </body>
	         )
	        ("jacmoe" :components ("org-jacmoe"))
	        ))

First it requires htmlize so that it can be used to color the code listings. Then it proceeds to set up an org-mode project. Of special note is the options `htmlized-source`, `publishing-function` and `body-only`.

`C-c C-e X jacmoe` will export the *"jacmoe"* project to HTML. I can then navigate to the publishing directory, open the exported HTML file, select it all and paste it into the text-area when I create/update a post on my blog.

## Additional Tricks and Resources
If you want to output raw HTML, you can do that:

	#+begin_html
	  <button onclick="alert('It is!');">Org-Mode is great!</button>
	#+end_html

<button onclick="alert('It is!');">Org-Mode is great!</button>
<br/>
You can even execute code, be it Elisp, Python or Perl, but that's another topic entirely.

Haven't touched on tables - Org-mode has excellent support for tables. This includes sorting, calculating fields, and much more. A topic for another blog post.

If you want to learn more about Org-mode, visit the [Org Tutorials](http://orgmode.org/worg/org-tutorials/index.html) web page.

I recommed this YouTube video: [Hack Emacs - An Overview of Org Mode](http://www.youtube.com/watch?v=6W82EdwQhxU&feature=BFa&list=ULVpFK6abGCOg&lf=mfu_in_order) - it's part of a series, so if you're interested in Emacs, do watch the other videos as well. :)

## Conclusion
While I've only touched the surface of Emacs and Org-mode, I think I am definitely going to use it for blogging.

I could've used Markdown - and Emacs' got a mode for that! but one feature that I especially like about Org-mode is the outline-mode which makes it so easy to handle structure.

I use flyspell to check for spelling errors, and generally try to make use of Emacs' excellent text editing capabilities.

A text-area in a web browser simply cannot compete with that. :)

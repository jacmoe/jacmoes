<!--
Title: What You See Is What You Mean
Author:
Date: 2011/08/21 03:43:00
Datetime: 2011-08-21
Updated: 2011/08/21 16:58:00
Description: Finally found an online editor I am satisfied with: Wymeditor - the WYSIWYM editor which leaves your code alone.
Template: post
Disqusid: /what-you-see-is-what-you-mean
ogimage: wysiwym/wysiwym.jpeg
thumb: wysiwym/wysiwym_custom.jpeg
Keywords: editor, wysiwyg, php, jquery, ajax, yii, wymeditor, wysiwym, cms, online
Tags: editing, wysiwyg, jquery, webdev, yii
blogpost: true
published: true
-->
(lightbox:Wymeditor source:wysiwym/wysiwym_mobile.jpeg target:wysiwym/wysiwym.jpeg)

After trying out all kinds of web based editors, both WYSIWYG and markup based - like [TinyMCE](http://www.tinymce.com/) (which I quite like), and [MarkitUp!](http://markitup.jaysalvat.com/home/) (which I am fond of) - I wasn't satisfied..

Either it did too much behind my back, or it did too little. undecided

What I really want is an editor which lets me write visually, but leave my code clean and accessible. Without forcing me to use html-cleaners or learn murky markup languages.

I also want an editor which is very lean on resources and which is easy to extend - (read: hack to suit my needs).

Well, I think I've finally found one - a WYSIWYM editor!

[Wymeditor](http://wymeditor.github.io/wymeditor/), the What You See Is What You Mean web based editor of my dreams.

It writes beautiful clean code, and uses CSS styles instead of inline styles.

(clearfix:)

## Features

- XHTML strict + CSS compliant
- No font or text formatting, sizes or colors WYMeditor is CSS-based
- Designed to be easy to integrate into your application
- No installation needed this is 100% Javascript code no plugin, no extension
- Will remain as simple as possible
- We focus on well-tested code, stability and usability before adding new features
- Image, link, table support
- Skins support via CSS
- Internationalization
- APIs, plugins support
- Free and Open Source, fully adaptable to your needs

If you want to try it in action, then visit the [demo page](http://wymeditor.github.io/wymeditor/dist/examples/)

## Verdict (so far)
(lightbox:A Wymeditor Demo source:wysiwym/wysiwym2_mobile.jpeg target:wysiwym/wysiwym2.jpeg)

It feels very stable, and only writes what code I tell it to write, so I don't have to clean the mess. The only thing which messes it up is my custom smiley-buttons and my jQuery-powered copy and paste image upload to thumbnail dialogue.

I actually managed to figure out how to do this, and it didn't mean installing plugins or hacking the core Wymeditor code - as it's all handled by means of options passed in from the pages where Wymeditor is embedded. That's neat. And it means that I can configure the editor differently depending on context.

(clearfix:)

It also handles my custom code-highlighter automatically - I just need to add a CSS class to the preformat tags - and for that I can just add a class to the 'Classes' box.

I am using Wymeditor with [Yii](http://www.yiiframework.com/) by means of the [EWymeditor](http://www.yiiframework.com/extension/ewymeditor/) extension, slightly modified for my needs - and it works great. More about that in a later post!

It's not perfect, though. Mainly due to the fact that it relies on the 'innerHTML' property, which is quite limiting. I am looking forward to seeing Wymeditor 2.0 - checkout [Wymeditor](https://github.com/wymeditor/wymeditor) on Github if you're interested.

But all in all, I am happy. It's just so much more manageable than TinyMCE or CKEditor or what-they-call'em - so I think I've just found what I'm looking for.

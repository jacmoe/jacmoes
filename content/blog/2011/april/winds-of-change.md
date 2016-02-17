<!--
Title: Winds of Change
Author:
Date: 2011/04/16 03:43:00
Datetime: 2011-04-16
Updated: 2011/04/16 16:58:00
Description: A new year with lots of promises is upon us - actually it's been a new year for a while now, but I only got around to blog about it just now - and a lot of things has changed in the geeky life of me.
Template: post
Disqusid: /winds-of-change
ogimage: windsofchange/northern-lights.jpg
thumb: windsofchange/northern-lights_custom.jpg
Keywords: kde, gnome, ubuntu, visualstudio, windows, linux, kdevelop, aptosid, emacs, debian
blogpost: true
Tags: personal, linux, windows, programming, tools, debian, emacs
published: true
-->
(lightbox:Northern Lights source:windsofchange/northern-lights_mobile.jpg target:windsofchange/northern-lights.jpg)

A new year with lots of promises is upon us - actually it's been a new year for a while now, but I only got around to blog about it just now - and a lot of things has changed in the geeky life of me.Wink
In the following I'll outline the most important changes, namely the move from Windows to Linux as primary OS, from Ubuntu to Debian as Linux of choice, from Gnome to KDE as main desktop environment, from Visual Studio to KDevelop as C++ development environment, from Notepad++ to Emacs.

And, what's probably more interesting to you, I'll try to explain why the change has taken place, and what that means.

(clearfix:)

## From Windows to Linux, Ubuntu to Debian, Gnome to KDE
(lightbox:My Debian Desktop source:windsofchange/debian_desktop_mobile.png target:windsofchange/debian_desktop.png)

Last year, my main operating system was Windows Vista - and when I booted into Linux, it was Ubuntu - and later Linux Mint - with Gnome.
It has always been Gnome for as long as I can remember.

And I've been an Ubuntu user for many years, with a switch to Linux Mint over a year ago. Anyone looking for a nicer Ubuntu, look no further than Linux Mint: it's excellent! Smile

Ubuntu is an easy to use distribution, and has become the most popular distribution since the start in 2004, mainly because it's easy to install/configure/use.

Being an advanced user, however, I think I am ready to move to something closer to the metal, so why not choose Debian, upon which Ubuntu is based?

(clearfix:)

That would put me in charge, rather than rely on the decisions of Canonical (the company behind the Ubuntu initiative).

So, I wanted a distribution based on Debian.

Preferably a rolling distribution so that I don't have to upgrade my distribution every 6 months.

And definitely one which favors KDE over Gnome.

Why KDE instead of Gnome?

Well, there's a lot of reasons why, but one thing is that KDE is better at running Gnome based apps than Gnome is at handling KDE based apps. And because I am programming apps based on CMake and Qt, I probably should choose a desktop based on that tech.

Most distributions (based on Debian) seems to ship Gnome by default - but I was lucky to find [Aptosid](http://de.aptosid.com/index.php).

I installed it, and booted into a Debian which was much leaner and a lot faster than my previous Linux Mint install.

Linux Mint is basically a patched up Ubuntu (with bugs removed).

Granted, Debian is not as easy to use, but I am no Linux newbie, and it suits me fine.

And I don't have to worry about distribution upgrades every six months as Aptosid is a rolling distribution.

What Aptosid offers is a tweaked kernel and some other small fixes to smooth out the potentional pain of running unstable Debian.

So far I really like it!

One thing that I really like is that I can apt-get something like Qt development packages and get Qt 4.7.2, instead of Qt 4.6.2 (which was the latest I could get using Ubuntu) - getting newer packages through apt is really much better than polluting my system by grabbing the source and compiling them myself. So if you like new stuff, like me, you'll be happy using Debian unstable - and if you like some kind of security net while doing so, you'll be happy using Aptosid.

What's interesting to note is that, even if I swithed from Debian testing (Ubuntu) to Debian unstable (Sid / Aptosid), my system is in a much more stable state.

I'll blog more about Aptosid and Debian later, but this is my main OS - I'm only using Windows for games and when I need to do Windows builds of software.

## From Visual Studio to KDevelop
(lightbox:KDevelop in Action source:windsofchange/kdevelop_mobile.png target:windsofchange/kdevelop.png)

I've always been wondering why Visual Studios IntelliSense is so badly implemented, so that it seems to be the standard modus of operandum to install Visual Assist.
It simply doesn't work out of the box.

It eats too many system resources - especially on my low-end system - and really offers very little value for money. In my opinion.

Moving to Linux, I looked around for something which could replace Visual Studio, and while Eclipse and NetBeans are really nice environments, KDevelop really shines. Laughing

It's close enough to Visual Studio, and - out of the box - gives me all that nice colouring and cross referencing and intelligent completions/popups/hints that I just couldn't wrestle out of my copy of Visual Studio.

The only thing I really miss from VS is the excellent debugging tools.

Once I figure out how to actually debug effectively in KDevelop, I'll blog about it.

But the bottom-line is: I really don't miss Visual Studio one bit now.

I've even been toying with the idea of installing KDevelop on Windows, so that I can do my Windows builds in that instead of Visual Studio.

## From Notepad++ to Emacs
(lightbox:Glorious Emacs source:windsofchange/EmacsGlory_mobile.png target:windsofchange/EmacsGlory.png)

Emacs has a - well deserved - reputation for being hard to grok.
And I must admit that I've been avoiding it for many years for that reason.

On my Windows box, I relied on [NotePad++](http://notepad-plus-plus.org/) (and still do) for all my text editing needs, and Gedit or Kate when in Linux.

That changed when I decided to learn Lisp. Smile

There is simply no better environment for Lisp programming than Emacs with Slime - and probably no better introduction to Emacs itself than starting to use it as a Lisp IDE.

Because you need a good reason for starting using it - at least I needed one.

The keyboard shortcuts - which is what Emacs is all about - is simply confusing - there's a ton of them, and they don't follow the universal conventions at all. Mainly because they were born a long time before UIs were standardised, and even before the standard IBM keyboards were invented.

You really need a cheat-sheet! Like this one: [http://rgrjr.com/emacs/ emacs_cheat.html](http://rgrjr.com/emacs/emacs_cheat.html)

You can use the menu - and cheat a bit - but do yourself a favor and learn the basic commands by heart.

Your fingers will love you for it.

After using Emacs for more than 6 months, I am starting to really appreciate the efficiency - my fingers rarely moves from the writing position on the keyboard to use the mouse, and even the arrow keys are avoided when possible.

I love the fact that anything in Emacs can be costumised by means of scripts, Emacs Lisp to be exact.

Emacs is indeed a programmable editor.

I use ECB (Emacs Code Browser) and Cedet, and it turns it into a very powerful programmable programmers IDE.

If you have the patience, give Emacs a try.

If you don't, then check out SlickEdit, or stick to using Gedit/Kate or NotePad++ - and you'll miss out on something great.

I know that VIM exists, and for a lot of people it's their favorite editor. I respect that.

I will most probably blog about Emacs later.

(You've been warned).

## Conclusion
This was a long - and unwieldy - blog post about how things have changed and why I am now using Linux as my primary OS, KDevelop as my main C++ programming environment, Debian instead of Ubuntu, and Emacs.

It's also an attempt at getting back into the blogging saddle, and learn how to write good blog posts.

Happy (belated) New Year, folks.

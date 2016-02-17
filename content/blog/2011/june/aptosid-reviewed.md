<!--
Title: aptosid - reviewed
Author:
Date: 2011/06/03 03:43:00
Datetime: 2011-06-03
Updated: 2011/06/03 16:58:00
Description: A review of aptosid - a distribution based on Debian unstable (Sid). The surprisingly stable unstable Debian distribution. If you like KDE and Debian, and all the latest software and a stable cutting-edge system, then this distribution is for you!
Template: post
Disqusid: /aptosid-reviewed
ogimage: aptosid/aptosid.png
thumb: aptosid/aptosid_custom.png
Keywords: distribution, linux, sid, rolling-release, review, kde, debian, aptosid
Tags: linux, review, debian, kde
blogpost: true
published: true
-->
(lightbox:Aptosid source:aptosid/aptosid_mobile.png target:aptosid/aptosid.png)

[aptosid](http://aptosid.com/index.php) is a distribution based on [Debian Sid](http://www.debian.org/releases/sid/) (unstable), and a very lean distribution as such: It is basically 'vanilla' Debian Sid, but with a custom kernel build and some scripts/patches to ease the potential pains of using the evolutionary unstable Debian branch.

Even though it is based on unstable, it is actually surprisingly stable. Which might seem like a contradiction!

In my experience it is more stable than [Ubuntu](http://www.ubuntu.com/), or even [Linux Mint](http://www.linuxmint.com/).

In this post I'll do a quick review of the distribution, and try to give you a list of reasons why you might want to switch to using aptosid as your new GNU/Linux distribution of choice.

aptosid is made up of 2 words. The first - 'apto' - is a Latin word which means to fit, adapt, adjust, make ready. The second word is 'sid' and is the codename of Debian's unstable branch.
aptosid is always written using all lower-case letters.

## Introduction
Having out-grown Ubuntu and Linux Mint - the polished and deceptively user-friendly GNU/Linux distributions, what should I choose next?

Since they are based on Debian, why not use Debian itself?

Or, maybe something even better?

My list of requirements were:

### Debian based
I've been using Ubuntu - and later Linux Mint - for some years now, and like it.
However, since I consider myself an intermediate Linux user, I want to get as close to the pure Debian as I can get, while still having a cutting edge system.

### KDE focused
Most Debian based GNU/Linux distributions are focused on Gnome. Those that are not, seem to having tacked on KDE as an afterthought.
I'd like a distribution focusing primarily on KDE, because I find that desktop environment more flexible and open than Gnome.
Besides: My favorite IDE is KDevelop and my favorite framework is Qt, so that makes for an obvious choice.
And KDE is far better at running Gnome based apps than the other way around.

### Rolling release
I am used to wiping out my system every 6 months when performing a distribution upgrade - if not sooner because either I or the distribution screwed up the system. I'd rather have a rolling distribution which I don't have to re-install constantly.
And preferably one which doesn't habitually break things, like Linux Mint or Ubuntu.
A rolling distribution also means that I get new packages, upgrades and bug-fixes as soon as they hit the repository - I don't have to wait for it.

### Cutting edge
I want to have the latest versions of (almost) everything!
In the past, that meant that I'd compile source code or grab third-party installers and thus mess up my system.
What if I can get the latest software and still use the Debian package manager?
Easy install and minimal conflicts - cutting edge without cutting myself.
According to [Wikipedia](http://en.wikipedia.org/wiki/Rolling_release), there's really not a lot of choices here:

> Debian based: aptosid (based on Debian's unstable branch, also known as sid); and LMDE (based on Debian testing) and antiX (also based on Debian's testing but with MEPIS). Epidemic Linux

aptosid is the only rolling release distribution (AFAIK) which is based on Debian unstable; the rest are based on Debian testing.. And to top it all off: It doesn't feature a Gnome desktop variant, only KDE (in two flavors: full and lite) and Xfce. Another plus, IMO.

## Features at a glance
(lightbox:Aptosid Installer source:aptosid/installer1-en_mobile.png target:aptosid/installer1-en.png)

### Rolling Release
Unlike most other Linux distributions, aptosid features a true rolling release cycle. It basically means that the system will always stay current and you shouldn't (in theory) ever have to reinstall the system. [Arch Linux](http://en.wikipedia.org/wiki/Arch_Linux) and [Gentoo](http://en.wikipedia.org/wiki/Gentoo_Linux) are two other rolling release distributions, but they are not based on Debian.

Due to the nature of Debian Sid, you never upgrade, you dist-upgrade. As often as once a week (even daily), and at least each month. The Debian Sid repository is updated as often as 4 (four) times a day!

When performing a dist-upgrade using the Debian Sid and aptosid repositories, you need to carefully examine the output from apt, and visit the aptosid forum to learn about potential upgrade issues. Because sometimes something breaks, and it takes a while for things to settle. Often a very short while, but also longer - like a system-wide Python/Perl/KDE transition. In these cases, you simply have to either 'hold' a package or two, or just wait until it's OK again.

### Custom Kernel
Debian Sid 'ships with' a somewhat conservatively put together Linux kernel, which is why aptosid carry it's own custom kernel with excellent support for all the newest hardware.

The kernel is aptosid optimised to help offset issues, add new functionality, or configured for faster performance and better stability and tweaked from latest kernel from [http://www.kernel.org/](http://www.kernel.org/).
Combined with a set of tools and scripts - like building and setting up my nVidia graphics card driver whenever the kernel is updated (which is quite a lot) - it makes for a really smooth running system.

### KDE Focused
aptosid offers KDE in two variants: full and lite. In addition, you can choose a Xfce based distribution. The Gnome desktop environment is not supported (directly).

Since most Debian based distributions focus on Gnome, that is refreshingly different.

### Installer and Live-CD
Debian doesn't have either an installer or a live-CD for Sid (because it doesn't get released, of course). The aptosid team has put together a live-CD with an installer which - as you can see from the image above - features a simple tab-based interface.

The installation went smoothly.

It takes roughly 5 minutes to install the KDE-lite, and maybe 15 minutes to install KDE-full, if I remember it correctly. On a moderate machine configuration. That's slick.

All in all a really quick and effective way of installing Debian Sid.

And due to aptosid being a rolling release distribution, you only need to use the installer one single time:
`> "Install once, upgrade anytime"`.

###Just the right amount of Hand-Holding
As an aptosid user you are supposed to be comfortable with using the terminal. You are expected to be able to recover from the occasional system glitch.

If you do not know how, you can learn how.

Luckily, the [excellent aptosid manual](http://manual.aptosid.com/en/welcome-en.htm) is very direct and informative, actually really useful - which is a welcome surprise. I like that you are not talked down to, or that things are not hidden from you. It's very honest, and actually much more helpful than simplified walk-throughs which tells you how to do things, but doesn't mention why you should do it (or the various different ways of doing so).

> "Give a man a fish; you have fed him for today. Teach a man to fish; and you have fed him for a lifetime.."

If the manual is not enough, you have the friendly aptosid community at their [forum](http://aptosid.com/index.php?name=PNphpBB2), and they hang out on IRC too.

## Pros
(lightbox:Aptosid Forum source:aptosid/aptosid_forum_mobile.png target:aptosid/aptosid_forum.png)

### Stability
WIFI was really easy to get up and running, and I really love the way that my nVidia graphics card (and it's driver) keeps functioning - even after one kernel upgrade after the other! In Ubuntu/Mint that usually meant - in the best case scenario - that I had to enable the driver again after reconfiguring my x-config, or it just died. Now, not even the screen resolution is changed, no hardware accelleration is lost, it just works!

Really fast boot and shutdown times. And is capable of handling all the latest hardware.

Even after I don't know how many dist-upgrades (new kernels, drivers, etc), my system is running like a well-oiled machine. Really responsive.

Maybe it's got to do with the fact that it's using the newest software? Or perhaps that bugs are fixed and improvements made on a daily basis?

### Freshness
So, how much on the edge are you as a user?

Let this small list of select software and their version numbers speak:

- Mercurial 1.8.3
- GCC 4.6.0
- svn 1.6.17
- cmake 2.8.4
- Qt Framework 4.7.3
- ogre3d 1.7.1
- Boost 1.46.1
- Blender 2.57.2
- Cg Toolkit 2.10017
- nvidia 270.41.19
- KDE 4.6.3

And for completeness, my LAMP-stack:

- Linux kernel 2.6.39-0.slh.10-aptosid-amd64
- Apache 2.2.19
- MySQL 5.1.57
- PHP 5.3.6-11
- phpMyAdmin 3.4.1

As you can see, it's sparklingly new - and coming from the official repositories. That's difficult to beat.

### On the edge, but with a life-line
It's always nice to have access to all the newest, cutting-edge stuff - without resorting to compiling and installing software from source or third-party repositories (and thus messing up your system) - but it's also nice to have a stable system.

Amazingly, the aptosid team manages to make Debian Sid as stable as possible. Not an easy job.

Thanks to them, by means of patched packages from their own repository, upgrade warnings in their forum and sound advice from their documentation, you have have your cake and eat it too: the most up-to-date distribution you can have, by means of the tried and tested apt package system and the overall high-quality Debian system, through Sid, the unstable branch where things happen!

And add to that a friendly community.

## Cons
It's hard to put your finger on anything specific to aptosid, but it is unstable. You pay a price for all that new-ness, but - as I mentioned earlier - it is a surprisingly smooth experience.

If you don't know much about Linux, then aptosid is definitely out of your reach. That doesn't mean that you can't use it - you just need to have access to an experienced Linux geek when things break.

I experienced some upgrade issues where I couldn't install my favorite image app: [The Gimp](http://www.gimp.org/) because of unmet dependencies - Python was undergoing a major upgrade - so I just had to wait until that transition was over. I ended up installing [Krita](http://www.koffice.org/krita/) instead, which I now quite like now - really awesome drawing program! I managed to install The Gimp a week later.

Now, one thing that I lost during the transition from KDE 4.5 to 4.6 is my beloved KDevelop.. I hope I don't have to wait weeks for that, but then I can use [NetBeans](http://netbeans.org/) instead. It's a great IDE, but [KDevelop](http://www.kdevelop.org/) is better. I know that I should have put it on hold, but then I would miss the major move to the latest KDE. You simply have to choose sometimes.. So I let the old version go - and wait for the new one.

After the initial install, I had to perform some tweaking of my system, like turning off ipv6 in my network settings because my web connection was unbearably slow and unresponsive. Fortunately, that turned out to be pretty painless - once I figured out what the issue was. (Actually, that 'feature' is present in Debian Stable as well) Ceni, the aptosid-made network configuration tool really shined as it trivially set up my usb wireless network adapter (after I apt-getted some firmware packages).

Another thing that puzzled me for a long while was that I was unable to get administrator rights in KDE. I installed kdesudo, but that didn't work.. It refused to let me enter my root password in System Settings.. That issue was present in KDE 4.5, but also in 4.6.3. Luckily - or rather: naturally - I found the answer in the aptosid forum. I just needed to install polkit-kde-1, and then it worked.

One thing that might put people off - for strange reasons - is that aptosid doesn't come bundled with graphical package managers. You are encouraged to use the command-line (apt), and you should actually shut down your window manager and go to runlevel 3 before installing anything. The reason for that is that tools like Synaptic is not built to handle the Sid repository (package dependencies mostly). However, Synaptic is just an apt-get away. So I don't really get the issue.

The cons has more to do with Debian Sid itself:

Debian Sid is named after the [Sid Phillips](http://en.wikipedia.org/wiki/Sid_Phillips) character in [Toy Story](http://en.wikipedia.org/wiki/Toy_Story) - who destructively experiments with his sister Hannah’s toys.
You have been warned!

Sometimes you have to wait until Sid is ready, occasionally things break - but the aptosid team does do a good job of beating Sid into submission. Or sweet-talking it, whatever they do, it works.

## Conclusion - Why Aptosid rocks
(lightbox:Doing a dist-upgrade source:aptosid/dist_upgrade_mobile.png target:aptosid/dist_upgrade.png)

As the name suggests, aptosid really does a great job of making Debian Sid ready to be used.

If you know your way around Linux, and want to have the best of Debian Sid, without (most of) the pain, you can't go wrong with choosing aptosid.

It is a very thin layer on top of 'vanilla' Debian unstable, but what a difference that layer makes!

I really like being able to just install things like the very latest edition of Blender, through the Debian package manager (apt). I hate waiting for the good stuff - I want it now.

Oh, and did I mention the best part? ->

Install once - dist-upgrade forever
While I could have chosen Arch Linux or Gentoo, I don't want to. I really like Debian! It's having the largest repository of all GNU/Linux distributions, so why not? Arch Linux and Gentoo, while neat, doesn't feature that. And they require you to use non-standard package formats - .deb is a universal format, even more widespread than rpm. And I also like that Debian and aptosid is not tied to a commercial entity, but is following a sane philosophy.

One thing that I espcially like is how aptly aptosid handles my firmware (WIFI) and my graphics card nVidia (proprietary) driver. That alone is a good reason for going aptosid.

If you want a system more stable and more current than Ubuntu and Mint, and like Debian and KDE, it's difficult not to choose aptosid. It simply rocks!

But don't take my word for it - go visit [aptosid.com](http://aptosid.com/) and experience it for yourself.

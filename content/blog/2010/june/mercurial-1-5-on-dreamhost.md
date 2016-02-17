<!--
Title: Mercurial 1.5 on Dreamhost
Author:
Date: 2010/06/10 03:43:00
Datetime: 2010-06-10
Updated: 2010/06/10 16:58:00
Description: This is a mini-guide to install Mercurial locally in your home directory. Useful if you're on a shared host without root access.
Template: post
Disqusid: /mercurial-1-5-on-dreamhost
thumb: dream-mercurial/hipstercat_custom.jpg
ogimage: dream-mercurial/hipstercat.jpg
Keywords: mercurial, dreamhost
Tags: mercurial, webdev, dreamhost, programming
blogpost: true
published: true
-->
(inimage:I am too cool fer ma fur source:dream-mercurial/hipstercat.jpg)

This is a mini-guide to install Mercurial locally in your home directory. Useful if you're on a shared host without root access.
(clearfix:)

## Step One

    $ mkdir -p ~/.packages/src
    $ cd ~/.packages/src
    $ wget http://www.selenic.com/mercurial/release/mercurial-1.5.tar.gz
    $ tar xvzf mercurial-1.5.tar.gz
    $ cd mercurial-1.5
    $ python setup.py install --home=~/.packages/

## Step Two
Put these two lines in your .bashrc and .bash_profile files:

    export PYTHONPATH=${HOME}/.packages/lib/python
    export PATH=${HOME}/.packages/bin:$PATH
    Step Three
    $ . ~/.bash_profile
    $ . ~/.bash_src
    $ hg version

If you were successful you should get a copyright notice and a version displayed. That's it.

<!--
Title: Composer create project script
Author: Jacob Moen
Date: 2016/01/10 20:02
Datetime: 2016-01-10
Description: A handy bash script to make the process of testing a 'composer create-project' command easier by operating against your local working copy.
Template: post
Disqusid: /composer-create-project-script
ogimage: composer-project/composer-project.jpg
thumb: composer-project/composer-project_custom.jpg
Keywords: composer, yii, php, project
Tags: composer, yii
blogpost: true
published: true
-->
(lightbox:Composer project create script source:composer-project/composer-project_mobile.jpg target:composer-project/composer-project.jpg)
**Disclaimer:** I did not write this script myself, but it has proven to be immensely useful to me when developing my own [Yii](http://www.yiiframework.com/) project templates.

Some time ago, I stumbled over (*read: Googled for*) a Github gist that allowed me to easily work against my in progress [Composer](https://getcomposer.org/) project template locally.  

You simply drop the script at the root of your Composer project, and then you call it whenever you need to create a project.
(clearfix:)

## Installation
Grab the script [here](https://gist.github.com/jacmoe/e9e8ed5fd45affb893a8)  
Save it at the root of your Composer project, and make it executable.

## Configuration
To be able to use the script, it would be a good idea to change the default arguments to the script (at line 16):

```bash
BRANCH_NAME=${1:-master}
DEST_DIR=${2:-~/Desktop/newapp}
PACKAGE_NAME=vendor/package
```
`BRANCH_NAME` can be left as-is.  
`DEST_DIR` will be where your project is created.  
`PACKAGE_NAME` - this one is important. You need to set that to your Composer project package name. In my case I've set that to `jacmoe/yii2-app-basic-zurbified` as specified in my Composer project configuration (*composer.json*).

## How it works
Develop your project template as you usually do, and run the script whenever you need to test project generation.

**Important**: the script will only use changes that you have committed to the repository - so if you have local, uncommitted changes, make sure that you commit them before running the script.

The script will delete any existing directory upon request.

## Notes
One of the nice features of Yii is that you can easily create projects using Composer.

Yii ships with two application templates - basic and advanced - but you can create your own project templates.

And by using this handy script, you can even do that easily!

## Credits
Thanks and kudos to Brian [*'bporter'*](https://github.com/beporter) Porter for having created that script in the first place.

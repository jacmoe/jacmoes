<!--
Title: Arrgh
Author:
Date: 2010/12/20 03:43:00
Datetime: 2010-12-20
Updated: 2010/12/20 16:58:00
Description: Winterly reminder that it's better to be safe than sorry in programming: automatic dual configuration in Yii.
Template: post
Disqusid: /arrgh
ogimage: arrgh/winter.jpg
thumb: arrgh/winter_custom.jpg
Keywords: php, yii, email, configuration, localhost, remote
Tags: yii, php, programming, wtf
blogpost: true
published: true
-->
(lightbox:Winter in Dragerup source:arrgh/winter_mobile.jpg target:arrgh/winter.jpg)

A week ago I spent two hours (maybe even three!) implementing email notification of comments.

It didn't take long to hook up the Yii Mail extension and maybe an hour to figure out the logic behind the task, but no matter what I did, it refused to send emails.

For longer than I would admit openly I used the log, the php die command, echo and print - nothing..

I felt more and more incompetent, and nearly gave up on it, when suddenly one line in my configuration caught my eye.

The line said:

    'dryrun' => true,

(clearfix:)

You can imagine my embarrasment when I realised that I've set the email extension in do-not-actually-send-any-emails mode, because I don't have any email server at my Windows box.. No wonder it didn't send any emails!

D'oh! I totally forgot to turn in on when I uploaded it to the remote server.

I refuse to make the same mistake again!

So here's what I did:

## Index.php
    <?php
    $hostname = $_SERVER['SERVER_NAME'];
    switch ( strtolower($hostname))
    {
    case 'localhost':
    case '127.0.0.1':
        $yii=dirname(__FILE__).'/../../yii/framework/yii.php';
        $config=dirname(__FILE__).'/protected/config/local.php';
        defined('YII_DEBUG') or define('YII_DEBUG',false);
        defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',1);
        break;
    default:
        $yii=dirname(__FILE__).'/yii/framework/yii.php';
        $config=dirname(__FILE__).'/protected/config/main.php';
        break;
    }

    require_once($yii);

    Yii::createWebApplication($config);

    Yii::app()->run();

What that does is basically choosing local.php in protected/config when I am on my local host, and main.php when on the production server.

That's pretty neat.

## local.php
    <?php

    return CMap::mergeArray(
        require(dirname(__FILE__) . '/main.php'),
        array(
            'modules' => array(
                'gii' => array(
                    'class' => 'system.gii.GiiModule',
                    'password' => '<not_telling_anyone>',
                ),
            ),
            // application components
            'components' => array(
                'db' => array(
                    'connectionString' => 'mysql:host=localhost;dbname=blog',
                    'emulatePrepare' => true,
                    'username' => '<not_telling>',
                    'tablePrefix' => 'blog_',
                    'password' => '<a_secret>',
                    'charset' => 'utf8',
                ),
                'mail' => array(
    	            'class' => 'ext.yii-mail.YiiMail',
    	            'transportType' => 'php',
    	            'viewPath' => 'application.views.mail',
    	            'dryRun' => true,
    	        ),
            ),
        )
    );

It simply grabs the array from main.php and merges it with local settings before returning it.

So now 'dryRun' is false on the remote server and true on my local host.

Just like it should be. Lesson learned.

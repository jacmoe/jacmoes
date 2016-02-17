<!--
Title: Deploying Yii with Deployer
Author: Jacob Moen
Date: 2016/01/22 01:02
Datetime: 2016-01-22
Description: How to integrate Deployer with your Yii project
Template: post
Disqusid: /2016/january/deploying-yii-with-deployer
ogimage: deployer/deployer.png
thumb: deployer/deployer_custom.png
Keywords: deployer, yii, php, deployment
Tags: yii, php, deploy
blogpost: true
published: true
-->
(lightbox:Deployer source:deployer/deployer_mobile.png target:deployer/deployer.png)
[Deployer](http://deployer.org/) is a deployment tool for PHP, and since it features recipes for [Yii](http://www.yiiframework.com/), I have created a Composer project template called [yii-2-app-basic-deployer](https://packagist.org/packages/jacmoe/yii2-app-basic-deployer).

Deployer allows us to create deployment scripts by using modular blocks of code, called *recipes*.

It features rollbacks and atomic deploys, and in the following I will show you how to integrate Deployer with your Yii application.

(clearfix:)
## Intended audience
If you are already messing around with ssh, Composer and Git on your remote server, but would like a more refined and automated work flow for deployment, this article is for you.

## Requirements
Basically, if you are running Yii 2, then you can also run Deployer (PHP 5.4.0 and up.)

You need ssh access to your server, Git and Composer, and the ability to set the web root.

## Preparation

### Locally
#### Deployer
While you can install Deployer with Composer, I find it easier to just grab the phar.

Download [deployer.phar](http://deployer.org/deployer.phar) and put it somewhere accessible:
~~~
mv deployer.phar /usr/local/bin/dep
chmod +x /usr/local/bin/dep
~~~
See [Deployer - Installation](http://deployer.org/docs/installation) for available options.

#### Openssh
<del>If you want to deploy locally, you need to install `openssh-server`.  
It allows you to ssh to your own machine</del>
<del>You might not need to do that, if you don't plan on performing local deploy.</del>

**Update** : as it turns out, specifying a `local` key for the server in the `servers.yml` will make the `serverList` function create a local server, so *openssh-server* is no longer needed for local deployment. (*project template updated*)

### Remotely
You need to set the web root of your site to use `current/web`:
~~~
/home/yourname/yoursite.com/current/web
~~~

Make sure that the web server that you are using is configured to allow symlinks / allow overrides because Deployer relies on serving the site from a symbolic link (`current`).  
The app template ships with a *.htaccess* that turns on allow symlinks for Apache.

Also, make sure that you create a database for your site, even if you haven't created any migrations yet.

The script that I wrote could probably be rewritten to work without a db connection, but I will leave that as an exercise for others.

## How Deployer works
Deployer makes use of three directories on the server:

* **releases** - contains a number of releases (by default 3).
* **current** - symlink to latest release.
* **shared** - this directory contains files/dirs that are shared between releases.

When the deploy script is run, a new release is created on the server. When the deployment has been completed successfully, the symlink `current` is updated to point to the latest release.  
The shared files/folders are symlinks in each release directory - currently, what is shared is the *runtime* directory and the *config/db.php*.

If the deployment process crashes midway, the symlink is not updated and the site not broken, which is neat.

## The script
If you want to look at the code while reading this article, create an instance of the [yii-2-app-basic-deployer](https://packagist.org/packages/jacmoe/yii2-app-basic-deployer) project:
~~~
composer create-project --prefer-dist --stability=dev jacmoe/yii2-app-basic-deployer basic
~~~

### Recipes
With Deployer, we create our deploy script using modular blocks of code called *'recipes'*.

Deployer ships with recipes for common frameworks: [deployer/tree/master/recipe](https://github.com/deployphp/deployer/tree/master/recipe)  
In addition, there is a repository for third-party recipes here: [https://github.com/deployphp/recipes](https://github.com/deployphp/recipes)

When using Deployer in '*phar*' form, we need to grab the recipes ourselves, as they are not included in the archive.

### Yii2 app basic recipe
The `deploy.php` script is using the `Yii2 app basic` recipe, so let's take a look at that first:

~~~
/* (c) Alexey Rogachev <arogachev90@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

require_once __DIR__ . '/common.php';

/**
 * Yii 2 Basic Project Template configuration
 */

// Yii 2 Basic Project Template shared dirs
set('shared_dirs', ['runtime']);

/**
 * Run migrations
 */
task('deploy:run_migrations', function () {
    run('php {{release_path}}/yii migrate up --interactive=0');
})->desc('Run migrations');

/**
 * Main task
 */
task('deploy', [
    'deploy:prepare',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:vendors',
    'deploy:run_migrations',
    'deploy:symlink',
    'cleanup',
])->desc('Deploy your project');

after('deploy', 'success');
~~~
It is based on the *'common'* recipe, and there are only two additions to the common recipe:

`runtime` directory is added to shared directories:
~~~
// Yii 2 Basic Project Template shared dirs
set('shared_dirs', ['runtime']);
~~~
This directory is symlinked into each release and that means that logs and cache and other runtime data is kept between releases.

Next, a `run_migrations` task is defined:
~~~
/**
 * Run migrations
 */
task('deploy:run_migrations', function () {
    run('php {{release_path}}/yii migrate up --interactive=0');
})->desc('Run migrations');
~~~
And added to the main task.

And that is really, almost all that needs to be done, for a Yii 2 project based on the basic app template.

And that script is shipped with Deployer, so up until now, we did not write a single line of code.

### Deploy script
This is the main script, `deploy.php`:
~~~
require_once __DIR__ . '/deployer/recipe/yii-configure.php';
require_once __DIR__ . '/deployer/recipe/yii2-app-basic.php';

if (!file_exists (__DIR__ . '/deployer/stage/servers.yml')) {
  die('Please create "' . __DIR__ . '/deployer/stage/servers.yml" before continuing.' . "\n");
}
serverList(__DIR__ . '/deployer/stage/servers.yml');

set('repository', '{{repository}}');

set('keep_releases', 2);

set('shared_files', [
    'config/db.php'
]);

task('deploy:configure_composer', function () {
  $stage = env('app.stage');
  if($stage == 'dev') {
    env('composer_options', 'install --verbose --no-progress --no-interaction');
  }
})->desc('Configure composer');

after('deploy:shared', 'deploy:configure');
before('deploy:vendors', 'deploy:configure_composer');
~~~
Notice how small it is?

Let's walk through the script, step by step.

First, we require two recipes:
~~~
require_once __DIR__ . '/deployer/recipe/yii-configure.php';
require_once __DIR__ . '/deployer/recipe/yii2-app-basic.php';
~~~
A *configure* recipe and the *yii2-app-basic* recipe.

The next part of the script first checks if there is a `servers.yml` configuration file present. And if it is there, the script then loads a list of server configurations from it.  
And if not, the script dies.
~~~
if (!file_exists (__DIR__ . '/deployer/stage/servers.yml')) {
  die('Please create "' . __DIR__ . '/deployer/stage/servers.yml" before continuing.' . "\n");
}
serverList(__DIR__ . '/deployer/stage/servers.yml');
~~~

The next couple of lines sets some variables:
~~~
set('repository', '{{repository}}');

set('keep_releases', 2);

set('shared_files', [
    'config/db.php'
]);
~~~

Since the '*common*' `deploy:vendor` task configures Composer for production mode, a custom task is defined to configure the Composer command line differently if the `app.stage` variable is set to '*dev*':
~~~
task('deploy:configure_composer', function () {
  $stage = env('app.stage');
  if($stage == 'dev') {
    env('composer_options', 'install --verbose --no-progress --no-interaction');
  }
})->desc('Configure composer');
~~~
Essentially, the `--no-dev` option is removed so that we install the '*dev*' dependencies for our application.

The last bit of the main deploy script adds two tasks to the main '*deploy*' task:
~~~
after('deploy:shared', 'deploy:configure');
before('deploy:vendors', 'deploy:configure_composer');
~~~
The first task is defined in a custom recipe, and is used to render the templates in the `deployer/shared` directory using the configuration values in our server list.  
It transforms `db.php.tpl` to `db.php` and `yii.tpl` to `yii`.

Take a look at `yii-configure.php` in `deployer/recipe` for the details.

For completeness, here is what `db.php.tpl` looks like:
~~~
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host={{app.mysql.host}};dbname={{app.mysql.dbname}}',
    'username' => '{{app.mysql.username}}',
    'password' => '{{app.mysql.password}}',
    'charset' => 'utf8',
];
~~~
See the `servers.yml` below for reference.

The second task is our custom task for configuring Composer.

And that is the complete script! :)

Well, apart from the configuration file, which is up next.

### Servers.yml
The deploy script loads configuration values from `deployer/stage/servers.yml`:
```yaml
# list servers
# -------------
prod_1:
    host: www.myhost.com
    user: myusername
    password: mypassword
    stage: production
    repository: https://github.com/myname/myrepo.git
    deploy_path: /home/myusername/myhost.com
    app:
        debug: false
        stage: prod

        mysql:
            host: mysql.myhost.com
            username: my_dbuser
            password: db_password
            dbname: myhost_db

dev_1:
    host: localhost
    user: myusername
    password: mypassword
    stage: local
    repository: https://github.com/myname/myrepo.git
    deploy_path: /var/www/mysite
    app:
        debug: true
        stage: dev

        mysql:
            host: localhost
            username: root
            password: ""
            dbname: mysite
```
While you can configure servers directly in code, Deployer allows you to load the server configuration from a YAML file.  
Because I don't want my Github repository to contain passwords and other sensitive information, a YAML file added to .gitignore is a good alternative to defining the servers in the main script.

## Deployment
(lightbox:Deploying source:deployer/deploying_mobile.png target:deployer/deploying.png align:right)

In order to deploy our project, we need to create `servers.yml` in `deployer/stage`.

Copy the contents of `stage/servers-sample.yml` as a template to get you started.

Once that is done, we can finally deploy our project using the following command:
~~~
dep deploy production
~~~

If we want to see more of what the deploy script is doing, we can pass it the `v` option:
~~~
dep deploy production -v
~~~
If you want even more, add `-vv` - and for everything, add `-vvv`

If something goes wrong, we can roll back:
~~~
dep rollback production
~~~

We can also deploy locally, provided that one of the servers in the server list has the `local` flag set (*see above*):
~~~
dep deploy local
~~~

Check the [Deployer docs](http://deployer.org/docs) if you want to learn more.

(clearfix:)

## Additional tricks
### Building assets locally
If you, like me, have a asset tool chain based on Node.js - in my case Gulp - you can avoid having to install that on the remote server, and instead run the tool locally, like this:
~~~
task('deploy:build_assets', function () {
   runLocally('gulp build');
   upload(__DIR__ . '/web/css', '{{release_path}}/web/css');
   upload(__DIR__ . '/web/js', '{{release_path}}/web/js');
   upload(__DIR__ . '/web/fonts', '{{release_path}}/web/fonts');
})->desc('Build assets');
~~~
And then, instruct Deployer to run this task after the migrations:
~~~
after('deploy:run_migrations', 'deploy:build_assets');
~~~

### Utility tasks
With Deployer we can create our own independent tasks:
~~~
task('clear_cache', function () {
    run('php {{release_path}}/yii cache/flush-all');
})->desc('Clear the Yii cache');
~~~
Now, we can sit at home and easily clear the cache on our server:
~~~
dep clear_cache production
~~~

## Caveats
Deployer does not currently support rollback of migrations.  
It is planned for Deployer v4 - see [Issue #475](https://github.com/deployphp/deployer/issues/475)  
In the meantime this needs to be handled manually.

Perhaps one could add a task before the migration task that performs a db dumb that can then be restored.  
Not sure if this can be done properly in Deployer v3 without rollback closures. Worth investigating...

## Notes
While the `common` recipe uses Git and Composer, you can avoid those dependencies by not using the associated tasks.

There is a recipe for using rsync in the community recipe repository, as an alternative to using Git.

Deployer is quite flexible.

## Do you want more?
For more advanced options - and more complexity - you can look into [Rocketeer](http://rocketeer.autopergamene.eu/#/docs/rocketeer/README).  
[Phing](http://www.phing.info/) is also an option..

Personally, though, I like the simplicity of Deployer.

## Postscript
Since I wrote this article, I developed an advanced app template with Deployer support, where the standard `init` script has been replaced by a configure recipe. Check it out: [yii2-app-advanced-deployer](https://packagist.org/packages/jacmoe/yii2-app-advanced-deployer)

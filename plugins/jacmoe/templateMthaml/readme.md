# templateMthaml #

A [PhileCMS](https://github.com/PhileCMS/Phile) plugin that provides a [Mthaml](https://github.com/arnaud-lb/MtHaml)  (Multi target HAML) template parser.

What is MtHaml?
> MtHaml is a PHP implementation of the HAML language which can target multiple languages.
>   
> Currently supported targets are PHP and Twig, and new ones can be added easily.

This plugin uses the Twig target and allows us to write our template in HAML with Twig tags (instead of Ruby tags)


## Installation ##

### With composer ###

```
composer require jacmoe/template-mthaml
```

### Download ###

* Install [Phile](https://github.com/PhileCMS/Phile)
* Clone this repo into plugins/jacmoe/templateMthaml

## Activation ##

After you have installed the plugin. You need to add the following line to your config.php file:
```php
$config['plugins']['jacmoe\\templateMthaml'] = array('active' => true);
```
You need to turn off the default template Phile parser:
```php
$config['plugins']['phile\\templateTwig'] = array('active' => false);
```

## How to use the plugin ##
Once installed, this plugin now renders any haml files in your theme directory.

### Template extension ###
You can change the default template extension (.haml) in the plugin configuration, but then you need to insert the following code at the start of each of your template files:
```haml
{% haml %}
```
You don't need that tag when your are using .haml files.

### Example template ###
There is an example index.haml file in the `[plugin]/example` directory.

### Usage examples ###
```haml
%ul#users
  - for user in users
    %li.user
      = user.name
      Email: #{user.email}
      %a(href=user.url) Home page
```
Rendered:
```
<ul id="users">
  {% for user in users %}
    <li class="user">
      {{ user.name }}
      Email: {{ user.email }}
      <a href="{{ user.url }}">Home page</a>
    </li>
  {% endfor %}
</ul>
```
Here is the example template:
```haml
!!!
%html
  %head
    %meta(charset="#{ config.charset }")
    %base(href="#{ base_url }")
    %title
      - if meta.title
        = meta.title
      = site_title
    - if meta.description
      %meta(name="description" content="#{ meta.description }")
    - if meta.robots
      %meta(name="robots" content="#{ meta.robots }")
    %meta(property="og:type" content="article")
    %meta(property="og:title" content="#{ current_page.title } | #{ site_title }")
    %meta(property="og:description" content="#{ meta.description }")
    %meta(property="og:url" content="#{ current_page.url }")
    %meta(property="og:site_name" content="#{ site_title }")
    %link(rel="stylesheet" href="#{ theme_url }/css/style.css")
    %link(rel="stylesheet" href="#{ theme_url }/css/tomorrow-night.css")
  %body
    %header#header
      .inner.clearfix
        %h1
          %a(href="#{ base_url }") = site_title
        %ul.nav
          - for page in pages
            %li
              %a(href="#{ page.url }") = page.title
    %section#content
      .inner
        = content
    %footer#footer
      .inner
        %a(href="https://github.com/PhileCMS/Phile") Phile
        was made by
        %a(href="https://github.com/PhileCMS") The PhileCMS Community
    %script(src="#{ theme_url }/js/highlight.js")
    :javascript
      hljs.initHighlightingOnLoad();

```
Cleaner than regular twig templates, eh?

### Tricks ###
While the main template files have to be in MtHaml (.haml) you can include your *'old'* .html partial templates, like this:
```
- include 'header.html'
```
Any Twig markup is processed by the engine, and that means that you can incrementally upgrade your theme to be using MtHaml.

If you want a full-fledged example, then check out the haml template files here: [Jacmoes Cyber Soapbox Mercurial Repository](https://bitbucket.org/jacmoe/jacmoes/src/2cf54903dbc1/themes/spirits/?at=default)

## Resources ##
* [An Introduction to HAML - Sitepoint](http://www.sitepoint.com/an-introduction-to-haml/)
* [Mthaml page on Packagist](https://packagist.org/packages/mthaml/mthaml)

<?php

/**
 * Set configuration of your phile installation.
 *
 * You can also overwrite Phile-defaults here.
 */
$config = [];

$config['site_title'] = 'Jacmoes Cyber SoapBox'; // Site title
//$config['theme'] = 'leanfoundation'; // Set the theme
$config['theme'] = 'spirits'; // Set the theme

$config['date_format'] = 'F jS, Y'; // Set the PHP date format

$config['pages_order_by'] = 'meta.date'; // Order pages by "alpha" or "date"
$config['pages_order'] = 'meta.date:desc'; // Order pages "asc" or "desc"

$config['variables'] = array(
  'site_title' => $config['site_title'],
  'base_url' => \Phile\Utility::getBaseUrl(),
  );

$config['encryptionKey'] ='7/(EX=W!vXWDP3(p6i(YQjvPBFD2Rk59}sGWy|r68gAmZrxk?x96Gz}t|k0CbvzT';

$config['plugins'] = [
    'infostreams\\snippets'             => array('active' => true),
    'jacmoe\\latestPost'                => array('active' => true),
    'jacmoe\\autoGallery'               => array('active' => true),
    'jacmoe\\templateMthaml'            => array('active' => true),
    'stijnFlipper\\philePaginator'      => array('active' => true),
    'pschmitt\\tags'                    => array('active' => true),
    'phile\\xmlsitemap'                 => array('active' => true),
    'jacmoe\\rssFeed'                    => array('active' => true),
    'phile\\phpFastCache'               => array('active' => false),
    'phile\\templateTwig'               => array('active' => false),
];

$config['plugins']['phile\\rssFeed']['post_key']= 'blogpost';

$config['plugins']['jacmoe\\latestPost']['filters'] = array(
  'main' => function($page) {
      $template = $page->getMeta()->get('template');
      $published = $page->getMeta()->get('published');
      if ($published != 'false') {
          return ('post' === $template);
      }
  },
);

$config['plugins']['stijnFlipper\\philePaginator']['first_page']= 1;
$config['plugins']['stijnFlipper\\philePaginator']['posts_per_page']= 3;
$config['plugins']['stijnFlipper\\philePaginator']['paginators'] = array(
  'blog' => function($page) {
      $template = $page->getMeta()->get('template');
      $published = $page->getMeta()->get('published');
      return (strpos($page->getUrl(), 'blog') !== false && ('post' === $template) && ('true' === $published));
  },
);

$config['plugins']['infostreams\\snippets']['snippets'] = array(
  'clearfix' => function($text=null) {
    return "<div class=\"clearfix\"></div>";
  },
  'icondiv' => function($icon, $clear=false) {
    if($clear)
    {
      return "<div class=\"ui horizontal clearing divider\"><i class=\"fi-".$icon."\"></i></div>";
    }
    return "<div class=\"ui horizontal divider\"><i class=\"fi-".$icon."\"></i></div>";
  },
  'inimage' => function($title, $source, $align ="left", $width=320, $height=240, $size="large") {
    return "<img src=\"".\Phile\Utility::getBaseUrl()."/content/images/".$source."\" alt=\"".$title."\" title=\"".$title."\" class=\"th gallery ".$size." ".$align."\">";
  },
  'lightbox' => function($title, $source, $target, $align ="left", $width=320, $height=240, $size="large") {
    return "<a href=\"".\Phile\Utility::getBaseUrl()."/content/images/".$target."\" data-lightbox=\"".$target."\" title=\"".$title."\" class=\"sb\"><img src=\"".\Phile\Utility::getBaseUrl()."/content/images/".$source."\" alt=\"".$title."\" title=\"".$title."\" class=\"gallery th ".$size." ".$align." floated image\"></a>";
  },
);

return $config;

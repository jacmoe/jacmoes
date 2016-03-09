<?php
$meta_description = (($view->params['description']) ? $view->params['description'] : 'Default description');
$meta_keywords = (($view->params['keywords']) ? $view->params['keywords'] : 'default, keywords');
$meta_og_image = (($view->params['ogimage']) ? Url::home(true).'images/'.$view->params['ogimage'] : Url::home(true)."/siteimage.png");
$meta_url = Url::to($view->params['url'], true);

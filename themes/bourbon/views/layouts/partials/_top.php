<?php
use yii\helpers\Html;
use yii\helpers\Url;
use jacmoe\mdpages\components\Nav;
use yii\widgets\Breadcrumbs;
use app\components\Pype;
use jacmoe\mdpages\helpers\Page;
$view->registerLinkTag([
  'title' => 'Jacmoes Cyber Soapbox RSS Feed',
  'rel' => 'alternate',
  'type' => 'application/rss+xml',
  'href' => Url::to('rss', true),
  ]);
$theme = $view->theme;
$asset = app\themes\bourbon\assets\ThemeAsset::register($view);
$pype_logo = $asset->baseUrl . '/pype_w.svg';
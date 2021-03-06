<?php
//TODO: figure out how to move this snippet class to components..
use yii\helpers\Url;
use app\components\Gallery;

/**
 * Custom snippets to extend the Markdown markup
 */
class Snippets extends \jacmoe\mdpages\components\snippets\Snippets
{
    public function autogallery($gallery = null)
    {
        return Gallery::gallery($gallery);
    }

    public function div($class = null, $end = false)
    {
        if(!$end) {
            return (is_null($class)) ? "<div>" : "<div class=\"$class\">";
        } else {
            return "</div>";
        }
    }

    public function clearfix($text=null)
    {
        return "<div class=\"clearfix\"></div>";
    }

    public function icondiv($icon, $clear=false)
    {
        if($clear) {
            return "<div class=\"ui horizontal clearing divider\">
            <i class=\"fi-".$icon."\"></i></div>";
        }
        return "<div class=\"ui horizontal divider\">
            <i class=\"fi-".$icon."\"></i></div>";
    }

    public function inimage($title, $source, $align ="left")
    {
        $image_url = Url::home(true) . "images/" . $source;
        $image_path = \Yii::getAlias('@app/web/images/') . $source;
        if(is_file($image_path)) {
            $image_info = array_values(getimagesize($image_path));
            list($width, $height, $type, $attr) = $image_info;
        }

        return "<span class=\"imagewrap $align\">"
            . "<img src=\""
            . $image_url
            . "\" alt=\"" . $title
            . "\" title=\"" . $title . "\""
            . (!isset($width) ? "" : " width=\"" . $width . "\" ")
            . (!isset($height) ? "" : " height=\"" . $height . "\" ")
            . "class=\"m-image th gallery "
            . $align . "\">"
            . "</span>";
    }

    public function lightbox($title, $source, $target, $align ="left", $size = "")
    {
        $target_url = Url::home(true) . "images/" . $target;
        $image_url = Url::home(true) . "images/" . $source;
        $image_path = \Yii::getAlias('@app/web/images/') . $source;
        if(is_file($image_path)) {
            $image_info = array_values(getimagesize($image_path));
            list($width, $height, $type, $attr) = $image_info;
        }

        return "<a href=\""
            . $target_url . "\""
            . " data-lightbox=\""
            . str_replace('.', '_', str_replace('/', '_', $target)) . "\""
            . " data-title=\"" . $title . "\""
            . " title=\"" . $title
            . "\" class=\"sb\"><span class=\"imagewrap\"><img src=\""
            . $image_url
            . "\" alt=\"" . $title . "\" title=\""
            . $title . "\" class=\"m-image gallery th "
            . $align . " floated image\""
            . (!isset($width) ? "" : " width=\"" . $width . "\" ")
            . (!isset($height) ? "" : " height=\"" . $height . "\" ")
            . "/></span></a>";
    }

}

return [
    new Snippets(),
];

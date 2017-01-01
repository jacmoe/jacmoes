<?php
namespace app\components;
/*
 * This file is part of
 *  _ __  _   _ _ __   ___
 * | '_ \| | | | '_ \ / _ \
 * | |_) | |_| | |_) |  __/
 * | .__/ \__, | .__/ \___|
 * |_|    |___/|_|
 *                 Personal Yii Page Engine
 *
 *	Copyright (c) 2016 - 2017 Jacob Moen
 *	Licensed under the MIT license
 */
use Yii;
use yii\helpers\Url;

class Gallery {
    private static $extensions = array("jpg","png","gif","JPG","PNG","GIF");

    public static function gallery($gallery = null)
    {
        $module = \jacmoe\mdpages\Module::getInstance();
        $pages_dir = Yii::getAlias($module->pages_directory);
        $gallery_dir = join(DIRECTORY_SEPARATOR, array($pages_dir, "galleries"));
        if(is_dir($gallery_dir)) {
            $scanned_gallery = scandir(join(DIRECTORY_SEPARATOR, array($gallery_dir, $gallery)));
            $files = array_diff($scanned_gallery, array('..', '.','thumbs','images.txt'));
            $numFiles = count($files);

            if($numFiles == 0) {
                return "<div>The <em>\"$gallery\"</em> gallery does not contain any images.</div>";
            } else {

                $return = "";

                $thumb_dir = join(DIRECTORY_SEPARATOR, array($gallery_dir, $gallery, 'thumbs'));

                if (!is_dir($thumb_dir))
                {
                    return "<div>The <em>\"$gallery\"</em> gallery does not contain any image thumbnails.</div>";
                }

                $return .= "<div><ul class=\"inline-list\">\n";
                $return = $return . Gallery::getImages($gallery, $gallery_dir, $files);
                $return .= "</ul></div>\n";
                return $return;
            }

            return "<div>$gallery_dir - with $numFiles images</div>";

        } else {
            return "<div>Invalid gallery: <em>\"$gallery\"</em></div>";
        }

    }

    // fetch images from description file and process them in order
    private static function getImages($gallery, $gallery_dir, $files)
    {
        $images = "";
        $image_description_file = join(DIRECTORY_SEPARATOR, array($gallery_dir, $gallery, "images.txt"));
        if(file_exists($image_description_file))
        {
            $lines_array = file($image_description_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            if($lines_array)
            {
                foreach($lines_array as $img_line)
                {
                    if(!empty($img_line)) {
                        $img_desc = explode(';', $img_line);
                        if(in_array($img_desc[0], $files))
                        {
                            $ext = strtolower(pathinfo($img_desc[0], PATHINFO_EXTENSION));

                            if(in_array($ext, Gallery::$extensions))
                            {
                                $images = $images . Gallery::getImageHtml($gallery, $gallery_dir, $img_desc[0]);
                            }
                        }
                    }
                }
                return $images;
            }
            else
            {
                return '';
            }
        }
    }

    private static function getImageHtml($gallery, $gallery_dir, $file) {
        $thumb = join(DIRECTORY_SEPARATOR, array($gallery_dir, $gallery, "thumbs", $file));
        if (!file_exists($thumb))
        {
            return "Missing thumbnail!";
        }
        $title = Gallery::itemDescription(join(DIRECTORY_SEPARATOR, array($gallery_dir, $gallery)), $file);
        $target = $file;
        $source = "/thumbs/" . $file;
        $height = 112;

        if(!is_link(Yii::getAlias('@app/web').'/galleries')) {
            symlink($gallery_dir, Yii::getAlias('@app/web').'/galleries');
        }

        $target_url = Url::home(true) . "galleries/$gallery/$target";
        $image_url = Url::home(true) . "galleries/$gallery/$source";
        $image_path = "$gallery_dir/thumbs/$source";
        if(is_file($image_path)) {
            $image_info = array_values(getimagesize($image_path));
            list($width, $height, $type, $attr) = $image_info;
        }

        return "<a href = \""
            . $target_url . "\""
            . " data-lightbox = \""
            . "$gallery\""
            . " data-title = \"" . $title . "\""
            . " title = \"" . $title
            . "\" class = \"sb\"><span class = \"imagewrap\"><img src = \""
            . $image_url
            . "\" alt = \"" . $title . "\" title = \""
            . $title . "\" class = \"gallery th\" "
            . (!isset($width) ? "" : " width = \"" . $width . "\" ")
            . (!isset($height) ? "" : " height = \"" . $height . "\" ")
            . "/></span></a>";
    }

    // get gallery and image images
    private static function itemDescription($gallery_dir, $file='')
    {
        if(file_exists($gallery_dir.'/images.txt'))
        {
            $lines_array = file($gallery_dir.'/images.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            if($lines_array)
            {
                if($file == '')
                {
                    $gallery_line = explode(';', $lines_array[0]);
                    return (!empty($gallery_line[0]) && $gallery_line[0] == 'gallery' ? $gallery_line[1] : '');
                }
                else
                {
                    foreach($lines_array as $img_line)
                    {
                        if(!empty($img_line)) {
                            $img_desc = explode(';', $img_line);
                            $description = (isset($img_desc[1]) ? $img_desc[1] : $img_desc[0]);
                            if($img_desc[0] == $file) { return $description; }
                        }
                    }
                }
            }
            else
            {
                return '';
            }
        }
    }

}
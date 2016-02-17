<?php
/**
 * AutoGallery - create a gallery automatically from images and a description file.
 *
 *  Bits of this code has been lifted and modified from
 *  folioGallery (c) 2014 Harry Ghazanian - foliopages.com/php-jquery-ajax-photo-gallery-no-database
 *  Licensed under the MIT license
 *
 * Copyright (c) 2015 Jacob Moen
 */
namespace Phile\Plugin\Jacmoe\autoGallery;

if (!defined('DS')) {
    define('DS', DIRECTORY_SEPARATOR);
}

use Phile\Core\Utility;

class Plugin extends \Phile\Plugin\AbstractPlugin implements
    \Phile\Gateway\EventObserverInterface
{
    /**
     * Register plugin events via the constructor
     *
     * @return void
     */
    public function __construct()
    {
        \Phile\Event::registerEvent('template_engine_registered', $this);
        \Phile\Core\Event::registerEvent('after_parse_content', $this);
    }

    // function to create thumbnails from images
    private function make_thumb($folder,$file,$dest,$thumb_width) {

        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        
        switch($ext)
        {
            case "jpg":
            $source_image = imagecreatefromjpeg($folder.'/'.$file);
            break;
            
            case "jpeg":
            $source_image = imagecreatefromjpeg($folder.'/'.$file);
            break;
            
            case "png":
            $source_image = imagecreatefrompng($folder.'/'.$file);
            break;
            
            case "gif":
            $source_image = imagecreatefromgif($folder.'/'.$file);
            break;
        }   
        
        $width = imagesx($source_image);
        $height = imagesy($source_image);
        
        if($width < $thumb_width) // if original image is smaller don't resize it
        {
            $thumb_width = $width;
            $thumb_height = $height;
        }
        else
        {
            $thumb_height = floor($height*($thumb_width/$width));
        }
        
        // Handling portrait images - could probably be better and not relying on magic numbers..
        if($thumb_height > $thumb_width)
        {
            $thumb_width = $thumb_width * 0.75;
            $thumb_height = $thumb_height * 0.75;
        }

        $virtual_image = imagecreatetruecolor($thumb_width,$thumb_height);
        
        if($ext == "gif" or $ext == "png") // preserve transparency
        {
            imagecolortransparent($virtual_image, imagecolorallocatealpha($virtual_image, 0, 0, 0, 127));
            imagealphablending($virtual_image, false);
            imagesavealpha($virtual_image, true);
        }
        
        imagecopyresampled($virtual_image,$source_image,0,0,0,0,$thumb_width,$thumb_height,$width,$height);
        
        switch($ext)
        {
            case 'jpg': imagejpeg($virtual_image, $dest,80); break;
            case 'jpeg': imagejpeg($virtual_image, $dest,80); break;
            case 'gif': imagegif($virtual_image, $dest); break;
            case 'png': imagepng($virtual_image, $dest); break;
        }

        imagedestroy($virtual_image); 
        imagedestroy($source_image);
        
    }

    // get gallery and image images
    private function itemDescription($gallery, $file='')
    {
        if(file_exists($gallery.'/images.txt'))
        {
            $lines_array = file($gallery.'/images.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES); 
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

    // fetch images from description file and process them in order
    private function getImages($gallery_name, $gallery, $files)
    {
        $images = '';
        if(file_exists($gallery.'/images.txt'))
        {
            $lines_array = file($gallery.'/images.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES); 
            if($lines_array)
            {
                foreach($lines_array as $img_line)
                {   
                    if(!empty($img_line)) {
                        $img_desc = explode(';', $img_line);    
                        if(in_array($img_desc[0], $files))
                        {
                            $ext = strtolower(pathinfo($img_desc[0], PATHINFO_EXTENSION));

                            if(in_array($ext, $this->settings['extensions'])) 
                            {                                      
                                $images = $images . $this->getImageHtml($gallery_name, $gallery, $img_desc[0]);
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

    public function getImageHtml($gallery_name, $gallery, $file) {
        $thumb = $gallery.'/thumbs/'.$file;
        if (!file_exists($thumb))
        {
            $this->make_thumb($gallery,$file,$thumb,$this->settings['thumb_width']); 
        }      
        $title = $this->itemDescription($gallery, $file);
        $target = Utility::getBaseUrl() . "/content/" . $this->settings['galleries_directory'] . "/" . $gallery_name . "/" . $file;
        $source = Utility::getBaseUrl() . "/content/" . $this->settings['galleries_directory'] . "/" . $gallery_name . "/thumbs/" . $file;
        $height = 112;
//        return "<a href=\"".$target."\" data-lightbox=\"".$gallery_name."\" title=\"".$title."\" class=\"sb\"><img width=\"".$this->settings['thumb_width']."\" src=\"".$source."\" alt=\"".$title."\" title=\"".$title."\" class=\"gallery th image\"></a>";
        return "<li><a href=\"".$target."\" data-lightbox=\"".$gallery_name."\" title=\"".$title."\" class=\"sb\"><img src=\"".$source."\" alt=\"".$title."\" title=\"".$title."\" class=\"gallery th image\"></a><li>";

    }
    
    private function getGalleryHtml($gallery_name) {
        $return = '';
        $gallery = CONTENT_DIR . $this->settings['galleries_directory'] . DS . $gallery_name;

        if(is_dir($gallery))
        {
            $scanned_gallery = scandir($gallery);

            $files = array_diff($scanned_gallery, array('..', '.','thumbs','images.txt'));
            $numFiles = count($files);

            $return = $return . "<div class=\"quiet\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" . $this->itemDescription($gallery) . "</div>\n";

            if($numFiles == 0)
            {
                $return = "Gallery '{$gallery_name}' contains no images.";
            }
            else {

                if (!is_dir($gallery.'/thumbs')) 
                {
                    mkdir($gallery.'/thumbs');
                    chmod($gallery.'/thumbs', 0777);
                }       

                $return .= '<ul class="inline-list">' . "\n";
                
                $return = $return . $this->getImages($gallery_name, $gallery, $files);

                $return .= '</ul>' . "\n";
            }
        }
        else
        {
            $return = "{$gallery_name} is not a gallery";
        }


        return $return;
    }

    /**
     * Listen to event triggers
     *
     * @param  string  $eventKey  Triggered event key
     * @param  array   $data      Array of event data
     * @return void    
     */
    public function on($eventKey, $data = null) {
        if ($eventKey === 'template_engine_registered') {
            $autogallery = new \Twig_SimpleFunction('autogallery', function ($string) {
                return "";
            });
            $data['engine']->addFunction($autogallery);
        } else {
            if ($eventKey === 'after_parse_content') {
                // store the starting content
                $content = $data['content'];
                // this parse happens after the markdown
                // which means that the potential ID is wrapped
                // in p tags
                $regex = "/(<p>)(autogallery)=(.*?)(<\/p>)/";
                // add the modified content back in the data
                $data['content'] = preg_replace_callback($regex, function ($matches) {
                    return $this->getGalleryHtml($matches[3]);
                }, $content);
            }
        }
    }
}

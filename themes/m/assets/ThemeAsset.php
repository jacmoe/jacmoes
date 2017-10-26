<?php
namespace app\themes\m\assets;

use yii\web\AssetBundle;

class ThemeAsset extends AssetBundle
{
    public $sourcePath = '@app/themes/m/assets/dist';
    public $css = [
        YII_ENV_DEV ? 'css/all.css' : 'css/all.min.css'
    ];
    public $js = [
        YII_ENV_DEV ? 'js/all.js' : 'js/all.min.js'
    ];
}

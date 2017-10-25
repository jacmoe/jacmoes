<?php
namespace app\themes\bourbon\assets;

use yii\web\AssetBundle;

class ThemeAsset extends AssetBundle
{
    public $sourcePath = '@app/themes/m/assets/dist';
    public $css = [
        YII_ENV_DEV ? 'css/all.css' : 'css/all.min.css'
    ];
}

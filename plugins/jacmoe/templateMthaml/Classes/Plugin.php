<?php
/**
 * Plugin class
 */
namespace Phile\Plugin\Jacmoe\TemplateMthaml;

use Phile\Core\ServiceLocator;
use Phile\Plugin\AbstractPlugin;
use Phile\Plugin\Jacmoe\TemplateMthaml\Template\Mthaml;

/**
 * Class Plugin
 * Mthaml Phile template engine
 *
 * @author  Jacob Moen
 * @link    http://jacmoe.dk
 * @license http://opensource.org/licenses/MIT
 * @package Phile\Plugin\Jacmoe\TemplateMthaml
 */
class Plugin extends AbstractPlugin {

	protected $events = ['plugins_loaded' => 'onPluginsLoaded'];

	/**
	 * onPluginsLoaded method
	 *
	 * @param null   $data
	 *
	 * @return mixed|void
	 */
	public function onPluginsLoaded($data = null) {
		ServiceLocator::registerService('Phile_Template',
			new Mthaml($this->settings));
	}
}

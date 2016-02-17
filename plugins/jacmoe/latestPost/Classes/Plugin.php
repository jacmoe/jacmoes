<?php
/**
 * Return the last blog post
 *
 */
namespace Phile\Plugin\Jacmoe\latestPost;

class Plugin extends \Phile\Plugin\AbstractPlugin implements
    \Phile\Gateway\EventObserverInterface
{
    protected $lastpost = null;

    /**
     * The paginator to be used
     *
     * @var function paginator
     */
    private $filter;

    /**
     * Register plugin events via the constructor
     *
     * @return void
     */
    public function __construct()
    {
        \Phile\Event::registerEvent('template_engine_registered', $this);
    }

    /**
     * Get all the posts to be paginated.
     *
     * @return array all blog posts
     */
    public function getPosts()
    {
        $filters = $this->settings['filters'];
        $uri = 'main';
        $this->filter = (array_key_exists($uri, $filters)) ? $filters[$uri] : null;

        if($this->filter !== null)
        {
            // get all the posts
            $repo = new \Phile\Repository\Page($this->settings);
            $pages = $repo->findAll()->toArray();

            return array_filter($pages, $this->filter);
        }
        else
        {
            return '';
        }
    }

    /**
     * Listen to event triggers
     *
     * @param  string  $eventKey  Triggered event key
     * @param  array   $data      Array of event data
     * @return void    
     */
    public function on($eventKey, $data = null)
    {
        if($eventKey == 'template_engine_registered')
        {
            $this->lastpost = $this->getPosts();
            if($this->lastpost !== null)
                $data['data']['lastpost'] = current($this->lastpost);
        }
    }
}

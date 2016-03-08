var disqus_config = function () {
    this.page.url = '#{ Url::to($page->url, true) }';
    this.page.identifier = '#{ $page->disqusid }';
};
(function() {  // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');

    s.src = '//jacmoes.disqus.com/embed.js';

    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();

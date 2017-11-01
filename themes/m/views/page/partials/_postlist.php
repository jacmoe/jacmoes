<?php
if(Url::base(true) === 'https://jacmoe.dev') {
  $posts = Page::pages('datetime DESC', array('blogpost', '==', true));
} else {
  $posts = Page::pages('datetime DESC', array('published', '==', true));
}

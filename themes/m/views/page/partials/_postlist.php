<?php
if(Url::base(true) === 'https://local.jacmoe.dk') {
  $posts = Page::pages('datetime DESC', array('blogpost', '==', true));
} else {
  $posts = Page::pages('datetime DESC', array('published', '==', true));
}

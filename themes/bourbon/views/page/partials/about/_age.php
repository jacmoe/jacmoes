<?php
// http://stackoverflow.com/a/1112847/1795121
function getAge($then) {
    $then_date = date('Ymd', strtotime($then));
    $diff = date('Ymd') - $then_date;
    return substr($diff, 0, -4);
}
$age = getAge('1968-05-06');
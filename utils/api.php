<?php

/**
 * Application : phonehub
 * File        : api.php
 * Author      : Rafael Battesti
 * Since       : 2016-08-05
 * Version     : 0.1
 */

/**
 * @param $path
 * @param $status
 * @param $message
 */
function logger($path, $status, $message) {
    $logMsg = "[" . timestamp() . "] : " . $status . " : " . $message . "\n";
    file_put_contents($path, $logMsg, FILE_APPEND | LOCK_EX);
}

function timestamp() {
    date_default_timezone_set("ET");
    return date(DATE_ATOM);
}
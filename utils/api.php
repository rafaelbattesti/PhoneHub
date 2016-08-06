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
    $file = fopen($path, "w") or die ("Error: open log file");
    $logMsg = "[" . timestamp() . "] : " . $status . " : " . $message;
    fwrite($file, $logMsg);
    fclose($file);
}

function timestamp() {
    date_default_timezone_set("ET");
    return date(DATE_ATOM);
}
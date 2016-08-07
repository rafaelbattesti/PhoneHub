<?php

/**
 * Application : phonehub
 * File        : Class.API.php
 * Author      : Rafael Battesti
 * Since       : 2016-08-05
 * Version     : 0.1
 */

require_once(__DIR__ . "/../config/appconfig.php");
require_once(__DIR__ . "/../database/Class.UserDatabase.php");
require_once("Class.User.php");

class API {

    /**
     * @var string
     */
    private $message;

    /**
     * @return string
     */
    public function getMessage() {
        return $this->message;
    }

    /**
     * @param $message string
     */
    public function setMessage($message) {
        $this->message = $message;
    }

    /**
     * @param $user User
     */
    public static function authenticate($user) {
        try {
            $db = new UserDatabase();
            $isAuth = $db->authenticate($user->getEmail(), $user->getPassword());
            $user->setIsLoggedIn($isAuth);
            $db->disconnect();
            unset($db);
            self::logger(DB_LOG, DEV_SUCCESS, API_CLASS, __FUNCTION__);
        } catch (Exception $e) {
            self::setMessage(API_ERROR);
            self::logger(DB_LOG, DEV_ERROR, API_CLASS, $e->getMessage());
        }
    }

    /**
     * @return string
     */
    public static function timestamp() {
        date_default_timezone_set("ET");
        return date(DATE_ATOM);
    }

    /**
     * @param $path string
     * @param $status string
     * @param $location string
     * @param $message string
     */
    public static function logger($path, $status, $location, $message) {
        $logMsg = "[" . self::timestamp() . "] : " . $status . " : " . $location . " : " . $message . "\n";
        file_put_contents($path, $logMsg, FILE_APPEND | LOCK_EX);
    }
}
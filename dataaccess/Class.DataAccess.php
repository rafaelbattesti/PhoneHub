<?php

/**
 * Application : phonehub
 * File        : Class.DataAccess.php
 * Author      : Rafael Battesti
 * Since       : 2016-08-05
 * Version     : 0.1
*/

/**
 * Require the configuration file
 * Sets DB_SERVER, DB_NAME, DB_USERNAME, DB_PASSWORD
 */
require_once(__DIR__ . "/../config/appconfig.php");
require_once(__DIR__ . "/../service/Class.API.php");

/**
 * Class database (Base class for all other dataaccess access service)
 */
class DataAccess {

    /**
     * @var mysqli object
     */
    protected $conn;

    /**
     * Opens connection on instantiation
     */
    public function __construct(){
        $this->connect();
    }

    /**
     * Connect
     */
    private function connect() {
        $this->conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
        if($this->conn->connect_errno) {
            throw new Exception(DB_ERROR);
        }
    }

    /**
     * Disconnect
     */
    public function disconnect() {
        if(isset($this->conn)) {
            mysqli_close($this->conn);
            unset($this->conn);
        }
    }
}
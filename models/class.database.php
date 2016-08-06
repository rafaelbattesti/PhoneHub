<?php

/**
 * Application : phonehub
 * File        : class.database.php
 * Author      : Rafael Battesti
 * Since       : 2016-08-05
 * Version     : 0.1
*/

/**
 * Require the configuration file
 * Sets DB_SERVER, DB_NAME, DB_USERNAME, DB_PASSWORD
 */
require_once(__DIR__ . "/../utils/appconfig.php");
require_once(__DIR__ . "/../utils/api.php");

/**
 * Class database (Base class for all other data access models)
 */
class database {

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
    protected function connect() {

        $this->conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);

        if($this->conn->connect_errno) {
            throw new Exception("Connect to DB");
        }
    }

    /**
     * Disconnect
     */
    protected function disconnect() {

        if(isset($this->conn)) {
            mysqli_close($this->conn);
            unset($this->conn);
        }
    }
}
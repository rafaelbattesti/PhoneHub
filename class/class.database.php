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
 * Simple Database object
 */
class database {

    /**
     * @var connection
     */
    protected $conn;

    /**
     * @var message
     */
    protected $msg;

    /**
     * Opens connection on instantiation
     */
    public function __construct(){
        $this->connect();
    }

    /**
     * @return connection
     */
    public function getConnection() {
        return $this->conn;
    }

    /**
     * Connect
     */
    protected function connect() {

        $this->conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);

        if(mysqli_connect_errno()) {
            throw new Exception("Connect to DB" . mysqli_connect_error() . ":" . mysqli_connect_errno());
        }
    }

    /**
     * Disconnect
     */
    protected function disconnect() {

        if(isset($this->conn)) {
            mysql_close($this->conn);
            unset($this->conn);
        }
    }
}
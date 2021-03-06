<?php

/**
 * Application : phonehub
 * File        : class.userdatabase.php
 * Author      : Rafael Battesti
 * Since       : 2016-08-05
 * Version     : 0.1
 */

require_once(__DIR__ . "/../utils/appconfig.php");
require_once(__DIR__ . "/../utils/api.php");
require_once(__DIR__ . "/class.database.php");

/**
 * Class userdatabase (data access model for user)
 */
class userdatabase extends database {


    /**
     * @param $email
     * @return array|null
     */
    public function getUserByEmail($email) {
        $sql = "SELECT * FROM users WHERE email='$email' LIMIT 1";
        $result = mysqli_query($this->conn, $sql);
        $user = mysqli_fetch_assoc($result);
        return $user;
    }

    /**
     * @return string JSON of the users
     */
    public function getAllUsers() {
        $sql = "SELECT * FROM users";
        $result = mysqli_query($this->conn, $sql);
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }
}
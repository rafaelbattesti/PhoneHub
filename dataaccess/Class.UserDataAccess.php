<?php

/**
 * Application : phonehub
 * File        : Class.UserDataAccess.php
 * Author      : Rafael Battesti
 * Since       : 2016-08-05
 * Version     : 0.1
 */

require_once(__DIR__ . "/../config/appconfig.php");
require_once(__DIR__ . "/../service/Class.API.php");
require_once("Class.DataAccess.php");

/**
 * Class UserDataAccess (DataAccess model for User)
 */
class UserDataAccess extends DataAccess {

    /**
     * @param $email
     * @return array|null
     * @throws Exception
     */
    public function getUserByEmail($email) {
        $sql = "SELECT * FROM users WHERE email='$email' LIMIT 1";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            $user = mysqli_fetch_assoc($result);
            $this->userDataAccessLog(SUCCESS);
            return $user;
        } else {
            $this->userDataAccessLog(ERROR);
            throw new Exception(DB_ERROR);
        }
    }

    /**
     * @return array
     * @throws Exception
     */
    public function getAllUsers() {
        $sql = "SELECT * FROM users";
        $result = mysqli_query($this->conn, $sql);
        if($result) {
            $rows = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
            $this->userDataAccessLog(SUCCESS);
            return $rows;
        } else {
            $this->userDataAccessLog(ERROR);
            throw new Exception(DB_ERROR);
        }
    }

    /**
     * @param $email
     * @param $password
     * @return bool
     * @throws Exception
     */
    public function authenticate($email, $password) {
        $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password' LIMIT 1";
        $result = mysqli_query($this->conn, $sql);
        if($result) {
            $this->userDataAccessLog(SUCCESS);
            return true;
        } else if (empty($result)) {
            $this->userDataAccessLog(ERROR);
            throw new Exception(DB_ERROR);
        }
    }

    /**
     * @param $status string
     */
    private function userDataAccessLog($status) {
        if ($status == ERROR){
            API::logger(DB_LOG, ERROR, USER_DATA_ACCESS, __FUNCTION__);
        } else {
            API::logger(DB_LOG, SUCCESS, USER_DATA_ACCESS, __FUNCTION__);
        }
    }


}
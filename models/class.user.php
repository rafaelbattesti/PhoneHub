<?php

/**
 * Application : phonehub
 * File        : class.user.php
 * Author      : Rafael Battesti
 * Since       : 2016-08-05
 * Version     : 0.1
 */

require_once(__DIR__ . "/../utils/appconfig.php");

/**
 * Class user : represents a model of the user
 */
class user {

    /**
     * @var string
     */
    private $email;

    /**
     * @var string MD5 hash
     */
    private $password;

    /**
     * @var
     */
    private $isAdmin;

    /**
     * @var
     */
    private $isLoggedIn;

    /**
     * @param $e string
     * @param $p string
     */
    public function __construct ($e, $p) {
        $this->setEmail($e);
        $this->setPassword($p);
    }

    /**
     * @return string email
     */
    public function getEmail() {
        return $this->email;
    }

    /**
     * @param $email string
     */
    public function setEmail($email) {
        $this->email = $email;
    }

    /**
     * @return string MD5 password
     */
    public function getPassword() {
        return $this->password;
    }

    /**
     * @param $password string
     */
    public function setPassword($password) {
        $this->password = md5($password);
    }

    /**
     * @return mixed
     */
    public function getIsAdmin() {
        return $this->isAdmin;
    }

    /**
     * @param $isAdmin mixed
     */
    public function setIsAdmin($isAdmin) {
        $this->isAdmin = $isAdmin;
    }

    /**
     * @return mixed
     */
    public function getIsLoggedIn() {
        return $this->isLoggedIn;
    }

    /**
     * Set isLoggedIn to true
     */
    public function setIsLoggedIn() {
        $this->isLoggedIn = true;
    }

    /**
     * @param $db userdatabase
     * @return bool
     */
    public function authenticate($db) {
        $result = $db->getUserByEmail($this->email);

        if($result) {
            if($this->getPassword() == $result["password"]) {
                $this->setIsLoggedIn();
                $this->setIsAdmin($result["admin"]);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }
}
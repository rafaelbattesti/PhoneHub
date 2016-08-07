<?php

/**
 * Application : phonehub
 * File        : Class.User.php
 * Author      : Rafael Battesti
 * Since       : 2016-08-05
 * Version     : 0.1
 */



/**
 * Class user : represents a model of the user
 */
class User {

    /**
     * @var string
     */
    private $email;

    /**
     * @var string MD5 hash
     */
    private $password;

    /**
     * @var boolean
     */
    private $isAdmin;

    /**
     * @var boolean
     */
    private $isLoggedIn;

    /**
     * @param $email string
     * @param $password string
     */
    public function __construct ($email, $password) {
        $this->setEmail($email);
        $this->setPassword($password);
    }

    /**
     * @return string $email
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
     * @param $password string ASCII password
     */
    public function setPassword($password) {
        $this->password = MD5($password);
    }

    /**
     * @return boolean
     */
    public function getIsAdmin() {
        return $this->isAdmin;
    }

    /**
     * @param $isAdmin boolean
     */
    public function setIsAdmin($isAdmin) {
        $this->isAdmin = $isAdmin;
    }

    /**
     * @return boolean
     */
    public function getIsLoggedIn() {
        return $this->isLoggedIn;
    }

    /**
     * @param $isLoggedIn boolean
     */
    public function setIsLoggedIn($isLoggedIn) {
        $this->isLoggedIn = $isLoggedIn;
    }
}
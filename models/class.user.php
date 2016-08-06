<?php

/**
 * Application : phonehub
 * File        : class.user.php
 * Author      : Rafael Battesti
 * Since       : 2016-08-05
 * Version     : 0.1
 */

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
     * @param $e string
     * @param $p string
     */
    public function __construct ($e, $p) {
        $this->email = $e;
        $this->password = md5($p);
    }

    /**
     * @return string email
     */
    public function getEmail() {
        return $this->email;
    }

    /**
     * @return string MD5 password
     */
    public function getPassword() {
        return $this->password;
    }

    /**
     * @param $db database object
     * @return bool authenticated
     */
    public function authenticate($db) {
        $json = false;
        $result = $db->getUserByEmail($this->email, $json);

        if(!empty($result)) {
            return true;
        } else {
            return false;
        }

    }
}
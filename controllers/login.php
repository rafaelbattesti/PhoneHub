<?php

require_once(__DIR__ . "/../dataaccess/Class.UserDataAccess.php");
require_once(__DIR__ . "/../service/Class.User.php");
require_once(__DIR__ . "/../service/Class.API.php");
require_once(__DIR__ . "/../config/appconfig.php");

/**
 * Application : phonehub
 * File        : login.php
 * Author      : Rafael Battesti
 * Since       : 2016-08-05
 * Version     : 0.1
 */

if (isset($_POST["email"]) && isset($_POST["password"])) {

    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    $user = new user($email, $password);
    API::authenticate($user);

    if($user->getIsLoggedIn()) {
        session_start();
        $json = array(
            "email"      => $user->getEmail(),
            "isAdmin"    => $user->getIsAdmin(),
            "isLoggedIn" => $user->getIsLoggedIn()
        );
        echo json_encode($json);
    } else {
        echo json_encode($user);
    }
}


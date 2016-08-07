<?php

require_once(__DIR__ . "/../models/class.userdatabase.php");
require_once(__DIR__ . "/../models/class.user.php");
require_once(__DIR__ . "/../utils/api.php");
require_once(__DIR__ . "/../utils/appconfig.php");

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
    $db = new userdatabase();

    if ($user->authenticate($db)) {
        $json = array(
            "email"      => $user->getEmail(),
            "isAdmin"    => $user->getIsAdmin(),
            "isLoggedIn" => $user->getIsLoggedIn()
        );
        echo json_encode($json);
    } else {
        echo json_encode(new stdClass());
    }
}


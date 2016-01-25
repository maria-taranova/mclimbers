<?php
    // http://php.net/manual/en/function.session-start.php
    // http://stackoverflow.com/questions/11768816/php-session-variables-not-preserved-with-ajax
    // http://stackoverflow.com/questions/9560240/how-session-start-function-works
    // get the session
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    $DBHost = "localhost";
    $dblogin = "root";
    $DBpassword = "root";
    $DBname = "m_climbers";

    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "$methodType");

    if ($methodType === 'POST') {

/*
        foreach ($_POST as $key => $value){
            // simply parrot back what was sent
            $data[$key] = $value;
        }
        echo json_encode($data, JSON_FORCE_OBJECT);
        return;
*/

        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            // yes, is AJAX call
            // answer POST call and get the data that was sent
                $data = $_POST['userData'];
                $username = $data['username'];
                $password = md5($data['password']);
            
            
            if(isset($username) && !empty($username)
                && isset($password) && !empty($password)){


                // get the data from the post and store in variables
                $login =  $data["username"];
                $password = md5($data["password"]);
                

                try {
                    $conn = new PDO("mysql:host=$DBHost;dbname=$DBname", $dblogin, $DBpassword);
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                    $sql = "SELECT *, users.id as usId, city, (SELECT COUNT(reviews.id)  FROM reviews INNER JOIN users on users.id=reviews.userid WHERE users.username = :log) as 'reviewsnum' FROM users INNER JOIN location ON users.locationid=location.id WHERE username = :log AND password = :pwd";

                    $statement = $conn->prepare($sql);
                    $statement->execute(array(":log" => $login, ":pwd" => $password));

                    // this should be one if there's a user by that user value and password value
                    $count = $statement->rowCount();

                    if($count > 0) {
                        // success, so fetch the first and hopefully only record

                        // http://stackoverflow.com/questions/15287905/convert-pdo-recordset-to-json-in-php
                        // http://php.net/manual/en/pdostatement.fetchall.php
                        $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
                        $returnedLogin = $rows[0]['username'];
                        $returnedPassword = $rows[0]['password'];

                        // now put into the session that we're logged in
                        // also, could have an HMAC
                        // http://php.net/manual/en/function.hash-hmac.php
                        // http://stackoverflow.com/questions/4495950/how-do-stateless-servers-work/4496016#4496016
                        $_SESSION['username'] = $returnedLogin;
                        $_SESSION['loggedin'] = true;

                        // normally you don't put the session id in since it's already
                        // send in the HTTP header but here it is so that you can
                        // see that it was generated
                        $sid= session_id();
                       
                        
                        
                        $userinfo = array(
                            "id" => $rows[0]['usId'],
                            "username" => $rows[0]['username'],
                            "profilePicture" => $rows[0]['profilePicture'],
                            "fname" => $rows[0]['fname'],
                            "lname" => $rows[0]['lname'],
                            "reviewsnum" => $rows[0]['reviewsnum'],
                            "region" => $rows[0]['city']

                        );

                         $data = array("status" => "success", "sid" => $sid, "userinfo" => $userinfo);
                        

                    } else {
                        $data = array("status" => "fail", "msg" => "User name and/or password not correct.");
                    }


                } catch(PDOException $e) {
                    $data = array("status" => "fail", "msg" => $e->getMessage());
                }


            } else {
                $data = array("status" => "fail", "msg" => "Either login or password were absent.");
            }



        } else {
            // not AJAX
            $data = array("status" => "fail", "msg" => "Has to be an AJAX call.");
        }


    } else {
        // simple error message, only taking POST requests
        $data = array("status" => "fail", "msg" => "Error: only POST allowed.");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>


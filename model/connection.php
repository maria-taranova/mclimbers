<?php
//purpose of this file is to connect to the database
$con = mysqli_connect("localhost", "root", "root", "m_climbers");

if(mysqli_connect_errno()){
	echo "Something went wrong connecting... ".mysqli_connect_error();
}
?>
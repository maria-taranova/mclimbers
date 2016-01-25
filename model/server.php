<?php
//this file is for manipulating data in the back
include("connection.php");
//call for all Trails data
function showAllTrails(){
	global $con;
	
	$arrayStorage = array();
	$query = "SELECT trails.id, trails.name, trails.difficulty, location.city, trails.bgImage, trails.season, trails.desc, trails.distance, trails.latitude, trails.longitude, trails.dogFriendly, trails.bears,
    (SELECT AVG(rating) FROM reviews WHERE reviews.trailid=trails.id
GROUP BY trailId) AS 'rating' FROM trails INNER JOIN location ON trails.locationID=location.id";
	$result = mysqli_query($con, $query);
	if($result){
		while($row = mysqli_fetch_array($result)){
	
			$trailInfo = array(
                "id" => $row['id'],
                "name" => $row['name'],
				"difficulty" => $row['difficulty'],
				"city" => $row['city'],
				"bgImage" => $row['bgImage'],
                "season" => $row['season'],
                "desc" => $row['desc'],
                "distance" => $row['distance'],
                 "latitude" => $row['latitude'],
                "longitude" => $row['longitude'],
                 "avRating" => $row['rating'],
                 "dogFriendly" => $row['dogFriendly'],
                "bears" => $row['bears']
			);
			
			array_push($arrayStorage, $trailInfo);
		}
		
	}
	
	/*echo "<pre>";
	var_dump($arrayStorage);
	echo "</pre>";*/
	echo json_encode($arrayStorage);
}


function deleteComment(){
	global $con;
	var_dump($_POST['id']);
	$arrayStorage = array();
	$query = "DELETE FROM `m_climbers`.`reviews` WHERE `reviews`.`id` =' ".$_POST['id']."'";
	$result = mysqli_query($con, $query);
        if($result){

                echo json_encode("DELETED!!!!");

            } else {
                echo json_encode("FAIL!!!");	
            }

	/*echo "<pre>";
	var_dump($arrayStorage);
	echo "</pre>";*/
	echo json_encode($arrayStorage);
}


function getComments(){
	global $con;
	$userid = $_POST['id'];

    
	$arrayStorage = array();
	$query = "SELECT *, reviews.id as revid, trails.name FROM reviews INNER JOIN trails ON reviews.trailid = trails.id WHERE userid='".$userid."'";
	$result = mysqli_query($con, $query);
	if($result){
		while($row = mysqli_fetch_array($result)){
	
			$commentInfo = array(
                "id" => $row['revid'],
                "trailid" => $row['trailID'],
                "reviewText" => $row['reviewText'],
				"rating" => $row['rating'],
                "name" => $row['name']
				
			);
			
			array_push($arrayStorage, $commentInfo);
		}
		
	}
	
	/*echo "<pre>";
	var_dump($arrayStorage);
	echo "</pre>";*/
	echo json_encode($arrayStorage);
}

function getCommentsSUM(){
	global $con;
	$userid = $_POST['id'];

    
	$arrayStorage = array();
	$query = "SELECT COUNT(id) as total FROM reviews WHERE userid='".$userid."'";
	$result = mysqli_query($con, $query);
	if($result){
		while($row = mysqli_fetch_array($result)){
	
			$commentInfo = array(
                "total" => $row['total']
				
				
			);
			
			array_push($arrayStorage, $commentInfo);
		}
		
	}
	
	/*echo "<pre>";
	var_dump($arrayStorage);
	echo "</pre>";*/
	echo json_encode($arrayStorage);
}


function showPicGallery(){
	global $con;
	
	
    $trailId = $_POST['term'];
    $arrayStorage[$trailId]= array(
        "pictures" => array(),
        "reviews" =>array()    
    );
        
	$query = "SELECT pictures.link, pictures.comment FROM pictures WHERE pictures.trailid='".$trailId."'";
	$result = mysqli_query($con, $query);
	
    if($result){
		while($row = mysqli_fetch_array($result)){

               $picture = array(
                  
                    "url" => $row['link'],
                    "caption" => $row['comment'] 

                );

                array_push($arrayStorage[$trailId]["pictures"], $picture);
            }
		
	}
;
	
   	$query = "SELECT reviews.reviewText, reviews.rating,  users.username, users.profilePicture FROM reviews LEFT JOIN users ON reviews.userid=users.id WHERE reviews.trailid='".$trailId."'ORDER BY reviews.id DESC";
	$result = mysqli_query($con, $query);
	if($result){
		while($row = mysqli_fetch_array($result)){
	
			$review = array(
				"review" => $row['reviewText'],
				"rating" => $row['rating'],
                "username" => $row['username'],
                "profilePicture" => $row['profilePicture']
                
				
			);
            
array_push($arrayStorage[$trailId]["reviews"], $review);
        }
            
	echo json_encode($arrayStorage);
}
}

function InsertReview(){
	global $con;
    var_dump($_POST['newReview']);
    $data = $_POST['newReview'];
    $name = $data['name'];
    $review = $data['review'];
    $rating = $data['rating'];
    $user = (int)$_POST['userID'];

        var_dump($user);
   
    
	$arrayStorage = array();
    
 
	  
    $query = "INSERT INTO `reviews` (`id`, `trailID`, `userID`, `reviewText`, `rating`) VALUES (NULL, (SELECT id from trails WHERE name='".$name."'), '".$user."', '".$review."', '".$rating."') ";
    
    
    
    
    $result = mysqli_query($con, $query);
	if($result){
		
		echo json_encode("INSERTED!!!!");
		
	} else {
		echo json_encode("FAIL!!!");	
	}
}




//showAllUsers();
if($_POST['mode'] == 0){
	showAllTrails();	
} else if(isset($_POST["term"])){
	showPicGallery();
        
} else if ($_POST['mode'] == 1){
	InsertReview();	
}else if ($_POST['mode'] == 9){
	getComments();	
}else if ($_POST['mode'] == 8){
	deleteComment();	
}else if ($_POST['mode'] == 7){
	getCommentsSUM();
}




?>
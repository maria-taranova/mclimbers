var $$ = Dom7;
// Let's register Template7 helper so we can pass json string in links
/*Template7.registerHelper('json_stringify', function(context) {
    return JSON.stringify(context);
});*/
// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    swipePanel: 'left',
    cache: true,
    domCache: true,
    cacheIgnore: ['singleTrail.html', 'projects.html'],
    modalTitle: 'Mountain Climbers',
    template7Pages: true,
    // Specify Template7 data for pages
    template7Data: {
        // Will be applied for page with "projects.html" url
        profile: {
            id: '',
            username: '',
            region: '',
            profilePicture: 'assets/Profile_pic-01.png',
            fname: '',
            lname: '',
            reviewsnum: ''
        },
        // Will be applied for page with data-page="contacts"
        'page:maps': {},
        // Just plain data object that we can pass for other pages using data-contextName attribute
        trails: [
            //trails are pushed here
        ]
    }
});
/*pop up for sign up*/
//log out
var signOut = function() {
    var sendData = {
        logout: "true"
    };
    $$.ajax({
        url: "./model/logout-session.php",
        type: "POST",
        dataType: "JSON",
        data: sendData,
        success: function(resp) {
            sessionStorage.clear();;
            myApp.template7Data.profile = {};
            console.log(myApp.template7Data.profile);
            //changing UI for unsigne user
            $$(".u-img").html("You're Logged Out.");
            $$(".sign-out").html(
                '<span class="sign-out"> <a href="#" class="open-login-screen sign-out item-link item-content panel-close"><div class="item-inner"> Log In  </div></a></span>'
            );
            $$(".proft").html('');
            $$(".profy").html('');
            setTimeout(function() {
                $$(".u-img").html("");
            }, 2000);
            //changes end            
        }
    });
};
//log out ends                  
//Function to validate user
var signIn = function() {
    var formData = myApp.formToJSON('#user-signin');
    //console.log(formData);
    $$.ajax({
        url: "./model/login-session.php",
        type: "POST",
        dataType: "JSON",
        data: {
            userData: formData
        }, // could use this to ask for specific pieces of information (e.g., user profile, friends list, etc)
        success: function(resp) {
            
            var userResponse = JSON.parse(resp);
            //console.log("Session GET returned: ", resultData);
            var status = userResponse.status;
            if (status == 'success') {
                var profile = myApp.template7Data.profile;
                profile.id = userResponse.userinfo.id;
                profile.username = userResponse.userinfo.username;
                profile.region = userResponse.userinfo.region;
               if (userResponse.userinfo.profilePicture >0){
                profile.profilePicture = userResponse.userinfo.profilePicture;}
                profile.lname = userResponse.userinfo.lname;
                profile.fname = userResponse.userinfo.fname;
                profile.reviewsnum = userResponse.userinfo.reviewsnum;
                sessionStorage.username = userResponse.userinfo
                    .username;
            
                $$("#response").html(
                    "Cool, redirecting to main screen");
                setTimeout(function() {
                    myApp.closeModal(".login-screen")
                }, 1000);
                mainView.router.loadPage('allTrails.html');
                $$("#response").html("");
                if (sessionStorage.length > 0) { //add user's profile on nav bar
                    //document.body.innerHTML = ("Log In");
                    $$(".u-img").html(
                    
               "<h3 style='color:#fff; padding:30px 0 0 15px;'> &nbsp; Welcome, @" +
                        profile.username +
                        "</h3><img class='circular'src=" +
                        profile.profilePicture +
                              " style='height:75px; width:75px; margin:auto; margin-top:-15px; margin-left: 20px;'/>"
                        
                    );
                    $$(".sign-out").html(
                        "<a href='allTrails.html' onclick='signOut()' class='sign-out item-link item-content panel-close' data-context-name='trails''><div class='item-inner'>Sign Out</div></a>"
                    );
                    //changes     
                    $$(".proft").html(
                        '<a href="projects.html" data-context-name="profile" class="item-link item-content"><img src="assets/Profile@2x.png" style="width: 52px;"></i></a>'
                    );
                    $$(".profy").html(
                        '<a href="projects.html" data-context-name="profile" class="item-link item-content panel-close"><div class="item-inner">Profile</div></a>'
                    );
                };
                //changes end            
            } else {
                console.log("bad");
                $$("#response").html(
                    "Something wrong with username or password"
                );
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.statusText, textStatus);
        }
    });
};
//end of user validation
/*Create new user*/
var newUser = function() {
        var formData = myApp.formToJSON('#user-form');
        console.log(formData);
        $$.ajax({
            url: "./model/user.php",
            dataType: "json",
            data: {
                mode: 12,
                userData: formData
            },
            type: "post",
            complete: function(resp) {
                console.log("LM working");
                //loop through the package of information and grab their individual properties
                console.log(sessionStorage);
            }
        });
        
   
    
  }  
    
    
         
 
    
    
    
 
    //end of new user creation
console.log(myApp.template7Data.trails);
// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // domCache: true
});
gettrailJSON();
var validation = function() { //enable disbled button
    var submit = document.getElementById("submit");
    submit.setAttribute("class", "button form-to-json");
};
var send = function() {
    var trailName = document.forms["reviewForm"]["name"].value;
    var trailReview = document.forms["reviewForm"]["review"].value;
    var trailRating = $$('.popup').find('input[name="rating"]:checked').val();
    console.log(trailRating);
    //user input for review validation
    if (trailName == null || trailName == "", trailReview == null ||
        trailReview == "", trailRating == null || trailRating == "") {
        if (trailName == null || trailName == "") {
            $$("#rresponse").html("Please, fill in Trail Name");
        } else if (trailReview == null || trailReview == "") {
            $$("#rresponse").html("Please, add your review");
        } else if (trailRating == null || trailRating == "") {
            console.log(trailRating);
            console.log(formData);
            $$("#rresponse").html("Please, add star rating");
        }
    } else {
        var formData = myApp.formToJSON('#my-form'); //stringify data from input
        //as soon as the document is ready, we connect to the server file
        $$.ajax({
            url: "./model/server.php",
            dataType: "json",
            data: {
                mode: 1,
                userID:  myApp.template7Data.profile.id,
                newReview: formData
            },
            type: "post",
            complete: function(resp) {
                //loop through the package of information and grab their individual properties
                document.getElementById("rresponse").innerHTML =
                    "Thanks, your review is submitted";
                document.getElementById("comment").innerHTML =
                    ""; //removes old comments
                setTimeout(function() {
                    myApp.closeModal(".popup")
                }, 1000);
                var trailId = document.getElementById(
                    "trailName").title;
                getimagesJSON(trailId);
            }
        });
    };
};

function gettrailJSON() {
    $$.ajax({
        url: "./model/server.php",
        dataType: "json",
        data: {
            mode: 0
        },
        type: "post",
        success: function(resultTrails) {
            console.log(resultTrails);
            var count = 0;
            for (var i in resultTrails) {
                count++;
            }
            for (var i in resultTrails) {
                resultTrails[i].dogFriendly = parseInt(
                    resultTrails[i].dogFriendly);
                resultTrails[i].bears = parseInt(resultTrails[i]
                    .bears);
                myApp.template7Data.trails.push(resultTrails[i]);
            }
            console.log(myApp.template7Data);
            $$("#trailjson").html("<h4>" + count +
                " trails are in our database</h4>");
        }
    });
};


function getComments(id) {
        var gallery = [];
        var id = id;
        $$.ajax({
            url: "./model/server.php",
            dataType: "json",
            data: {
                mode: 9,
                id: id
            },
            type: "POST",
            dataType: "json",
            success: function(commentData) {
                    // console.log(trailData);
                    for (var index in commentData) {
                                    
                    $$("#user-comments").append("<li  class='swipeout'> <div class='swipeout-content'> <a href='#' class='item-content item-link' style='color: black'><div class='item-inner'><div class='item-title-row'><div class='item-title'>"+commentData[index].name+"</div><div class='item-text'>"+commentData[index].reviewText+"</div></div></div></a></div><div class='swipeout-actions-right'><a href='singleTrail.html' data-context-name='trails."+(commentData[index].trailid-1)+"' id='"+parseInt(commentData[index].trailid)+"' class='mark'>View trail</a><a href='#' id='"+parseInt(commentData[index].id)+"' class='swipeout-delete remove'>Delete</a></div></li>");
                    } //end for itirating trough trailData
                } //end for succes function in ajax
        }); //end for ajax in getimagesJSON
    } //end of getcommentJSON


myApp.onPageAfterAnimation('comments', function(page) {

    $$('.mark').on('click', function () {
        var trailId = this.id;
                console.log(trailId);
                getimagesJSON(trailId);
    });
    
       $$('.remove').on('click', function () {
           var reviewId = this.id;
           
           $$.ajax({
            url: "./model/server.php",
            dataType: "json",
            data: {
                mode: 8,
                id: reviewId
            },
            type: "POST",
            dataType: "json",
            success: function(resp) {
            
                console.log(resp);
            
            }
           
           });
    });

});


/*Individual trail*/
//individual trail finished



                
                  var ranImage = ['http://backgrounds.funmunch.com/background/pattern_background_a4.gif','http://www.uisdc.com/wp-content/uploads/2013/09/11-Squares_t2.jpg', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRybqpa6ux8ZhDB_eBWlTo5EbMbze5rbmjjGh_3Xp1LnsGr5zSHMQ'];
var rand = function() {
    return Math.floor(Math.random()*ranImage.length);
};
var randomBG = function() {
    var r = ranImage[rand()];
    return r;
};
    

function getimagesJSON(id) {
        var gallery = [];
        var id = id;
        console.log(id);
        $$.ajax({
            url: "./model/server.php",
            dataType: "json",
            data: {
                mode: 1,
                term: id
            },
            type: "POST",
            dataType: "json",
            success: function(trailData) {
                    
              console.log(trailData);
                for (var index in trailData) {
                        
                               for (var review in trailData[index].reviews) { //itirate inside reviews
                           
                            var reviewText = trailData[index].reviews[
                                review].review;
                            var username = trailData[index].reviews[
                                review].username;
                            
                  
                               var profilePicture = trailData[index].reviews[
                                review].profilePicture;
                            
                            var rating = parseFloat(trailData[index].reviews[
                                review].rating);
                            var reviewsList = '<li>' +
                                '<div class="item-content">' +
                                ' <div class="item-media"><img src="' +
                                profilePicture + '" width="44" style="background-image: url('+randomBG()+')"></div>' +
                                ' <div class="item-inner">' +
                                '  <div class="item-title-row">' +
                                '<div class="item-title">' + username +
                                '</div>' +
                                ' <div class="item-after star"></div>' +
                                ' </div>' + '<div class="item">' +
                                reviewText + '</div>' + '</div>' +
                                '</div>' + ' </li>'
                            $$("#comment").append(reviewsList);
                            var divstar = document.createElement("span");
                            divstar.setAttribute("class", "class");
                            for (var i = 0; i < rating; i++) { //5 star rating
                                var y = document.createElement("i");
                                y.setAttribute("class", "fa fa-star");
                                divstar.appendChild(y);
                            }; //end for star rating
                            var empty = 5 - rating;
                            console.log(empty);
                            for (var i = 0; i < empty; i++) { //5 star rating
                                var x = document.createElement("i");
                                x.setAttribute("class", "fa fa-star-o");
                                divstar.appendChild(x);
                            }; //end for star rating
                            $$(".star").append(divstar);
                        }; //end for reviews loop
                        
                      /*  for (var link in trailData[index].pictures) { //itirate inside pictures links
                            data.push(trailData[index].pictures[link]); //passing images to photobrowser
                            var link = trailData[index].pictures[link].url;
                            var div = document.createElement("div");
                            div.setAttribute("class", "swiper-slide");
                            var pic = document.createElement("img");
                            pic.src = link;
                            pic.style.cssText =
                                "height: 9vh; border: 2px solid white; ";
                            //data.push(trailData[index].pictures[link]);
                            div.appendChild(pic);
                            pic.setAttribute("id", "gallery");
                            document.getElementById("wrapper").appendChild(
                                div);
                        }; //end for pictures loop*/
                                               
                        
                 
                    } //end for itirating trough trailData
                } //end for succes function in ajax
        }); //end for ajax in getimagesJSON
    } //end of getimagesJSON

myApp.onPageBeforeInit('trail', function(page) {
    
    imgs = [];
    
      //photobrowser finished 
    var trailName =$$("#trailName").text();
    var trailNameNStr = trailName.replace(/\s+/g, '')
    var hashtag = $$.toCamelCase(trailNameNStr);
    console.log(hashtag);
    
    
    
             (function(d, s, id) {
                                                        var js, fjs = d.getElementsByTagName(s)[0];
                                                        if (d.getElementById(id)) {
                                                            return;
                                                        }
                                                        js = d.createElement(s);
                                                        js.id = id;
                                                        js.src = "//connect.facebook.net/en_US/sdk.js";
                                                        fjs.parentNode.insertBefore(js, fjs);
                                                    }(document, 'script', 'facebook-jssdk'));

                                                       var feed = new Instafeed({
                                                            get: 'tagged',
                                                            tagName: hashtag,
                                                            clientId: '467ede5a6b9b48ae8e03f4e2582aeeb3',
                                                            limit: 25,
                                                            sortBy: 'random',
                                                      template: '<div class="swiper-slide"><img src={{image}} style="height: 9vh; border: 2px solid white;" class="gallery"/></div>',
                                                          success: function (data) {
            // read the feed data and create owr own data struture.
            var images = data.data;
            var result;
                                                              
            for (i = 0; i < images.length; i++) {
                var image = images[i];
                result = {
                        caption: image.user.username,
                        url: image.images.standard_resolution.url
                };
                    
                    imgs.push(result);
              
                          
            }
                      }
                                                       });
                                                        feed.run();
});

var imgs = []; //this array passes images to photobrowser


myApp.onPageAfterAnimation('trail', function(page) {
    //var trailId = document.getElementById("trailName").title;
    //getimagesJSON(trailId);
    var FIREFOX = /Firefox/i.test(navigator.userAgent); //do not allow users on Firefox to submit reviews
    if (FIREFOX) {
        console.log("me");
        document.getElementById("tt").style.display = 'none';
    }
    /*Pop photobrowser*/
    var myPB = myApp.photoBrowser({
        //pb options:
        photos: imgs,
        spaceBetween: 1,
        lazyLoading: true,
        type: 'popup' // 'popup' or 'page' or 'standalone'
    });
    $$('.swiper-slide').on('click', function() {
        var gv= $$(this).data("swiper-slide-index");
        console.log(gv);
       console.log(imgs);
         console.log(myPB);
        myPB.open(gv-1);
    });
  
    
                                                        
    /*Swiper*/
    var swiper = new Swiper('.swiper-container', {
        //pagination: '.swiper-pagination',
        slidesPerView: '5',
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true,
        loop: true
    }); //swiper finished
    /*Pop-up review*/
    /*Submit review*/
    $$('.create-popup').on('click', function() { //popup to submit review
        var trailName = document.getElementById("trailName").innerText;
        //to get name of a trail for a popup
        var trailId = document.getElementById("trailName").title;
        //if user in not registered, review can not be subbmitted
        if (myApp.template7Data.profile.username === "" ||
            sessionStorage.length < 1) {
            var popupHTML = '<div class="popup">' +
                '<div class="content-block"><p><href="#" class="close-popup">Close me</a>                  </p>' +
                '</div>' +
                '<div id="my-form" name="reviewForm" class="list-block">' +
                '<ul>' + '<li>' + '<div class="item-content">' +
                '<div class="item-inner">Hey there! Have something to share?</div>' +
                '</div>' + '</li>' + '<li>' +
                '<div class="item-content">' +
                '<div class="item-inner">Only registered users can contribute.</div>' +
                '</div>' + '</li>' + '<li>' +
                ' <div class="item-content">' +
                ' <div class="item-inner"><a class="open-login-screen close-popup" href="#" >Please, log in</a></div>' +
                '</li>'  + '<li>' +
                ' <div class="item-content">' +
                ' <div class="item-inner"><a href="signup.html" class="close-popup">Or create an account</a></div>' +
                '</li>' + '</ul>' + '</div>';
        } else { //if user in registered, submitt review
            var popupHTML = '<div class="popup">' +
                '<div class="content-block">' +
                '<p>Form to submit review</p>' + '<p><a id="' +
                trailId +
                '" href="#" class="close-popup">Close me</a></p>' +
                '</div>' +
                '<form id="my-form" name="reviewForm" class="list-block">' +
                '<ul>' + '<li>' + '<div class="item-content">' +
                '<div class="item-inner">' +
                '<div class="item-title label">Review for</div>' +
                ' <div class="item-input">' +
                ' <input type="text" id ="trailInput" name="name"   value="' +
                trailName + '">' + ' </div>' + '</div>' +
                '</li>' + '<li>' + '<div class="item-content">' +
                '<div class="item-inner">' +
                '<div class="item-title label">Trail review</div>' +
                ' <div class="item-input">' +
                ' <textarea type="text" name="review"  maxlength="140" id="review" onkeyup="validation()">' +
                '</textarea>' + ' </div>' + '</div>' + '</li>' +
                '<li>' + ' <div class="item-content">' +
                ' <div class="item-inner">' +
                '<div class="item-title label">Rating</div>' +
                ' <div class="item-input">' +
                '<span class="star-rating">' +
                '<input id="star-rating-5"  class="star-rating__input" type="radio" name="rating" value="5"><i></i>' +
                ' <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-5" title="5 out of 5 stars"></label>' +
                '<input id="star-rating-4"  class="star-rating__input" type="radio" name="rating" value="4"><i></i>' +
                '<label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-4" title="4 out of 5 stars"></label>' +
                '<input id="star-rating-3"  class="star-rating__input" type="radio" name="rating" value="3"><i></i>' +
                ' <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-3" title="3 out of 5 stars"></label>' +
                '<input id="star-rating-2"  class="star-rating__input" type="radio" name="rating" value="2"><i></i>' +
                ' <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-2" title="2 out of 5 stars"></label>' +
                '<input id="star-rating-1" class="star-rating__input" type="radio" name="rating" value="1"><i></i>' +
                ' <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-1" title="1 out of 5 stars"></label>' +
                '</span>' + ' </div>' + '</div>' + '</li>' +
                '</ul>' + '</form>' +
                '<div class="content-block">' +
                ' <a href="#" id="submit" class="button form-to-json disabled" onclick="send();">Submit Review</a>' +
                '<div class="item-content" id="rresponse">' +
                '</div>' + '</div>';
        }
        myApp.popup(popupHTML);
        data = [];
    }); //popup review finished
});




/*Google Maps code*/
myApp.onPageInit('maps', function(page) {
    var markersArray = [];

    function initialize() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(
                position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                map.setZoom(16); //zoom if geolocating is allowed
          var iconBase = 'assets/Marker_user@2x.png';      
         var marker = new google.maps.Marker({
                position: pos,
                animation: google.maps.Animation.DROP,
                map: map,
                 icon: iconBase,
                title: "you're here",
            });
                
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
        var styles = [{
            stylers: [{
      saturation: -80
    }]
  }, {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{
      hue: "#00ffee"
    }, {
      saturation: 50
    }]
  }, {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  }];

        var mapProp = {
            center: {
                lat: 49.2915434,
                lng: -122.79668420000002
            },
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById(
            'map-canvas'), mapProp);
        var y = document.getElementById('trailsAuto');
        var obj = myApp.template7Data.trails;
        for (var i = 0; i < obj.length; i++) {
            var lat = parseFloat(obj[i].latitude);
            var long = parseFloat(obj[i].longitude);
            var iconbase2 = 'assets/Marker@2x.png';
            //  console.log(lat, long);
            console.log(obj[i].name);
            var marker = new google.maps.Marker({
                position: {
                    lat: lat,
                    lng: long
                },
                animation: google.maps.Animation.DROP,
                map: map,
                title: obj[i].name,
                icon: iconbase2
            });
            marker.metadata = {
                type: "point",
                id: obj[i].id
            };
            buildInfoWindow(marker, map, obj[i]);
            markersArray.push(marker);
            $$('.dd').append('<option value="' + obj[i].name +
                '"/>'); //autocomplete
        };

        function buildInfoWindow(marker, map, locations) {
                //trailNames.push(obj[i].name.toLowerCase());
                var contentString = '<div id="content">' +
                    '<div id="siteNotice">' + '</div>' +
                    '<h2 id="firstHeading" class="firstHeading">' +
                    obj[i].name + '</h2>' +
                    '<div id="bodyContent">' + obj[i].desc +
                    '</div>' + '<div id ="' + obj[i].avRating +
                    '">' + '<div id="rating">' +
                    '<p> The trail has <b>  ' + parseFloat(obj[i].avRating) +
                    '</b> out of 5 star rating</p></div>' +
                    '<a href="singleTrail.html" data-context-name="trails.' +
                    (parseInt(obj[i].id) - 1) +
                    '" onclick= "getimagesJSON(this.id)" id="' +
                    obj[i].id + '">More Trail Information</a>' +
                    '</div>';
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 200,
                    opacity: 0.75,
                });
                google.maps.event.addListener(infowindow,
                    'closeclick', function() {
                        map.setZoom(10);
                    });
                google.maps.event.addListener(marker, 'click',
                    function() { //when infowondow is opened
                        infowindow.open(map, marker);
                        console.log(marker);
                        map.panTo(marker.getPosition());
                    });
                var searchbar = document.getElementById("searchbar");
                searchbar.onkeyup = function() {
                    for (var i = 0; i < obj.length; i++) {
                        var x;
                        if (searchbar.value.toLowerCase() ==
                            obj[i].name.toLowerCase()) {
                            console.log("true");
                            x = obj[i].id - 1;
                            console.log(x);
                            //  map.panTo(.getPosition());
                            map.setZoom(14);
                            map.setCenter(markersArray[x].getPosition());
                            return;
                        }
                    };
                };
            } //end
        map.setOptions({
            styles: styles
        });
    }
    initialize();
});
myApp.onPageInit('profile', function(page) {
    if (myApp.template7Data.profile.username === "" || sessionStorage.length <
        0) {
        //document.body.innerHTML = ("Log In");
        $$(".user-card").remove();
        $$(".yh").html(
            "<div class='.col-100' style=' text-align: center'>Ready to create an account?<p><a href='signup.html' class='open-signup-screen close-login-screen'>Let's get started!</a></p></div> "
        );
    }
    
      var userId = $$(".pic").attr('id');
    
        console.log(userId);
          getComments();
       function getComments() {
           $$.ajax({
            url: "./model/server.php",
            dataType: "json",
            data: {
                mode: 7,
                id: userId
            },
            type: "POST",
            dataType: "json",
            success: function(total) {
                var profile = myApp.template7Data
                        .profile;
                 console.log(total);
                 profile.reviewsnum = total[0].total;
                console.log(profile);
                    $$('.badge').html(total[0].total);
                } //end for succes function in ajax
        }); //end for ajax in getimagesJSON
    } //end of getcommentJSON
});
window.fbAsyncInit = function() {
    FB.init({
        appId: '1501994180128237',
        xfbml: true,
        version: 'v2.5'
    });
    //When button is clicked, we login to Facebook
    $$('#fbLogin').on('click', function() {
        FB.getLoginStatus(function(resp) {
            console.log(resp);
            $$.ajax({
                url: "./model/facebook.php",
                type: "post",
                dataType: "json",
                data: {
                    mode: 2,
                    fbid: resp.authResponse.userID
                },
                success: function(resp2) {
                    console.log(resp2);
                    var profile = myApp.template7Data
                        .profile;
                    profile.username = resp2[0]
                        .username;
                    profile.profilePicture =
                        resp2[0].profilePicture;
                    
                     profile.id=
                        resp2[0].id;
                    
                    sessionStorage.username =
                        resp2[0].username;
                  
                    $$("#response").html(
                        "You're logged in with Facebook"
                    );
                    mainView.router.loadPage(
                        'contacts.html');
                    setTimeout(function() {
                        myApp.closeModal(
                            ".login-screen"
                        );
                        $$("#response")
                            .html("");
                    }, 1000);
                    if (sessionStorage.length >
                        0) { //add user's profile on nav bar
                        //document.body.innerHTML = ("Log In");
                        $$(".u-img").html(
                            "<h3 style='color:#fff;'> &nbsp; Welcome, " +
                        profile.username +
                        "</h3><img class='circular'src=" +
                        profile.profilePicture +
                              " style='height:75px; width:75px; margin:auto; margin-top:-15px; margin-left: 20px;'/>"
                        );
                        $$(".sign-out").html(
                            "<a href='allTrails.html' onclick='signOut()' class='sign-out item-link item-content panel-close' data-context-name='trails''><div class='item-inner'>Sign Out</div></a>"
                        );
                        //changes     
                        $$(".proft").html(
                            '<a href="projects.html" data-context-name="profile" class="item-link item-content"><img src="assets/Profile@2x.png" style="width: 52px;"></i></a>'
                        );
                        $$(".profy").html(
                            '<a href="projects.html" data-context-name="profile" class="item-link item-content panel-close"><div class="item-inner">Profile</div></a>'
                        );
                    };
                }
            });
        });
        FB.login(function(resp) {
            if (resp.status == "connected") {
                // If we are connected to Facebook
                FB.api("/me?fields=name,email,picture.type(large)",
                    function(resp2) {
                        var email = "default@email.com"
                            //make sure the email exists
                        if (resp2.email != null) {
                            var email = resp2.email;
                        }
                        var name = resp2.name;
                        var img = resp2.picture.data.url;
                        var fbid = resp2.id;
                        //ajax all the information into the server
                        $$.ajax({
                            url: "facebook.php",
                            type: "post",
                            dataType: "json",
                            data: {
                                email: email,
                                name: name,
                                img: img,
                                fbid: fbid,
                                mode: 1
                            },
                            success: function(
                                resp) {
                                var profile =
                                    myApp.template7Data
                                    .profile;
                                profile.username =
                                    resp[0]
                                    .username;
                                profile.profilePicture =
                                    resp[0]
                                    .profilePicture;
                                sessionStorage
                                    .username =
                                    resp[0]
                                    .username;
                                console.log(
                                    sessionStorage
                                    .username
                                );
                                $$(
                                    "#response"
                                ).html(
                                    "You're logged in with Facebook"
                                );
                                mainView.router
                                    .loadPage(
                                        'allTrails.html'
                                    );
                                setTimeout(
                                    function() {
                                        myApp
                                            .closeModal(
                                                ".login-screen"
                                            );
                                        $$
                                            (
                                                "#response"
                                            )
                                            .html(
                                                ""
                                            );
                                    },
                                    3000
                                );
                                if (
                                    sessionStorage
                                    .length >
                                    0) { //add user's profile on nav bar
                                    //document.body.innerHTML = ("Log In");
                                    $$(
                                        ".u-img"
                                    ).html(
                                        "<div class='item-inner' color='white'> HELLO " +
                                        profile
                                        .username +
                                        "!</div><div class='item-inner'><img class='item-inner'  src=" +
                                        profile
                                        .profilePicture +
                                        " height='200px' width='auto'/></div>"
                                    );
                                    $$(
                                        ".sign-out"
                                    ).html(
                                        "<a href='allTrails.html' onclick='signOut()' class='sign-out item-link item-content panel-close' data-context-name='trails''><div class='item-inner'>Sign Out</div></a>"
                                    );
                                    //changes     
                                    $$(
                                        ".proft"
                                    ).html(
                                        '<a href="projects.html" data-context-name="profile" class="item-link item-content"><img src="assets/Profile@2x.png" style="width: 52px;"></i></a>'
                                    );
                                    $$(
                                        ".profy"
                                    ).html(
                                        '<a href="projects.html" data-context-name="profile" class="item-link item-content panel-close"><div class="item-inner">Profile</div></a>'
                                    );
                                };
                            }
                        });
                    });
            }
        });
    });
};



(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

myApp.onPageInit('signup-screen', function(page) { 
$$('#form').on('click', function (e) {
    validateUser();
});
var validateUser = function(){
    
     var fname = document.forms["user-form"]["fname"].value;
    if (fname == null || fname == "") {
        $$("#rrresponse").html(
                    "Please Enter First Name"
                );
        return false;
    }
    var lname = document.forms["user-form"]["lname"].value;
    if (lname == null || lname == "") {
        $$("#rrresponse").html(
                    "Please Enter Last Name"
                );
        return false;
    }
    
    var username = document.forms["user-form"]["username"].value;
    if (username == null || username == "") {
        $$("#rrresponse").html(
                    "Please Choose Username"
                );
        return false;
    }
    
    
    var pass = document.forms["user-form"]["password"].value;
    if (pass == null || pass == "") {
        $$("#rrresponse").html(
                    "Please Choose Password with 6 to 20 Characters"
                );
        return false;
    }
    
    var email = document.forms["user-form"]["email"].value;
    if (email == null || email == "") {
        $$("#rrresponse").html(
                    "Please Enter Email"
                );
        return false;
    }
      if (email !== null || email !== "" && fname !== null || fname !== "" && lname !== null || lname !== "" && username !== null || username !== "" && pass !== null || pass !== ""){
      
      
    	$$('#form').addClass('close-signup-screen');
    	$$('#form').addClass('open-login-screen');
    	newUser();
    	
    	
    }
      
      };
    

  
});

myApp.onPageInit('trails', function(page) 
          {
    
    


$$(".filter-open").on('click', function (){
    
    $$('.fa-chevron-down').toggleClass("rotate");
  
    $$(".filter").toggleClass("hidden");

});

    
    
$$('input[type="checkbox"]').on('keyup keydown change', function (e) {  
         var notFriendly = $$('.card').filter(function(index, el) {
        return $$(this).hasClass('0');
            
           
});  
    if($$('#dogF').is(":checked")){  
   
  
        
       $$(notFriendly).hide();
        
   

    }else{
        $$(notFriendly).show();
    
    }
 
     });
    
   //distance
 
                         
    
    var pickerCustomToolbar = myApp.picker({
    input: '#picker-custom-toolbar',
    rotateEffect: true,
    toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left">' +
                   
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link done close-picker">Search</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
      
   
        {   textAlign: 'left',
            values: ['Easy', 'Intermediate', 'Difficult']
        }
    ],
    onChange: function (picker) {
        
        picker.container.find('.done').on('click', function () {
            console.log(pickerCustomToolbar.displayValue);
           
            var difficulty = pickerCustomToolbar.displayValue[0];
         
            console.log(difficulty);
                      
            var customDifficulty =  
            $$('.card').filter(function(index, el) {
        return $$(this).hasClass(difficulty);
               
}); 
             console.log(customDifficulty);
  
            if(customDifficulty){
                    $$(".card").hide();
                    $$(customDifficulty).show();
            }
       
    if($$('#dogF').is(":checked")){  
   
  var notFriendly = $$('.card').filter(function(index, el) {
        return $$(this).hasClass('0');
            
           
});  
        
       $$(notFriendly).hide();
        
   

    }else{
        $$(notFriendly).show();
    
    }
            
            
    });
        

        
    
    }
});
    
    

});

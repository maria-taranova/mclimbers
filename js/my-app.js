
function gettrailJSON() {
    $$.ajax({
        url: "./model/server.php",
        dataType: "json",
        data: {
            mode: 0
        },
        type: "post",
        success: function(e) {
            var t = 0;
            for (var a in e) t++;
            for (var a in e) e[a].dogFriendly = parseInt(e[a].dogFriendly), e[a].bears = parseInt(e[a].bears), myApp.template7Data.trails.push(e[a]);
            $$("#trailjson").html("<h4>" + t + " trails are in our database</h4>")
        }
    })
}

function getComments(e) {
    var e = e;
    $$.ajax({
        url: "./model/server.php",
        dataType: "json",
        data: {
            mode: 9,
            id: e
        },
        type: "POST",
        dataType: "json",
        success: function(e) {
            for (var t in e) $$("#user-comments").append("<li  class='swipeout'> <div class='swipeout-content'> <a href='#' class='item-content item-link' style='color: black'><div class='item-inner'><div class='item-title-row'><div class='item-title'>" + e[t].name + "</div><div class='item-text'>" + e[t].reviewText + "</div></div></div></a></div><div class='swipeout-actions-right'><a href='./partials/singleTrail.html' data-context-name='trails." + (e[t].trailid - 1) + "' id='" + parseInt(e[t].trailid) + "' class='mark'>View trail</a><a href='#' id='" + parseInt(e[t].id) + "' class='swipeout-delete remove'>Delete</a></div></li>")
        }
    })
}

function getimagesJSON(e) {
    var e = e;
    $$.ajax({
        url: "./model/server.php",
        dataType: "json",
        data: {
            mode: 1,
            term: e
        },
        type: "POST",
        dataType: "json",
        success: function(e) {
            for (var t in e)
                for (var a in e[t].reviews) {
                    var i = e[t].reviews[a].review,
                        n = e[t].reviews[a].username,
                        s = e[t].reviews[a].profilePicture,
                        r = parseFloat(e[t].reviews[a].rating),
                        o = '<li><div class="item-content"> <div class="item-media"><img src="' + s + '" width="44" style="background-image: url(' + randomBG() + ')"></div> <div class="item-inner">  <div class="item-title-row"><div class="item-title">' + n + '</div> <div class="item-after star"></div> </div><div class="item">' + i + "</div></div></div> </li>";
                    $$("#comment").append(o);
                    var l = document.createElement("span");
                    l.setAttribute("class", "class");
                    for (var c = 0; r > c; c++) {
                        var m = document.createElement("i");
                        m.setAttribute("class", "fa fa-star"), l.appendChild(m)
                    }
                    for (var p = 5 - r, c = 0; p > c; c++) {
                        var d = document.createElement("i");
                        d.setAttribute("class", "fa fa-star-o"), l.appendChild(d)
                    }
                    $$(".star").append(l)
                }
        }
    })
}
var $$ = Dom7,
    myApp = new Framework7({
        animateNavBackIcon: !0,
        precompileTemplates: !0,
        swipePanel: "left",
        cache: !0,
        domCache: !0,
        cacheIgnore: ["./partials/singleTrail.html", "./partials/projects.html"],
        modalTitle: "Mountain Climbers",
        template7Pages: !0,
        template7Data: {
            profile: {
                id: "",
                username: "",
                region: "",
                profilePicture: "assets/Profile_pic-01.png",
                fname: "",
                lname: "",
                reviewsnum: ""
            },
            "page:maps": {},
            trails: []
        }
    }),
    signOut = function() {
        var e = {
            logout: "true"
        };
        $$.ajax({
            url: "./model/logout-session.php",
            type: "POST",
            dataType: "JSON",
            data: e,
            success: function(e) {
                sessionStorage.clear(), myApp.template7Data.profile = {}, $$(".u-img").html("You're Logged Out."), $$(".sign-out").html('<span class="sign-out"> <a href="#" class="open-login-screen sign-out item-link item-content panel-close"><div class="item-inner"> Log In  </div></a></span>'), $$(".proft").html(""), $$(".profy").html(""), setTimeout(function() {
                    $$(".u-img").html("")
                }, 2e3)
            }
        })
    },
    signIn = function() {
        var e = myApp.formToJSON("#user-signin");
        $$.ajax({
            url: "./model/login-session.php",
            type: "POST",
            dataType: "JSON",
            data: {
                userData: e
            },
            success: function(e) {
                var t = JSON.parse(e),
                    a = t.status;
                if ("success" == a) {
                    var i = myApp.template7Data.profile;
                    i.id = t.userinfo.id, i.username = t.userinfo.username, i.region = t.userinfo.region, t.userinfo.profilePicture > 0 && (i.profilePicture = t.userinfo.profilePicture), i.lname = t.userinfo.lname, i.fname = t.userinfo.fname, i.reviewsnum = t.userinfo.reviewsnum, sessionStorage.username = t.userinfo.username, $$("#response").html("Cool, redirecting to main screen"), setTimeout(function() {
                        myApp.closeModal(".login-screen")
                    }, 1e3), mainView.router.loadPage("./partials/allTrails.html"), $$("#response").html(""), sessionStorage.length > 0 && ($$(".u-img").html("<h3 style='color:#fff; padding:30px 0 0 15px;'> &nbsp; Welcome, @" + i.username + "</h3><img class='circular'src=" + i.profilePicture + " style='height:75px; width:75px; margin:auto; margin-top:-15px; margin-left: 20px;'/>"), $$(".sign-out").html("<a href='./partials/allTrails.html' onclick='signOut()' class='sign-out item-link item-content panel-close' data-context-name='trails''><div class='item-inner'>Sign Out</div></a>"), $$(".proft").html('<a href="./partials/projects.html" data-context-name="profile" class="item-link item-content"><img src="assets/Profile@2x.png" style="width: 52px;"></i></a>'), $$(".profy").html('<a href="./partials/projects.html" data-context-name="profile" class="item-link item-content panel-close"><div class="item-inner">Profile</div></a>'))
                } else $$("#response").html("Something wrong with username or password")
            },
            error: function(e, t, a) {}
        })
    },
    newUser = function() {
        var e = myApp.formToJSON("#user-form");
        $$.ajax({
            url: "./model/user.php",
            dataType: "json",
            data: {
                mode: 12,
                userData: e
            },
            type: "post",
            complete: function(e) {}
        })
    },
    mainView = myApp.addView(".view-main", {
        dynamicNavbar: !0
    });
gettrailJSON();
var validation = function() {
        var e = document.getElementById("submit");
        e.setAttribute("class", "button form-to-json")
    },
    send = function() {
        var e = document.forms.reviewForm.name.value,
            t = document.forms.reviewForm.review.value,
            a = $$(".popup").find('input[name="rating"]:checked').val();
        if (null == a || "" == a) null == e || "" == e ? $$("#rresponse").html("Please, fill in Trail Name") : null == t || "" == t ? $$("#rresponse").html("Please, add your review") : (null == a || "" == a) && $$("#rresponse").html("Please, add star rating");
        else {
            var i = myApp.formToJSON("#my-form");
            $$.ajax({
                url: "./model/server.php",
                dataType: "json",
                data: {
                    mode: 1,
                    userID: myApp.template7Data.profile.id,
                    newReview: i
                },
                type: "post",
                complete: function(e) {
                    document.getElementById("rresponse").innerHTML = "Thanks, your review is submitted", document.getElementById("comment").innerHTML = "", setTimeout(function() {
                        myApp.closeModal(".popup")
                    }, 1e3);
                    var t = document.getElementById("trailName").title;
                    getimagesJSON(t)
                }
            })
        }
    };
myApp.onPageAfterAnimation("comments", function(e) {
    $$(".mark").on("click", function() {
        var e = this.id;
        getimagesJSON(e)
    }), $$(".remove").on("click", function() {
        var e = this.id;
        $$.ajax({
            url: "./model/server.php",
            dataType: "json",
            data: {
                mode: 8,
                id: e
            },
            type: "POST",
            dataType: "json",
            success: function(e) {}
        })
    })
});
var ranImage = ["http://backgrounds.funmunch.com/background/pattern_background_a4.gif", "http://www.uisdc.com/wp-content/uploads/2013/09/11-Squares_t2.jpg", "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRybqpa6ux8ZhDB_eBWlTo5EbMbze5rbmjjGh_3Xp1LnsGr5zSHMQ"],
    rand = function() {
        return Math.floor(Math.random() * ranImage.length)
    },
    randomBG = function() {
        var e = ranImage[rand()];
        return e
    };
myApp.onPageBeforeInit("trail", function(e) {
    imgs = [];
    var t = $$("#trailName").text(),
        a = t.replace(/\s+/g, ""),
        n = $$.toCamelCase(a);
    ! function(e, t, a) {
        var i, n = e.getElementsByTagName(t)[0];
        e.getElementById(a) || (i = e.createElement(t), i.id = a, i.src = "//connect.facebook.net/en_US/sdk.js", n.parentNode.insertBefore(i, n))
    }(document, "script", "facebook-jssdk");
    var s = new Instafeed({
        get: "tagged",
        tagName: n,
        clientId: "467ede5a6b9b48ae8e03f4e2582aeeb3",
        limit: 25,
        sortBy: "random",
        template: '<div class="swiper-slide"><img src={{image}} style="height: 9vh; border: 2px solid white;" class="gallery"/></div>',
        success: function(e) {
            var t, a = e.data;
            for (i = 0; i < a.length; i++) {
                var n = a[i];
                t = {
                    caption: n.user.username,
                    url: n.images.standard_resolution.url
                }, imgs.push(t)
            }
        }
    });
    s.run()
});
var imgs = [];
myApp.onPageAfterAnimation("trail", function(e) {
        var t = /Firefox/i.test(navigator.userAgent);
        t && (document.getElementById("tt").style.display = "none");
        var a = myApp.photoBrowser({
            photos: imgs,
            spaceBetween: 1,
            lazyLoading: !0,
            type: "popup"
        });
        $$(".swiper-slide").on("click", function() {
            var e = $$(this).data("swiper-slide-index");
            a.open(e - 1)
        });
        new Swiper(".swiper-container", {
            slidesPerView: "5",
            paginationClickable: !0,
            spaceBetween: 0,
            freeMode: !0,
            loop: !0
        });
        $$(".create-popup").on("click", function() {
            var e = document.getElementById("trailName").innerText,
                t = document.getElementById("trailName").title;
            if ("" === myApp.template7Data.profile.username || sessionStorage.length < 1) var a = '<div class="popup"><div class="content-block"><p><href="#" class="close-popup">Close me</a>                  </p></div><div id="my-form" name="reviewForm" class="list-block"><ul><li><div class="item-content"><div class="item-inner">Hey there! Have something to share?</div></div></li><li><div class="item-content"><div class="item-inner">Only registered users can contribute.</div></div></li><li> <div class="item-content"> <div class="item-inner"><a class="open-login-screen close-popup" href="#" >Please, log in</a></div></li><li> <div class="item-content"> <div class="item-inner"><a href="./partials/signup.html" class="close-popup">Or create an account</a></div></li></ul></div>';
            else var a = '<div class="popup"><div class="content-block"><p>Form to submit review</p><p><a id="' + t + '" href="#" class="close-popup">Close me</a></p></div><form id="my-form" name="reviewForm" class="list-block"><ul><li><div class="item-content"><div class="item-inner"><div class="item-title label">Review for</div> <div class="item-input"> <input type="text" id ="trailInput" name="name"   value="' + e + '"> </div></div></li><li><div class="item-content"><div class="item-inner"><div class="item-title label">Trail review</div> <div class="item-input"> <textarea type="text" name="review"  maxlength="140" id="review" onkeyup="validation()"></textarea> </div></div></li><li> <div class="item-content"> <div class="item-inner"><div class="item-title label">Rating</div> <div class="item-input"><span class="star-rating"><input id="star-rating-5"  class="star-rating__input" type="radio" name="rating" value="5"><i></i> <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-5" title="5 out of 5 stars"></label><input id="star-rating-4"  class="star-rating__input" type="radio" name="rating" value="4"><i></i><label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-4" title="4 out of 5 stars"></label><input id="star-rating-3"  class="star-rating__input" type="radio" name="rating" value="3"><i></i> <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-3" title="3 out of 5 stars"></label><input id="star-rating-2"  class="star-rating__input" type="radio" name="rating" value="2"><i></i> <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-2" title="2 out of 5 stars"></label><input id="star-rating-1" class="star-rating__input" type="radio" name="rating" value="1"><i></i> <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-1" title="1 out of 5 stars"></label></span> </div></div></li></ul></form><div class="content-block"> <a href="#" id="submit" class="button form-to-json disabled" onclick="send();">Submit Review</a><div class="item-content" id="rresponse"></div></div>';
            myApp.popup(a), data = []
        })
    }), myApp.onPageInit("maps", function(e) {
        function t() {
            function e(e, t, i) {
                var n = '<div id="content"><div id="siteNotice"></div><h2 id="firstHeading" class="firstHeading">' + s[r].name + '</h2><div id="bodyContent">' + s[r].desc + '</div><div id ="' + s[r].avRating + '"><div id="rating"><p> The trail has <b>  ' + parseFloat(s[r].avRating) + '</b> out of 5 star rating</p></div><a href="./partials/singleTrail.html" data-context-name="trails.' + (parseInt(s[r].id) - 1) + '" onclick= "getimagesJSON(this.id)" id="' + s[r].id + '">More Trail Information</a></div>',
                    o = new google.maps.InfoWindow({
                        content: n,
                        maxWidth: 200,
                        opacity: .75
                    });
                google.maps.event.addListener(o, "closeclick", function() {
                    t.setZoom(10)
                }), google.maps.event.addListener(e, "click", function() {
                    o.open(t, e), t.panTo(e.getPosition())
                });
                var l = document.getElementById("searchbar");
                l.onkeyup = function() {
                    for (var e = 0; e < s.length; e++) {
                        var i;
                        if (l.value.toLowerCase() == s[e].name.toLowerCase()) return i = s[e].id - 1, t.setZoom(14), void t.setCenter(a[i].getPosition())
                    }
                }
            }
            navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(e) {
                var t = {
                    lat: e.coords.latitude,
                    lng: e.coords.longitude
                };
                n.setCenter(t), n.setZoom(16);
                var a = "assets/Marker_user@2x.png";
                new google.maps.Marker({
                    position: t,
                    animation: google.maps.Animation.DROP,
                    map: n,
                    icon: a,
                    title: "you're here"
                })
            }, function() {
                handleLocationError(!0, infoWindow, n.getCenter())
            }) : handleLocationError(!1, infoWindow, n.getCenter());
            for (var t = [{
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
                }], i = {
                    center: {
                        lat: 49.2915434,
                        lng: -122.79668420000002
                    },
                    zoom: 9,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }, n = new google.maps.Map(document.getElementById("map-canvas"), i), s = (document.getElementById("trailsAuto"), myApp.template7Data.trails), r = 0; r < s.length; r++) {
                var o = parseFloat(s[r].latitude),
                    l = parseFloat(s[r].longitude),
                    c = "assets/Marker@2x.png",
                    m = new google.maps.Marker({
                        position: {
                            lat: o,
                            lng: l
                        },
                        animation: google.maps.Animation.DROP,
                        map: n,
                        title: s[r].name,
                        icon: c
                    });
                m.metadata = {
                    type: "point",
                    id: s[r].id
                }, e(m, n, s[r]), a.push(m), $$(".dd").append('<option value="' + s[r].name + '"/>')
            }
            n.setOptions({
                styles: t
            })
        }
        var a = [];
        t()
    }), myApp.onPageInit("profile", function(e) {
        function t() {
            $$.ajax({
                url: "./model/server.php",
                dataType: "json",
                data: {
                    mode: 7,
                    id: a
                },
                type: "POST",
                dataType: "json",
                success: function(e) {
                    var t = myApp.template7Data.profile;
                    t.reviewsnum = e[0].total, $$(".badge").html(e[0].total)
                }
            })
        }("" === myApp.template7Data.profile.username || sessionStorage.length < 0) && ($$(".user-card").remove(), $$(".yh").html("<div class='.col-100' style=' text-align: center'>Ready to create an account?<p><a href='./partials/signup.html' class='open-signup-screen close-login-screen'>Let's get started!</a></p></div> "));
        var a = $$(".pic").attr("id");
        t()
    }), window.fbAsyncInit = function() {
        FB.init({
            appId: "1501994180128237",
            xfbml: !0,
            version: "v2.5"
        }), $$("#fbLogin").on("click", function() {
            FB.getLoginStatus(function(e) {
                $$.ajax({
                    url: "./model/facebook.php",
                    type: "post",
                    dataType: "json",
                    data: {
                        mode: 2,
                        fbid: e.authResponse.userID
                    },
                    success: function(e) {
                        var t = myApp.template7Data.profile;
                        t.username = e[0].username, t.profilePicture = e[0].profilePicture, t.id = e[0].id, sessionStorage.username = e[0].username, $$("#response").html("You're logged in with Facebook"), mainView.router.loadPage("./partials/contacts.html"), setTimeout(function() {
                            myApp.closeModal(".login-screen"), $$("#response").html("")
                        }, 1e3), sessionStorage.length > 0 && ($$(".u-img").html("<h3 style='color:#fff;'> &nbsp; Welcome, " + t.username + "</h3><img class='circular'src=" + t.profilePicture + " style='height:75px; width:75px; margin:auto; margin-top:-15px; margin-left: 20px;'/>"), $$(".sign-out").html("<a href='./partials/allTrails.html' onclick='signOut()' class='sign-out item-link item-content panel-close' data-context-name='trails''><div class='item-inner'>Sign Out</div></a>"), $$(".proft").html('<a href="./partials/projects.html" data-context-name="profile" class="item-link item-content"><img src="assets/Profile@2x.png" style="width: 52px;"></i></a>'), $$(".profy").html('<a href="./partials/projects.html" data-context-name="profile" class="item-link item-content panel-close"><div class="item-inner">Profile</div></a>'))
                    }
                })
            }), FB.login(function(e) {
                "connected" == e.status && FB.api("/me?fields=name,email,picture.type(large)", function(e) {
                    var t = "default@email.com";
                    if (null != e.email) var t = e.email;
                    var a = e.name,
                        i = e.picture.data.url,
                        n = e.id;
                    $$.ajax({
                        url: "./model/facebook.php",
                        type: "post",
                        dataType: "json",
                        data: {
                            email: t,
                            name: a,
                            img: i,
                            fbid: n,
                            mode: 1
                        },
                        success: function(e) {
                            var t = myApp.template7Data.profile;
                            t.username = e[0].username, t.profilePicture = e[0].profilePicture, sessionStorage.username = e[0].username, $$("#response").html("You're logged in with Facebook"), mainView.router.loadPage("./partials/allTrails.html"), setTimeout(function() {
                                myApp.closeModal(".login-screen"), $$("#response").html("")
                            }, 3e3), sessionStorage.length > 0 && ($$(".u-img").html("<div class='item-inner' color='white'> HELLO " + t.username + "!</div><div class='item-inner'><img class='item-inner'  src=" + t.profilePicture + " height='200px' width='auto'/></div>"), $$(".sign-out").html("<a href='./partials/allTrails.html' onclick='signOut()' class='sign-out item-link item-content panel-close' data-context-name='trails''><div class='item-inner'>Sign Out</div></a>"), $$(".proft").html('<a href="./partials/projects.html" data-context-name="profile" class="item-link item-content"><img src="assets/Profile@2x.png" style="width: 52px;"></i></a>'), $$(".profy").html('<a href="./partials/projects.html" data-context-name="profile" class="item-link item-content panel-close"><div class="item-inner">Profile</div></a>'))
                        }
                    })
                })
            })
        })
    },
    function(e, t, a) {
        var i, n = e.getElementsByTagName(t)[0];
        e.getElementById(a) || (i = e.createElement(t), i.id = a, i.src = "//connect.facebook.net/en_US/sdk.js", n.parentNode.insertBefore(i, n))
    }(document, "script", "facebook-jssdk"), myApp.onPageInit("signup-screen", function(e) {
        $$("#form").on("click", function(e) {
            t()
        });
        var t = function() {
            var e = document.forms["user-form"].fname.value;
            if (null == e || "" == e) return $$("#rrresponse").html("Please Enter First Name"), !1;
            var t = document.forms["user-form"].lname.value;
            if (null == t || "" == t) return $$("#rrresponse").html("Please Enter Last Name"), !1;
            var a = document.forms["user-form"].username.value;
            if (null == a || "" == a) return $$("#rrresponse").html("Please Choose Username"), !1;
            var i = document.forms["user-form"].password.value;
            if (null == i || "" == i) return $$("#rrresponse").html("Please Choose Password with 6 to 20 Characters"), !1;
            var n = document.forms["user-form"].email.value;
            return null == n || "" == n ? ($$("#rrresponse").html("Please Enter Email"), !1) : void((null !== n || "" !== n && null !== e || "" !== e && null !== t || "" !== t && null !== a || "" !== a && null !== i || "" !== i) && ($$("#form").addClass("close-signup-screen"), $$("#form").addClass("open-login-screen"), newUser()))
        }
    }), myApp.onPageInit("trails", function(e) {
        $$(".filter-open").on("click", function() {
            $$(".fa-chevron-down").toggleClass("rotate"), $$(".filter").toggleClass("hidden")
        }), $$('input[type="checkbox"]').on("keyup keydown change", function(e) {
            var t = $$(".card").filter(function(e, t) {
                return $$(this).hasClass("0")
            });
            $$("#dogF").is(":checked") ? $$(t).hide() : $$(t).show()
        });
        var t = myApp.picker({
            input: "#picker-custom-toolbar",
            rotateEffect: !0,
            toolbarTemplate: '<div class="toolbar"><div class="toolbar-inner"><div class="left"></div><div class="right"><a href="#" class="link done close-picker">Search</a></div></div></div>',
            cols: [{
                textAlign: "left",
                values: ["Easy", "Intermediate", "Difficult"]
            }],
            onChange: function(e) {
                e.container.find(".done").on("click", function() {
                    var e = t.displayValue[0],
                        a = $$(".card").filter(function(t, a) {
                            return $$(this).hasClass(e)
                        });
                    if (a && ($$(".card").hide(), $$(a).show()), $$("#dogF").is(":checked")) {
                        var i = $$(".card").filter(function(e, t) {
                            return $$(this).hasClass("0")
                        });
                        $$(i).hide()
                    } else $$(i).show()
                })
            }
        })
    });
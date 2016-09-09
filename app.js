var app = angular.module("myapp",["ngRoute","ngMaterial","firebase"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })
    .when("/contact", {
        templateUrl : "contact.html"
    })
    .when("/register", {
        templateUrl : "register.html"
    })
    .when("/tutoring", {
        templateUrl : "tutoring.html"
    })
    .when("/software", {
        templateUrl : "software_solution.html"
    });
    
});

app.controller("headerCtrl",function($scope){
    $scope.selected=0;
   $scope.highlight = function(id){
     $scope.selected=id;   
   } 
});

app.controller("registerCtrl",function($scope,$firebaseObject,$firebaseAuth){
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      $scope.autherror = false;
     
      // The signed-in user info.
      var user = result.user;
      console.log("auth token -- "+user.email); 
      firebase.database().ref('users/').push({
        username: "name1",
        email: "email1",
        profile_picture : "imageUrl1"
      });

    }).catch(function(error) { 
         var errorCode = error.code;
         $scope.autherror = true;
         var errorMessage = error.message;
         console.log("error--- "+errorMessage);
         var email = error.email;
         var credential = error.credential;
    });
 
});
app.controller("courseCtrl",function($scope,$http,$mdSidenav){
   var courses;
   $scope.selected=0;
   $http.get('data/courses.json').then(function(response) {
           courses = response.data.courses;
           $scope.courseList = courses;
           $scope.description= courses[0].description;
           $scope.currentTopic = courses[0].topics;
           console.log(response.data.courses.length)
    });
    
    $scope.getTopics = function(id){
        $scope.selected = id;
        $scope.description= courses[id].description;
        $scope.currentTopic = courses[id].topics;
    }
    $scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };
   
});
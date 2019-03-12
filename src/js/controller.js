var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope) {
  $scope.records = [
    "Alfreds Futterkiste",
    "Berglunds snabbköp",
    "Centro comercial Moctezuma",
    "Ernst Handel",
  ]
    $scope.images = [{
        link: "img/tm-img-01.jpg",
        title: "Image One",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },{
        link: "img/tm-img-02.jpg",
        title: "Image two",
        description: "Maecenas purus sem, lobortis id odio in sapien."
    },{
        link: "img/tm-img-03.jpg",
        title: "Image Three",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },{
        link: "img/tm-img-04.jpg",
        title: "Image Four",
        description: "Maecenas purus sem, lobortis id odio in sapien."
    }];
    

});
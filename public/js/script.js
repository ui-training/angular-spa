var myApp = angular.module("angular-example", []);
myApp.config(["trainingProvider", function(trainingProvider){
    trainingProvider.counter = 10;
}]);

myApp.factory("mathFactory", function(){
    return {
        square: function(number){
            return number * number;
        },
        cube:  function(number){
            return number * number * number;
        }
    }
});

myApp.service("myService", function(){
    this.name = "Service";
    return this;
});

myApp.provider("training", function(){
    this.counter = 1;
    this.$get = function(){
        return {
            counter: this.counter
        };
    }
});

myApp.controller("MainCtrl", ["$scope", "$location", "$http", "mathFactory", "myService", "training",
    function ($scope, $location, $http, mathFactory, myService, training) {
        $scope = angular.extend($scope, {
            serviceName: myService.name,
            counter: training.counter,
            square: mathFactory.square(10),
            date: new Date(),
            age: 41,
            list: [
                {
                    name: "Hari",
                    state: "New York",
                    age: 23
                },
                {
                    name: "Srinivas",
                    state: "Texas",
                    age: 23
                },
                {
                    name: "Pradeep",
                    state: "Texas",
                    age: 26
                }
            ],
            training:{
                name: "AngularJS",
                class: "Services, filters",
                time: 60
            }
        });

}]);

myApp.filter("ageGroup", function(){
    return function(item, defaultVal){
        if(item < 20 && item > 12) {
            return "Teenage";
        }
        if(item >= 20 && item < 30){
            return "Youth";
        }
        if(item >= 30 && item < 40){
            return "Middle age"
        }
        return defaultVal;
    }
});

myApp.filter("minAge", function(){
    return function(item, minAge){
        var list = [];
        item.forEach(function(record){
            if(record.age >= minAge)
            {
                list.push(record);
            }
        });
        return list;
    }
});

myApp.directive("ngTraining", function(){
    var directive = {};
    directive.restrict = "A";
    directive.templateUrl = 'training.html';

    directive.compile = function(element, attributes) {
        element.css("border", "1px solid #cccccc");
        element.css("background-color", "#ffff00");
        element.on("click", function(){
            alert('clicked me');
        });

        var linkFunction = function($scope, element, attributes) {
//            element.html("This is the new content: " + $scope.firstName);
//            element.css("background-color", "#ffff00");
        };

        return linkFunction;
    };

    return directive;
});

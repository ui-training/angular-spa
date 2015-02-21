var myApp = angular.module("angular-example", []);
myApp.config(["trainingProvider", function(trainingProvider){
    trainingProvider.studentCount = 10;
}]);

myApp.controller("MainCtrl", [
    "$scope", "$location", "$http", "mathFactory", "myValue",
    function ($scope, $location, $http, mathFactory, myValue) {

        $scope = angular.extend($scope, {
            clickCount: 0,
            jsonRecords: {},
            users: [
                {
                    name: "User 1",
                    age: "twenty"
                },
                {
                    name: "User 2",
                    age: 23
                },
                {
                    name: "User 3",
                    age: 24
                }
            ]
        });

        $scope.alertMe = function () {
            $scope.clickCount++;
        };

        setInterval(function () {
            $scope.$apply(function () {
                $scope.clickCount++;
                mathFactory.setConstant($scope.clickCount);
            });
        }, 1000);

        $scope.downloadJson = function () {
            var httpHandler = getHttpHandler();

            httpHandler.success(function (data, status, headers, config) {
                console.log(data);
                $scope.jsonRecords = data;
            }).error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        };

        var getHttpHandler = function () {
            return $http.get('sample.json');
        };

    }
]);

myApp.provider("training", function(){
    this.$get = function(){
        var that = this;
        return {
            getUserCount: function(){
                return that.studentCount;
            }
        }
    }
});

myApp.controller("SecondCtrl", ["$scope", "mathFactory", "training", function ($scope, mathFactory, training) {
    $scope = angular.extend($scope, {
        number: 10,
        array: [1, 2, 3],
        name: {
            first: "Jon",
            last: "Welling"
        }
    });
    console.log(training.getUserCount());
    $scope.constant = 0;

    $scope.reload = function(){
        $scope.constant = mathFactory.getConstant();
    };
    $scope.number = mathFactory.square("20");
    $scope.fullName = function () {
        return $scope.name.first + " " + $scope.name.last;
    };
}]);

myApp.controller("formCtrl", ["$scope", function ($scope) {

}]);


myApp.factory("mathFactory", function(){
    var constant = 0;
    return {
        getConstant: function(){
            return constant;
        },
        setConstant : function(number){
            constant = number;
        },
        square: function(number){
            return number * number;
        },
        cube: function(number){

        }
    }
});

myApp.value("myValue", "10");

myApp.service("myService", [function(){
    this.index = index++;
    var myName = "";
    this.getNameInUpperCase = function(){
        return myName.toUpperCase();
    };
    this.setName = function(name){
        myName = name;
    }
}]);


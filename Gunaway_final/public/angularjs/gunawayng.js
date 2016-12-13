/**
 * Created by vedant on 11/24/16.
 */
var gunaway = angular.module('gunawayapp', []);
gunaway.controller('gunaway', function($scope,$http,$window){

    $scope.gunawaycheck=function(req,res) {
        console.log("In gunaway's angular");
        $http({
            method: 'post',
            url: '/gunawaycheck',
            data: {

                 "q1":$scope.q1,
                "q2":$scope.q2,
                "q3":$scope.q3,
                "q4":$scope.q4,
                "q5":$scope.q5,
                "q6":$scope.q6,
                "q7":$scope.q7,
                "q8":$scope.q8,
                "q9":$scope.q9,
                "q10":$scope.q10,
                "q11":$scope.q11,
                "q12":$scope.q12,
                "q13":$scope.q13,
                "q14":$scope.q14,
                "q15":$scope.q15,
                "q16":$scope.q16,
                "q17":$scope.q17,
                "q18":$scope.q18,
                "q19":$scope.q19
            }

        }).success(function (data) {
            console.log("Call is returned");
            if(data.statusCode==200) {
                alert("Thank you! The product has been added to your cart!");
                console.log("User is allowed to buy the gun");
                $window.location.assign('/homepage');
            }else if(data.statusCode==202){
                console.log("User is NOT allowed to buy the gun");
                alert("Sorry! You are not eligible to buy this product.");
                $window.location.assign('/homepage');
            }
        });
    }

});
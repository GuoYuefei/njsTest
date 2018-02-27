/**
 * http://usejsdoc.org/
 */

var adminApp = angular.module('adminApp',['ngRoute']);




adminApp.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/codeInsert.html',{templateUrl:'./code/codeInsert.html',controller:"codeInsert"})
    .when('/showAllCode.html',{templateUrl: './code/showAllCode.html',controller:'showAllCode'})
    .otherwise({redirectTo:'/'});
}]);

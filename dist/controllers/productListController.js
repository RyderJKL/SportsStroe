/**
 * Created by onejustone on 2017/1/6.
 */
angular.module('myapp', [])
    .constant('dataUrl', 'http://localhost:2403/products')
    .controller('productController', ['$scope','$http',
        'dataUrl',function ($scope,$http,dataUrl) {
        $http.get(dataUrl).then( function(data) {
            $scope.products = data.data;
        }, function (error){
            console.log(error)
        })
}])
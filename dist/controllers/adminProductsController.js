/**
 * Created by onejustone on 2017/1/17.
 */

// 使用 $resource 服务来定义控制器以提供访问权限给服务器的 RESTful API
angular.module('storeAdmin')
.constant('productUrl', 'http://localhost:2403/products/')
.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
}])
.controller('productCtrl', ['$scope', '$resource', 'productUrl', function ($scope, $resource, productUrl) {
	$scope.productsResource = $resource(productUrl + ':id', {id: "@id"});
	//创建提供权限访问 RESTful API 的访问对象
	$scope.listProducts = function () {
		$scope.products = $scope.productsResource.query();
	}

	$scope.deleteProduct = function (product) {
		product.$delete().then(function () {
			$scope.products.splice($scope.products.indexOf(product), 1);
		})
	}

	$scope.createProduct = function (product) {
		new $scope.productsResource(product).$save().then(function (newProduct) {
			$scope.products.push(newProduct);
			$scope.editedProduct = null;
		})
	}

	$scope.updateProduct = function (product) {
		product.$save();
		$scope.editedProduct = null;
	}

	$scope.startEdit = function (product) {
		$scope.editedProduct = product;
	}

	$scope.cancelEdit = function () {
		$scope.editedProduct = null;
	}

	$scope.listProducts();
}]);
 

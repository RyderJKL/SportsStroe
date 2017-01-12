/**
 * Created by onejustone on 2017/1/6.
 */
angular.module('myapp')
    .constant('productCategoryClass', 'btn-danger')
    .constant('productListCount', 3)
    .constant('dataUrl', 'http://localhost:2403/products/')
    .controller('productController', ['$scope','$http','$filter', 'productCategoryClass','productListCount', 'dataUrl','cart',
	    function ($scope, $http, $filter, productCategoryClass, productListCount, dataUrl, cart) {

    	$scope.products = {};

    	$http.get(dataUrl).then(function (data) {
            // AnguarJS 通过 $http 服务实现对 Ajax 的支持
            $scope.products.data = data.data;
        }, function (error) {
    		$scope.products.error = error;
        });

        $scope.currentPage = 1;

        $scope.pageSize = productListCount;

        $scope.selectPage = function (p) {
	        $scope.currentPage = p;
        }

        $scope.getPageClass = function (p) {
	        return $scope.currentPage == p ? 'btn-info' : " ";
        }

        var selectCategory = null;

        $scope.selectCategoryItem = function (newCategory) {
	        selectCategory = newCategory;
	        $scope.currentPage = 1;
        }

        $scope.categoryFilterFn = function (product) {
	        return selectCategory == null || product.category == selectCategory;
        }

        $scope.getCategoryClass = function (c) {
        	// console.log(selectCategory)
	        // null == undefined (true)
	        // 所以，home 被默认选中
	        return selectCategory == c ? productCategoryClass : "";
        }

        $scope.addProduct2Cart = function (product) {
	        cart.addProduct(product.id, product.name, product.price)
        }

        $scope.removeProducts = function (id) {
	        cart.removeProduct(id)
        }
    }]).controller('checkOutCtrl', ['$scope', 'cart', function ($scope, cart) {
		$scope.cartData = cart.getProducts();

}]);
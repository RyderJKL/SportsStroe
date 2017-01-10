/**
 * Created by onejustone on 2017/1/6.
 */
angular.module('myapp')
    .constant('productCategoryClass', 'btn-danger')
    .constant('productListCount', 3)
    .constant('dataUrl', 'http://localhost:2403/products')
    .controller('productController', ['$scope','$http','$filter', 'productCategoryClass','productListCount', 'dataUrl',
	    function ($scope, $http, $filter, productCategoryClass, productListCount,dataUrl) {
        $http.get(dataUrl).then(function (data) {
            $scope.products = data.data;
        }, function (error) {
            console.log(error)
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
        	console.log(newCategory)
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
	        console.log(c)
	        return selectCategory == c ? productCategoryClass : "";
        }

    }]);
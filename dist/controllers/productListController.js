/**
 * Created by onejustone on 2017/1/6.
 */
angular.module('myapp')
    .constant('productCategoryClass', 'btn-danger')
    .constant('productListCount', 3)
    .constant('pl', 'productsList.html')
    .constant('dataUrl', 'http://localhost:2403/dashboard/products')
    .controller('productController', ['$scope','$http','productCategoryClass','productListCount',
        'pl','dataUrl', function ($scope, $http, dataUrl) {
        $http.get(dataUrl).then(function (data) {
            $scope.products = data.data;
        }, function (error) {
            console.log(error)
        });

        $scope.pl = pl;

        // 当前页
        $scope.currentPage = 1;


        // 每页多少条记录
        $scope.pageSize = productListCount;

        // 跳转页面
        $scope.selectPage = function (p) {
            $scope.currentPage = p;
        };

        // 设置选择页码的样式
            $scope.setPageClass = function (p) {
                return $scope.currentPage == p ? 'btn-info' : '';
            };

		    var selectCategory = null;


		// 选中商品的类别
		    $scope.selectCategoryItem = function (categoryName) {
			    selectCategory = categoryName;
			    $scope.currentPage = 1;
		    };

		// 通过用户选中的种类，对数据进行过滤,ture 过滤， flase 不过滤
		    $scope.categoryFilterFn = function (product) {
			    return selectCategory == null || product.category
		    };
    }]);
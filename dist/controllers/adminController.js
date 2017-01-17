/**
 * Created by onejustone on 2017/1/15.
 */
angular.module('storeAdmin')
// 管理员登录验证模块
.constant('authUrl','http://localhost:2403/users/login')
.constant('ordersUrl','http://localhost:2403/order')
.controller('authCtrl', ['$scope', '$http', '$location', 'authUrl',
	function ($scope, $http, $location, authUrl) {
	$scope.authenticate = function (user, pass) {
		$http.post(authUrl, {
			username: user,
			password: pass
		}, {
			withCredentials: true,
		//	withCredentials 是 $http 的可选配置项，如上，将会启用跨域请求(cross-origin requests)
		//	的支持，允许 Ajax 请求使用 cookie 处理验证。
		}).then((data) => {
			$location.path('/main')
		}, (error) => {
			$scope.authenticationError = error;
		})
	}
}])
.controller('mainCtrl', ['$scope', function ($scope) {
//	由于 URL 路由的特性，不能嵌套多个 ng-view 指令，所有使用 ng-include 的替代解决方案
// 	mainCtrl 控制器,提供 ng-include 指令管理视图所需的行为和数据，其功能相当于切换视图的导航按钮
	$scope.screens = ['Products', 'Orders'];
	$scope.current = $scope.screens[0];

	$scope.setScreen = function (index) {
		// 用于改变显示的视图
		$scope.current = $scope.screens[index];
	};

	$scope.getScreen = function () {
		// 显示视图
		return $scope.current == 'Products' ? 'adminProducts.html' : 'adminOrders.html';
	}
}])
.controller('ordersCtrl', ['$scope','$http', 'ordersUrl',
	function ($scope, $http, ordersUrl) {
//	订单列表控制器
		$http.get(ordersUrl, {
			// 向 Deployd 发送 Ajax 的 GET 请求获取所有订单信息
			withCredentials: true
		}).then((data) => {
			$scope.orders = data.data;
			console.log($scope.orders)
		}, (error) => {
			$scope.error = error;
		});

		$scope.selectedOrder = null;
		// 用来标记被选中的订单

		$scope.selectOrder = function (order) {
			// 该函数用来设置 selectedOrder 属性，将选中的订单的产品传给 calcTotal 函数
			$scope.selectedOrder = order;
		}

		$scope.calcTotal = function (order) {
			// 计算出订单中商品的总价格
			let total = 0;
			for (let i =0;i < order.products.length; i++){
				total += order.products[i]['count'] * order.products[i]['price'];
			}

			return total;
		}
}]);


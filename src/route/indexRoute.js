/**
 * Created by onejustone on 2017/1/10.
 */
angular.module('myapp', ['customFilters', 'cart', 'ngRoute'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(false).hashPrefix('');
	// 解决 angular1.6 在h5 中的 url 解析问题

	// 下面开始进行路由设置
	$routeProvider
	.when('/productsList', {
		templateUrl: 'productsList.html'
	}).when('/checkout', {
		templateUrl: 'checkout.html'
	}).when('/placeholder',{
		templateUrl: 'placeorder.html'
	})
	// .otherwise({
	// 	redirectTo:'/'
	// })
}]);
 

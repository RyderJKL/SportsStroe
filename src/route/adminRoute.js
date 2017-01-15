/**
 * Created by onejustone on 2017/1/15.
 */
angular.module('storeAdmin', ['ngRoute'])
// 用户验证模路由配置
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(false).hashPrefix('');
	$routeProvider.when('/login', {
		templateUrl: 'adminLogin.html',
	}).when('/main', {
		templateUrl: 'adminMain.html',
	}).otherwise({
		redirectTo:'/login',
	})
}])
 

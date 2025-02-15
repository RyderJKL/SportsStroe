/**
 * Created by onejustone on 2017/1/10.
 */
angular.module('cart', [])
.factory('cart', function () {
	// 使用工厂创建一个购物车服务
	let cartData = [];
	// 购物车存放商品数组
	return {
		addProduct : function (id, name, price) {
		//	将商品添加到购物车中
			let addedExistItem = false;
		//	要添加的商品是否已经存在于购物车中
			for(let i = 0;i < cartData.length;i ++){
				if(cartData[i]['id'] == id){
					cartData[i].count ++;
					addedExistItem = true;
					break;
				}
			}

			if(!addedExistItem){
			//	购物车中不存在该商品
				cartData.push({
					id:id,
					name:name,
					price:price,
					count:1
				})
			}
		},

		removeProduct:function (id) {
			// 删除商品
			for(let i=0;i < cartData.length;i++){
				if(cartData[i]['id'] == id){
					cartData.splice(i, 1);
					break;
				}
			}
		},

		getProducts: function () {
			// 放回购物车数组
			return cartData;
		}
	}
}).directive('cartSummary', function (cart) {
	// 自定义指令
	// 用于结算购物车中的商品
	return {
		controller: function ($scope, $element, $attrs) {

			let cartProductsArr = cart.getProducts();
			// 获得购物车
			$scope.totalPrice = function () {
				// 总价
				let total = 0;
				for(let i = 0;i < cartProductsArr.length; i++){
					total += (cartProductsArr[i]['price'] * cartProductsArr[i]['count']);
				}

				return total;
			}

			$scope.cartItemCount = function () {
				// 商品数量
				let totalItem = 0;
				for(let i=0;i < cartProductsArr.length;i++){
					totalItem += cartProductsArr[i]['count'];
				}

				return totalItem;
			}

		},

		restrict: 'E',
		// 指定自定义指令的调用规则，`E` 代表以元素的形式调用
		templateUrl: '../views/cartSummary.html'
	//	templateUrl 属性，指定自定义指令显示的页面
	}
});
 

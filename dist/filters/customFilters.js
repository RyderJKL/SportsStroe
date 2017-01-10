/**
 * Created by onejustone on 2017/1/6.
 */
//创建自定义过滤器
angular.module('customFilters', [])
.filter('unique',function () {
	return function (data, propertyName){
		if (angular.isArray(data) && angular.isString(propertyName)){
			// 如果得到的数据是数组，并且类型名是字符串
			// 类别去重
			// result 记录唯一类别数组
			var results = [];
			var keys = {};
			for (var i=0, len = data.length; i < len;i++){
				var val = data[i][propertyName];
				if( angular.isUndefined(keys[val])){
					// 使用对象原型链搜索对象属性进行数据去重
					keys[val] = true;
					results.push(val);
				}
			}
			return results;
		} else {
			return data;
		}
	}
})
.filter('range', function ($filter) {
//	用户点击某个页码时返回该页码对应的数据
	return function (data, page, size) {
		if(angular.isArray(data)){
			var start_index = (page -1) * size;
			if( data.length < start_index){
				return [];
			} else {
				return $filter("limitTo")(data.splice(start_index), size);

			}
		} else {
			return data;
		}
	}
}).filter('pageCount', function () {
	return function (data, size) {
		if (angular.isArray(data)){
			var result = [];
			for( var i = 0;i < Math.ceil(data.length / size);i ++){
				result.push(i)
			}
			return result;
		} else {
			return data;
		}
	}
});




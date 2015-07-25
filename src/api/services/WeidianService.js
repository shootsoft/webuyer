/**
 * WeidianService
 *
 * @description :: Server-side logic for managing weidians
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	url: 'http://api.vdian.com/',
	filename: 'weidian_token.json',
	token: '',

	/**
	* `WeidianService.init_token()`
	* init token
	*/
	init_token: function(){
		var fs = require('fs')

		if (!fs.existsSync(WeidianService.filename)){
			WeidianService.new_token()
		}

		if(!fs.existsSync(WeidianService.filename)){
			sails.log.error('new token failed')
			return
		}

		var stat = fs.statSync(WeidianService.filename)
		if (stat && stat.atime){
			var start = stat.atime.getTime()
			var end = new Date().getTime()
			var time = end - start
			sails.log.debug('Escaped time: ' + time)

			//compare token time
			//72000000 = 20 * 3600 * 1000 
			//20 hours
			if(time > 72000000){
				WeidianService.new_token()
			}

			token = JSON.parse(fs.readFileSync(WeidianService.filename))

			if(token && token.result && token.result.access_token){
				WeidianService.token = token.result.access_token
			}
		}

	},

	/**
	* `WeidianService.new_token()`
	* new token & cache
	*/
	new_token: function(){
		var fs = require('fs')
		var rc = require('rest-client')
		
		if (!sails.config.weidian){
			sails.log.error('null apikey')
			return
		}

		var u = WeidianService.url 
				+ 'token?grant_type=client_credential&appkey='
				+ sails.config.weidian.appkey + '&secret=' 
				+ sails.config.weidian.secret
		sails.log.debug(u)

		rc.send(u, function (res, body) {
			sails.log.debug(body)
			fs.writeFileSync(WeidianService.filename, JSON.stringify(body)) 
		}).error(function (err) {
			sails.log.error('new token failed')
			sails.log.error(err)
		})
		
	},

	/**
	* `WeidianService.get_products()`
	* get products from weidian
	* 	1---优先推荐
	*	2---优先已售完
	*	3---销量倒序
	*	4---销量正序
	*	5---库存倒序
	*	6---库存正序
	*/
	get_products: function(page_num, page_size, orderby, callback){
		var u = WeidianService.url 
				+ 'api?param={"page_num":' + page_num
				+ ',"page_size":'+ page_size
				+ ',"orderby":' + orderby
				+ '}&public={"method":"vdian.item.list.get","access_token":"' 
				+ WeidianService.token + '","version":"1.0","format":"json"}'
		/**
		* http://api.vdian.com/api?param=
		*	{"page_num":1,"page_size":10,"orderby":1}
		*	&public={"method":"vdian.item.list.get",
		*	"access_token":"712d316173e43cdd0e07d9e10ad190a7",
		*	"version":"1.0","format":"json"}
		*/
		var rc = require('rest-client')
		var Promise = require('promise');
		rc.send(u, function (res, body) {
			if(callback){
				callback(body)
			}
			//sails.log.debug(JSON.stringify(body))
			//sails.log.debug(body)
			//fs.writeFileSync(WeidianService.filename, JSON.stringify(body)) 
		}).error(function (err) {
			sails.log.error('new token failed')
			sails.log.error(err)
		})

	},


};


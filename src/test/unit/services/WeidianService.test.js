var assert = require('assert')

describe.only('WeidianService', function() {


	// describe('new_token()', function() {
    //     this.timeout(20000)
 //        it('should read token from remote', function(done) {
 //        	var fs = require('fs')
 //        	if(fs.existsSync(WeidianService.filename)){
 //        		fs.unlinkSync(WeidianService.filename)
 //        	}
 //            WeidianService.new_token()
 //            setTimeout(function(){
 //            	assert.equal(true, fs.existsSync(WeidianService.filename))
 //            	done()
 //            }, 5000)
 //        })
 //    })



    describe('init_token()', function() {
        it('should read token form local or from remote', function(done) {
            WeidianService.init_token()
            assert.notEqual(WeidianService.token, '')
            sails.log.debug('now token is ' + WeidianService.token)
            done()

        })
    })


    describe('get_products()', function() {

        this.timeout(10000)
        it('get product list', function(done) {
            WeidianService.init_token()
            WeidianService.get_products(1, 10, 1, function(products){
                //sails.log.debug(JSON.stringify(products))
                assert.notEqual(products, undefined)
                assert.notEqual(products.result, undefined)
                assert.notEqual(products.result.items, undefined)
                var items = products.result.items.result
                for(var i in items){
                     sails.log.debug('products ' + items[i].item_name)
                }
                done()
            })
            

        })
    })
})
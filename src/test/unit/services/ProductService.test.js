var assert = require('assert')

describe.only('ProductService', function() {

    describe('sync()', function() {

        this.timeout(200000)
        it('sync weidian products to local db', function(done) {
            WeidianService.init_token()
            ProductService.sync(1, function(){
                sails.log.debug('callback called')
                done()  
            })
            setTimeout(function(){
                //ProductService.sync()
                done()  
            }, 18000)
            

        })
    })
})
/**
 * ProductService
 *
 * @description :: Server-side logic for managing weidians
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    sync: function(page, callback) {
        if (page == undefined) {
            page = 1
        }
        // TODO: update to sync all products
        WeidianService.get_products(page, 200, 1, function(products) {

            if (products && products.result.items && products.result.items) {
                
                //sails.log.debug(JSON.stringify(products))

                Product.find()
                    .then(function (dbproducts) {
                        var list = {}
                        for (var i in dbproducts) {
                            list[dbproducts[i].itemid] = dbproducts[i]
                        }

                        var items = products.result.items
                        var newlist =[]
                        var updatelist=[]
                        for (var i in items) {
                            if(list[items[i].itemid]==undefined){
                                newlist.push(items[i])
                                sails.log.debug('new id ' + items[i].itemid)
                            } else{
                                updatelist.push(items[i])
                                sails.log.debug('exist id ' + items[i].itemid)
                            }

                            Product.create(newlist)
                                .then(function(){
                                    // if (callback) {
                                    // callback()
                                    // }
                                })
                                .catch(function (err) {
                                    sails.log.error(err)
                                });
                            // .exec(function createCB(err, created) {
                            //     console.log('sync done');
                            //     if(err){
                            //         sails.log.error(err)
                            //     }
                            //     if (callback) {
                            //         callback()
                            //     }
                            //});
                        }
                    })
                    .catch(function (err) {
                        sails.log.error(err)
                    });
                
            } else {
                sails.log.error('sync error')
            }
        })
    }
}

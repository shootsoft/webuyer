/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * `ProductController.index()`
     */
    index: function(req, res) {
        return res.view()
    },

    /**
     * `ProductController.sync()`
     */
    query: function(req, res) {
        var cols = ['item_desc', 'price', 'item_desc', 'createdAt']
        var all = req.allParams();
        var search = req.param('search')
        var order = req.param('order')
        var limit = all['length']
        var skip = req.param('start')
        var sort = cols[order[0].column] + ' ' + order[0].dir 
        //sails.log.debug(limit)
        var query;
        if(search && search.value){
            query = Product.find({
                or : [
                    //{ name: { 'contains': search.value }} ,
                    { item_desc: { 'contains': search.value }}
                ],
                limit: limit, 
                skip: skip,
                //sort: sort
            })
        } else {
            query = Product.find({
                limit: limit, 
                skip: skip,
                //sort: sort
            })
        }

        Product.count().exec(function countCB(error, count) {
            query.sort(sort).then(function(data){
                //sails.log.debug(data)
                return res.json(
                {
                    "draw": req.param('draw'),
                    "recordsTotal": count,
                    "recordsFiltered": count,
                    "data": data
                }
        )
            })
        });
        
    },

    /**
     * `ProductController.sync()`
     */
    sync: function(req, res) {
        return res.view()
    }
};

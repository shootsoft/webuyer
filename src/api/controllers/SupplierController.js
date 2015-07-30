/**
 * SupplierController
 *
 * @description :: Server-side logic for managing Suppliers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `SupplierController.index()`
     */
    index: function(req, res) {
        return res.view('supplier/index', {
            footer : [
                '/js/modules/supplier/index.js'
            ]
        });
    },

    test: function(req, res){
        return res.view('test', {
          msg: 'Please input your email and password',
          layout: ''
        })
    },

    /**
     * `SupplierController.query()`
     */
    query: function(req, res) {
        var cols = ['id', 'name', 'index', 'location', 'open_date', 'updatedAt', 'createdAt']
        var all = req.allParams();
        var search = req.param('search')
        var order = req.param('order')
        var limit = all['length']
        var skip = req.param('start')
        var sort = cols[order[0].column] + ' ' + order[0].dir
            //sails.log.debug(limit)
        var query;
        var cond = {}
        if (search && search.value) {
            cond = {
                or: [{
                    id: {
                        'contains': search.value
                    }
                },{
                    name: {
                        'contains': search.value
                    }
                }, {
                    location: {
                        'contains': search.value
                    }
                }]
            }

            query = Supplier.find({
                or: [{
                    id: {
                        'contains': search.value
                    }
                },{
                    name: {
                        'contains': search.value
                    }
                }, {
                    location: {
                        'contains': search.value
                    }
                }],
                limit: limit,
                skip: skip,
                //sort: sort
            })
            
        } else {
            query = Supplier.find({
                limit: limit,
                skip: skip,
                //sort: sort
            })
        }

        Supplier.count(cond).exec(function countCB(error, count) {
            query.sort(sort).then(function(data) {
                //sails.log.debug(data)
                return res.json({
                    "draw": req.param('draw'),
                    "recordsTotal": count,
                    "recordsFiltered": count,
                    "data": data
                })
            })
        });

    },


    /**
     * `SupplierController.create()`
     */
    create: function(req, res) {
        return res.json({
            todo: 'location() is not implemented yet!'
        });
    },


    /**
     * `SupplierController.update()`
     */
    update: function(req, res) {
        return res.json({
            todo: 'geo() is not implemented yet!'
        });
    },


    /**
     * `SupplierController.view()`
     */
    view: function(req, res) {
        return res.json({
            todo: 'open_date() is not implemented yet!'
        });
    },

};

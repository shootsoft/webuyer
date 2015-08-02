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

    /**
     * `SupplierController.query()`
     */
    query: function(req, res) {
        var cols = ['id', 'name', 'index', 'location', 'open_date', 'updatedAt', 'createdAt']
        var all = req.allParams();
        var search = req.param('search')
        var order = req.param('order')
        if(!order.length){
            order=[{column: 'id', dir:'desc'}]
        }
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
                    'draw': req.param('draw'),
                    'recordsTotal': count,
                    'recordsFiltered': count,
                    'data': data
                })
            })
        });

    },



    /**
     * `SupplierController.update()`
     */
    update: function(req, res) {
        var rt = {
            success: false,
            msg: 'Server error'
        }
        var id = parseInt(req.param('id'))
        var supplier = {
            name: req.param('name'),
            index: req.param('index'),
            location: req.param('location'),
            geo: req.param('geo'),
            open_date: req.param('open_date'),
            updatedAt: new Date()
        }
        //sails.log.debug('id=' + id)
        if(id && !isNaN(id)){
            //supplier.id = id
            Supplier.update({id:id}, supplier).exec(function (err, newsupplier) {
                if(!err){
                    rt.success = true
                    rt.msg = ''
                } else {
                    rt.msg = err
                }
                return res.json(rt);
            })
        } else {
            Supplier.create(supplier).exec(function (err, newsupplier) {
                if(!err){
                    rt.success = true
                    rt.msg = ''
                } else {
                    rt.msg = err
                }
                return res.json(rt);
            })
        }

        

        
    },


    /**
     * `SupplierController.remove()`
     */
    remove: function(req, res) {
        var rt = {
            success: false,
            msg: 'Server error'
        }
        var id = parseInt(req.param('id'))
        if(id && !isNaN(id)){
            Supplier.destroy({id: id}).exec(function (err, newsupplier) {
                if(!err){
                    rt.success = true
                    rt.msg = ''
                } else {
                    rt.msg = err
                }
                return res.json(rt);
            })
        } else {
            rt.msg = 'Module not found!'
            return res.json(rt);
        }
        
        
    },

};

/**
 * Supplier.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    tableName: 't_order_detail',

    attributes: {


        id: {
            type: 'integer',
            primaryKey: true
        },

        /**
         * 订单ID
         */
        order_id: {
            type: 'integer'
        },

        item_id: {
            type: 'integer'
        },

        price: {
            type: 'float'
        },

        quantity: {
            type: 'integer'
        },

        total_price: {
            type: 'float'
        },

        sku_id: {
            type: 'integer'
        },

        sku_title: {
            type: 'string'
        },

        item_name: {
            type: 'string'
        },

        img: {
            type: 'string'
        },

        url: {
            type: 'string'
        },

        fx_fee_rate: {
            type: 'string'
        },

        merchant_code: {
            type: 'string'
        },

        sku_merchant_code: {
            type: 'string'
        },

        createdAt: {
            type: 'datetime'
        },

        updatedAt: {
            type: 'datetime'
        }
    }
};

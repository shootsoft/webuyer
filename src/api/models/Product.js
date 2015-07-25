/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 't_product',
    //identity: 'id',
    attributes: {
        /**
        itemid: "1475005874",
        item_name: "Freezeframe系列之BB霜，主要成分是澳洲的超级水果——维C含量最高，抗氧",
        item_desc: "Freezeframe系列之BB霜，主要成分是澳洲的超级水果——维C含量最高，抗氧化能力最强的卡卡杜李~ 一支30ml~",
        stock: 5,
        price: "335.00",
        sold: 0,
        seller_id: "338178412",
        istop: 0,
        merchant_code: "",
        fx_fee_rate: "",
        status: null,
        skus: [ ],
        imgs: [
        "http://wd.geilicdn.com/vshop338178412-1437477812010-15498-s4.jpg?w=480&h=0"
        ],
        thumb_imgs: [
        "http://wd.geilicdn.com/vshop338178412-1437477812010-15498-s4.jpg?w=110&h=110&cp=1"
        ],
        cates: [
        {
        cate_id: "50250697",
        cate_name: "澳洲美容产品及药妆",
        sort_num: 40
        }
        ],
        update_time: "2015-07-21 19:30:03"
        */
        itemid: {
          type: 'integer',
          primaryKey: true
        },

        item_name: {
            type: 'string',
            maxLength: 255
        },

        item_desc: {
            type: 'string',
            maxLength: 1024
        },

        stock: {
            type: 'integer'
        },

        price: {
            type: 'float'
        },

        price_cost: {
            type: 'float'
        },

        weight:{
            type: 'float'
        },

        sold: {
            type: 'integer'
        },

        seller_id: {
            type: 'integer'
        },

        istop: {
            type: 'integer'
        },

        merchant_code: {
            type: 'string'
        },

        fx_fee_rate: {
            type: 'string'
        },

        status: {
            type: 'string'
        },

        skus: {
            type: 'array'
        },

        imgs: {
            type: 'array'
        },

        thumb_imgs: {
            type: 'array'
        },

        cates:{
            type: 'json'
        },

        update_time: {
            type: 'datetime'
        },

        createdAt: {
            type: 'datetime'
        },

        updatedAt: {
            type: 'datetime'
        }

    }
};

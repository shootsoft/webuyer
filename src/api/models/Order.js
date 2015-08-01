/**
 * Supplier.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    tableName: 't_order',

    attributes: {

        /**
         * 订单ID
         */
        order_id: {
            type: 'integer',
            primaryKey: true
        },

        /**
         * 快递单号
         */
        express_no: {
            type: 'string'
        },

        /**
         * 快递公司编号
         */
        express_type: {
            type: 'string'
        },

        trade_no: {
            type: 'string'
        },

        express: {
            type: 'string'
        },

        express_note: {
            type: 'string'
        },

        /**
         * 下单时间
         */
        time: {
            type: 'datetime'
        },

        /**
         * 订单更新时间
         */
        update_time: {
            type: 'datetime'
        },

        /**
         * 订单状态编号
         */
        status: {
            type: 'string'
        },

        /**
         * 已发货
         */
        status2: {
            type: 'string'
        },

        /**
         * 买家备注
         */
        buyer_note: {
            type: 'string'
        },

        /**
         * 卖家备注
         */
        seller_note: {
            type: 'string'
        },

        /**
         * 分销商ID
         */
        f_seller_id: {
            type: 'integer'
        },

        /**
         * 分销商店铺名称
         */
        f_shop_name: {
            type: 'string'
        },

        /**
         * 分销商手机号
         */
        f_phone: {
            type: 'string'
        },

        /**
        * Product price
        */
        price: {
            type: 'float'
        },

        /**
        * Order total price
        */
        total: {
            type: 'float'
        },

        /**
        * Items total count
        */
        quantity: {
            type: 'integer'
        },

        note: {
            type: 'string'
        },

        seller_id: {
            type: 'integer'
        },

        sk: {
            type: 'string'
        },

        discount: {
            type: 'float'
        },

        discount_info: {
            type: 'string'
        },

        discount_amount: {
            type: 'float'
        },

        express_fee: {
            type: 'float'
        },

        total_fee: {
            type: 'float'
        },

        seller_phone: {
            type: 'string'
        },

        seller_name: {
            type: 'string'
        },

        is_close: {
            type: 'integer'
        },

        user_phone: {
            type: 'string'
        },

        send_time: {
            type: 'datetime'
        },

        pay_time: {
            type: 'datetime'
        },

        add_time: {
            type: 'datetime'
        },
        
        buyer_identity_id: {
            type: 'integer'
        },
        
        order_type: {
            type: 'integer'
        },
        
        order_type_des: {
            type: 'string'
        },
        
        return_code: {
            type: 'string'
        },
        
        argue_flag: {
            type: 'integer'
        },
        
        status_desc: {
            type: 'string'
        },
        
        fx_fee_value: {
            type: 'float'
        },
        
        f_seller_id: {
            type: 'integer'
        },
        
        f_shop_name: {
            type: 'string'
        },
        
        f_phone: {
            type: 'string'
        },
        
        confirm_expire: {
            type: 'datetime'
        },
        
        refund_info: {
            type: 'json'
        },
        
        modify_price_enable: {
            type: 'integer'
        },
        
        express_fee_num: {
            type: 'float'
        },
        
        original_total_price: {
            type: 'float'
        },

        real_income_price: {
            type: 'float'
        },

        createdAt: {
            type: 'datetime'
        },

        updatedAt: {
            type: 'datetime'
        }
    }
};

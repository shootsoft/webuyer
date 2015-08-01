/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 't_customer',
    //identity: 'id',
    attributes: {

        id: {
            type: 'integer',
            primaryKey: true
        },

        name: {
            type: 'string'
        },

        address: {
            type: 'string'
        },
        
        post: {
            type: 'string'
        },
        
        phone: {
            type: 'string'
        },
        
        province: {
            type: 'string'
        },
        
        city: {
            type: 'string'
        },
        
        region: {
            type: 'string'
        },
        self_address: {
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

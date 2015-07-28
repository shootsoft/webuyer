/**
 * Supplier.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    tableName: 't_supplier',

    attributes: {

        id: {
            type: 'integer',
            primaryKey: true
        },

        name: {
            type: 'string'
        },

        index: {
            type: 'integer'
        },

        location: {
            type: 'string'
        },

        geo: {
            type: 'string'
        },

        open_date: {
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

/**
 * i18nPolicy
 *
 * @module      :: Policy
 * @description :: Simple policy to set languages
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

    //set default language
    if (!req.session.lang) {
        req.session.lang = sails.config.i18n.defaultLocale
    }
    //check parameter
    if (req.param('lang')) {
        var lang = req.param('lang')
        var list = sails.config.i18n.locales
            //sails.log.debug(list)
        var p = list.indexOf(lang)
        if (p == -1) {
            //req.session.lang = sails.config.i18n.defaultLocale
            sails.log.debug('param lang not exist')
        } else {
            req.session.lang = lang
        }
    }
    //sails.log.debug('set ' + req.session.lang)
    req.setLocale(req.session.lang)
    return next()
};

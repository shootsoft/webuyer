/**
 * LangController
 *
 * @description :: Server-side logic for managing langs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * `LangController.index()`
     */
    index: function(req, res) {
        var lang = req.param('lang')
        var list = sails.config.i18n.locales
        sails.log.debug(JSON.stringify(list))
        var p = list.indexOf(lang)
        if (p == -1) {
            lang = sails.config.i18n.defaultLocale
        }
        req.session.lang = lang
        sails.log.debug('set language', lang)
        req.setLocale(lang);
        return res.redirect('/')
    }
};

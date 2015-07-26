/**
 * i18nPolicy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

	if(!req.session.lang){
		req.session.lang = sails.config.i18n.defaultLocale
   	} 
   	if(req.param('lang')){
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

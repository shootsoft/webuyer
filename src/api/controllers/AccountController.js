/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


   /**
   * `AccountController.login()`
   * login to system
   */
  login: function(req, res) {
    if (req.method == 'GET') {
      return res.view('account/login', {
        layout: ''
      })
    } else {
      email = req.param('email', '')
      password = req.param('password', '')
      if (email && password) {
        //Login
        UserService.login(req, res, email, password)

      } else {
        return res.view('account/login', {
          msg: 'Please input your email and password',
          layout: ''
        })
      }

    }
  },


  /**
   * `AccountController.logout()`
   */
  logout: function(req, res) {
    req.session.user = undefined
    req.session.admin = undefined
    return res.redirect('/');
  },

};


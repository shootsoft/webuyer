var assert = require('assert');

describe.only('UserService', function() {

    // describe('register first()', function() {
    //     it('should create new user', function(done) {
    //         UserService.register('i@webuyer.me',
    //             'test')
    //     });
    // });

    describe('login()', function() {
        it('should set session correct', function(done) {

            var req = {
                session: {},
            }
            var res = {
                redirect: function(path) {
                    res.path = path
                },
                view: function(view, locals) {
                    res.view = view
                    res.locals = locals
                }
            }

            UserService.login(req, res, "test@test.com",
                "123")

            setTimeout(function() {
                assert.equal(res.path, '/')
                assert.equal(req.session.user.email,
                    "test@test.com")
                done();
            }, 500)

        });
    });


    describe('hash()', function() {
        it('should hash password with salt', function(done) {
            var result = UserService.hash("password",
                "salt")
            assert.equal(result,
                'c88e9c67041a74e0357befdff93f87dde0904214'
            )
            done();

        });
    });



    describe('register()', function() {
        it('should create new user', function(done) {
            User.destroy({
                email: 'password@test.com'
            }).exec(function deleteCB(err) {
                sails.log.debug(
                    'password@test.com has been deleted'
                );
            });

            UserService.register('password@test.com',
                'salt')
            setTimeout(function() {

                User.findOneByEmail(
                        "password@test.com")
                    .then(function(user) {
                        assert.notEqual(
                            user,
                            undefined)
                        assert.equal(user.email,
                            'password@test.com'
                        )
                        done();
                    })
                    .catch(function(err) {
                        console.log(err)
                        assert.fail(err)
                        done();
                    })


            }, 500)

        });
    });

});

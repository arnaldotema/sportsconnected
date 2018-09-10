var express = require('express');
const passport = require('passport');
var router = express.Router();
var UserController = require('../controllers/user_controller.js');
const jwt = require('jsonwebtoken');

/*
 * GET
 */
//router.get('/', UserController.list);

/*
 * GET
 */
//router.get('/:id', UserController.show);

/*
 * POST
 */
router.post('/', passport.authenticate('signup', { session : false }) , UserController.signup);

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     try {
        if(err || !user){
            const error = new Error('An Error occured')
            return next(error);
        }
        req.login(user, { session : false }, async (error) => {
            if( error ) return next(error)
            //We don't want to store the sensitive information such as the
            //user password in the token so we pick only the email and id
            const body = { _id : user._id, email : user.email };
            //Sign the JWT token and populate the payload with the user email and id
            const token = jwt.sign({ user : body },'top_secret');
            //Send back the token to the user
            return res.json({ token });
        });     } catch (error) {
        return next(error);
    }
    })(req, res, next);
});

/*
 * PUT
 */
//router.put('/:id', UserController.update);

/*
 * DELETE
 */
//router.delete('/:id', UserController.remove);

module.exports = router;

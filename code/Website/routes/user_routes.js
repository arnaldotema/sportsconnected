var express = require('express');
const passport = require('passport');
var router = express.Router();
var UserController = require('../controllers/user_controller.js');
const jwt = require('jsonwebtoken');

router.post('/', passport.authenticate('signup', { session : false }) , async (req, res, next) => {     try {
     const user = req.user._doc;

    if(!user){
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
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     try {
        if(err || !user){
            let error_message = user? 'An Error occured' : 'No such user';
            const error = new Error(error_message)
            return next(error);
        }
        req.login(user, { session : false }, async (error) => {
            if( error ) return next(error)
            //We don't want to store the sensitive information such as the
            //user password in the token so we pick only the email, user id and profile id (player id, coach id or any other user type id)
            const body = { _id : user._id, email : user.email, profile_id : user.player};
            //Sign the JWT token and populate the payload with the user email and id
            const token = jwt.sign({ user : body },'top_secret');
            //Send back the token to the user
            return res.json({ token: token, _id: body._id, profile_id: body.profile_id });
        });     } catch (error) {
        return next(error);
    }
    })(req, res, next);
});

router.post('/:id/aggregate-profile', UserController.aggregate_profile);


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

// --------------------------------------------

/*
 * PUT
 */
//router.put('/:id', UserController.update);

/*
 * DELETE
 */
//router.delete('/:id', UserController.remove);

module.exports = router;

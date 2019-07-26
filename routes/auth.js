let express = require('express');
let router = express.Router();
const authService = require('../services/auth.service');
const userService = require('../services/user.service');

router.post('/login', async (req, res, next) => {
    try {
        let data = await authService.login(req.body);
        return res.json({user: data.userData, token: data.token});
    }
    catch (err) {
        next(err);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        let data = await userService.create(req.body);
        return res.json({user: data.userData, token: data.token});
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;

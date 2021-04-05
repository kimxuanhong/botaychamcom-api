const express = require('express');
const router = express.Router();
var { validationResult } = require('express-validator');
const logger = require('../config/logger');

const userSerervice = require('../service/UserService');
const { validateRegisterUser } = require('../validate/UserRegisterValidator');


router.get('/', async function (req, res, next) {
    try {
        res.json(await userSerervice.getMultiple(req.query.page));
    } catch (err) {
        logger.error(`Error while getting userSerervice `, err.message);
        next(err);
    }
});

router.post('/', validateRegisterUser(), async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error(errors.array());
        res.status(422).json({ errors: errors.array() });
        return;
    }

    try {
        logger.log(req.body);
        res.json(await userSerervice.create(req.body));
    } catch (err) {
        logger.error(`Error while creating user`, err.message);
        next(err);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await userSerervice.update(req.params.id, req.body));
    } catch (err) {
        logger.error(`Error while updating user`, err.message);
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await userSerervice.remove(req.params.id));
    } catch (err) {
        logger.error(`Error while deleting user`, err.message);
        next(err);
    }
})


module.exports = router;
const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', function (req, res) {
    const filterUser = req.query.name || null;
    console.log(filterUser);
    controller.getUsers(filterUser)
        .then((userList) => {
            response.success(req, res, userList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })

});

router.post('/', function (req, res) {
    controller.addUser(req.body.name)
        .then(data => {
            response.success(req, res, data, 200);

        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

module.exports = router;
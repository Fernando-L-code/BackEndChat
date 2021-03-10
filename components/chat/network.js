const express = require('express');
const response = require('../../network/response');
const controller = require ('./controller');

const router = express.Router();

router.get('/', function(req, res){
    const filterMessages = req.query.user || null;
    filterMessages?console.log('filtro '+filterMessages):console.log('sin filtro ');

    controller.getchats(filterMessages)
        .then((usersList)=>{
            response.success(req,res,usersList,200); 
        })
        .catch(e=>{
            response.error( req, res, 'Unexpected Error', 500, e);
        })

})

router.post('/', function(req, res){
    // console.log(req.body.users);
    controller.addUsersChat(req.body.users)
        .then((data)=>{
            response.success(req,res,data, 201); 
        })
        .catch(e=>{
            response.error(req,res,"Informacion invalida", 400, e)
        });

})

module.exports = router;
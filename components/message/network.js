const express = require('express');
const response = require('../../network/response');
const controller = require ('./controller');
const multer = require('multer');
const router = express.Router();


const upload = multer({
    dest: 'uploads/',
});
//listar todos o por usuario
router.get('/', function(req, res){
    const filterMessages = req.query.chat || null;
    filterMessages?console.log('filtro '+filterMessages):console.log('sin filtro ');

    controller.getMessage(filterMessages)
        .then((messageList)=>{
            response.success(req,res,messageList,200); 
        })
        .catch(e=>{
            response.error( req, res, 'Unexpected Error', 500, e);
        })

})

//crear
router.post('/',upload.single('file'), function(req, res){
    console.log(req.body.chat);
    controller.addMessage(req.body.chat, req.body.user, req.body.message)
        .then((fullMessage)=>{
            response.success(req,res,fullMessage, 201); 
        })
        .catch(e=>{
            response.error(req,res,"Informacion invalida", 400, e)
        });

})

//modificar 
router.patch('/:id', function ( req, res) {
    controller.updateMessage(req.params.id, req.body.message)
        .then((data)=>{
            response.success(req, res, data, 200);
        })
        .catch(e=>{
            response.error(req, res, 'Error interno', 500, e);
        })
})

router.delete('/:id', function ( req, res) {
    console.log(req.params.id);
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
})


module.exports = router;
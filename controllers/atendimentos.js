const Atendimento = require('../models/atendimentos');
var {check, validationResult} = require('express-validator');

module.exports = app => {

  app.get('/atendimentos', (req, res)=>{
    Atendimento.lista(res);
  })

  app.get('/atendimentos/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    Atendimento.buscaPorId(id,res);
  });

  app.post('/atendimentos',
  [
  check('cliente').isLength(5).withMessage("entre com name").isAlpha().withMessage("name somente com alfabeto"),
  check('servico').isLength(10).withMessage("entre name").isAlpha().withMessage("maior que 10")
  ],
  (req,res)=>{

    var erro = validationResult(req);

    if(!erro.isEmpty()){
      res.status(400).json(erro);
    }else{
      const atendimento = req.body;
      Atendimento.adiciona(atendimento,res);
    }


  });

  app.put('/atendimentos/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const atendimento = req.body;
    Atendimento.updatePorId(id,atendimento,res);
  });

  app.delete('/atendimentos/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    Atendimento.deletePorId(id,res);
  });


}
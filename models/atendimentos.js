const moment = require('moment');
const conexao = require('../infraestrutura/conexao');
const atendimentos = require('../controllers/atendimentos');

moment.locale('pt-br');

class Atendimento {

  async adiciona(atendimento, res) 
  {
    const data = moment(atendimento.data, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD HH:mm:ss');
    const dt_cadastro = moment().format('YYYY-MM-DD HH:mm:ss');

    conexao.connect().then(() => {

      const sql = `INSERT INTO Atendimentos (cliente,pet,servico,status,observacoes,data,dt_cadastro) 
                  values (
                  '${atendimento.cliente}',
                  '${atendimento.pet}',
                  '${atendimento.servico}', 
                  '${atendimento.status}', 
                  '${atendimento.observacoes}',
                  '${data}',
                  '${dt_cadastro}')
                  
                  SELECT * FROM Atendimentos where ID = SCOPE_IDENTITY()

                  ` ;

      conexao.query(sql, (err, result) => 
      {
          if (err) {
            console.log(sql);
            console.log(err);
            res.status(400).json(err);
          } else {
            console.log(sql);
            console.log(atendimento);
            res.status(201).json(result.recordset[0]);
          }
      });

    })
  }

  async lista(res) 
  {

    conexao.connect().then(() => {

      const sql = `SELECT * FROM Atendimentos`;

      conexao.query(sql, (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json(result.recordset);
          }
      });

    });
  }

  async buscaPorId(id,res) 
  {

    conexao.connect().then(() => {

      const sql = `SELECT * FROM Atendimentos where id = ${id}`;

      conexao.query(sql, (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json(result.recordset[0]);
          }
      });

    });
  }

  async updatePorId(id,atendimento,res) 
  {

    conexao.connect().then(() => {

      const data = moment(atendimento.data, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD HH:mm:ss');
      console.log(atendimento.data, data);

      const sql = `UPDATE Atendimentos 
                  SET 
                      cliente = '${atendimento.cliente}',
                      pet = '${atendimento.pet}',
                      servico = '${atendimento.servico}', 
                      status = '${atendimento.status}', 
                      observacoes = '${atendimento.observacoes}',
                      data = '${data}'
                  WHERE id = ${id}

      
      SELECT * FROM Atendimentos where ID = ${id}

      ` ;

      conexao.query(sql, (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json(result.recordset);
          }
      });

    });
  }

  async deletePorId(id,res) 
  {

    conexao.connect().then(() => {

      const sql = `DELETE FROM Atendimentos where id = ${id}`;

      conexao.query(sql, (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(204).json();
          }
      });

    });
  }


}

module.exports = new Atendimento;
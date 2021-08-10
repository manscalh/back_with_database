const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');

conexao.connect(err => {
  if (err) {
    console.log('falha ao connectar', err);
  } else {

    console.log('conectado com sucesso!');

    Tabelas.init(conexao);

    const app = customExpress();
    const port = process.env.PORT || 3333

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    })
  }
})



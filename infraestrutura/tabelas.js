class Tabelas{
  init(conexao){
    this.conexao = conexao;
    this.criarAtendimentos();
  }

  criarAtendimentos(){
    const sql = `
      IF NOT EXISTS(SELECT * FROM sysobjects where name = 'Atendimentos' and xtype='U')
      BEGIN
      CREATE TABLE Atendimentos(
        id int IDENTITY(1,1)  PRIMARY KEY NOT NULL,
        Cliente varchar(50) NOT NULL,
        pet varchar(20) NOT NULL,
        servico varchar(20) NOT NULL,
        status varchar(20) NOT NULL,
        Observacoes varchar(250) NOT NULL,
        data smalldatetime NOT NULL,
        dt_Cadastro smalldatetime NOT NULL
      )  
      END
    `
    this.conexao.query(sql, (erro) => {
      if (erro){
        console.log(erro);
      }else{
        console.log('Tabela Atendimentos criada com sucesso!');
      }
    })
  }
}

module.exports = new Tabelas;
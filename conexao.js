const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: '',
    database: 'bd_sistema_senai2',
    dateStrings: true
});
db.connect((erro)=>{
    if(erro){
        console.log('Erro ao conectar ao banco de dados');
        console.log(erro.message);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso');
});
module.exports = db;

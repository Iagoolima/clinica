const express = require('express');
const app = express();

const cors = require('cors')

app.use(cors());
app.use(express.json());

//C
const createUser = require('./modules/create-user/index');
const agendaCreate = require('./modules/create-agenda/index')

//R
const readUser = require('./modules/read-user/index')
const readAgenda = require('./modules/read-agenda/index')

//U
const updateUser = require('./modules/update-user/index')

//D
const deleteUser = require('./modules/delete-user/index')
const deleteAgenda = require('./modules/delete-agenda/index')







//C
app.use('/clientes/create', createUser);
app.use('/agenda/create', agendaCreate)

//R
app.use('/clientes/read', readUser);
app.use('/agenda/read', readAgenda);


//U
app.use('/clientes/update', updateUser)


//D
app.use('/clientes/delete', deleteUser)
app.use('/agenda/delete', deleteAgenda)












const database = require('./database');




app.listen(3001, async () => {
  try {

    console.log('Conexão com o banco de dados estabelecida com sucesso');
    console.log('Servidor Express rodando na porta 3001');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
});

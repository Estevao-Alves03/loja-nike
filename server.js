import express from "express";
import sequelize from "./config/database";
import routes from  './routes'

const app = express()

app.use('/api', routes)

sequelize.authenticate()
.then(() => console.log('conexao com o banco de dados estabelicida com sucesso'))
.catch((error) => console.error('nao foi possivel se conectar com o banco de dados', error))

const PORT = process.env.DB_PORT || 5433
app.listen(PORT, () => {
   console.log(`servidor rodando na porta ${PORT}`)
})
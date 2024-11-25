import { Router } from "express";
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')

const router = Router()

// rotas de usuarios : 
// buscando por todos usuarios e por usuario especifico
router.get('/users', UserController.findAll)
router.get('/users/:id', UserController.findById)
// criando um usuario novo
router.post('/users', UserController.create)
// atualizando os dados do usuario
router.put('/users/:id', UserController.update)
// deletando o usuario
router.delete('/users/:id', UserController.destroy)
// autenticando o usuario cadastrado
router.post('/login', UserController.login)

// rotas de produtos : 
// buscando os produtos e um produto especifico
router.get('/products', ProductController.findAll)
router.get('/products/:id', ProductController.findById)
// criando um produto novo 
router.post('/products', ProductController.create)
// atualizando um produto 
router.put('/products/:id', ProductController.update)
//deletando um produto 
router.delete('/products/:id', ProductController.destroy)


export default router
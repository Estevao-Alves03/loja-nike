import Product from '../models/Products';
import { Request, Response } from "express";

const ProductController = {
    // Buscar todos os produtos
    async findAll(req: Request, res: Response) {
        try {
            const products = await Product.findAll(); 
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Produtos não encontrados' });
        }
    },

    // Buscar produto pelo ID
    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar o produto' });
        }
    },

    // Criar um novo produto
    async create(req: Request, res: Response) {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar o produto' });
        }
    },

    // Atualizar o produto
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const [numberOfAffectedRows] = await Product.update(updateData, {
                where: { id }
            });

            if (numberOfAffectedRows === 0) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            const updateProduct = await Product.findByPk(id)
            res.json(updateProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar o produto' });
        }
    },

    // Deletar o produto
    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleteProduct = await Product.destroy({
                where: { id }
            });

            if (deleteProduct === 0) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            res.status(204).send(); // Retorno de sucesso, sem conteúdo
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar o produto' });
        }
    }
};

export default ProductController;

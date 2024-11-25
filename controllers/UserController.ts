import users from "../models/User"; // Ajuste a importação para refletir o modelo correto
import { Request, Response } from "express";

const UserController = {
    // Buscando todos os usuários
    async findAll(req: Request, res: Response) {
        try {
            const allUsers = await users.findAll();
            res.json(allUsers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar usuários" });
        }
    },

    // Buscando usuário por ID
    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await users.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar usuário" });
        }
    },

    // Criando novo usuário
    async create(req: Request, res: Response) {
        try {
            const newUser = await users.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Não foi possível criar o usuário" });
        }
    },

    // Atualizando o usuário
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const [numberOfAffectedRows] = await users.update(updateData, {
                where: { id_user: id },
            });

            if (numberOfAffectedRows === 0) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            const updatedUser = await users.findByPk(id); 
            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao atualizar o usuário" });
        }
    },

    // Deletando o usuário
    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const deleteUser = await users.destroy({
                where: { id_user: id },
            });

            if (!deleteUser) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao deletar o usuário" });
        }
    },
};

export default UserController;

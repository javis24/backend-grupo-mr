import Client from "../models/ClientModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getClients = async (req, res) => {
    try {
        let response;
        if (req.role === "admin" || req.role === "gerencia") {
            response = await Client.findAll({
                attributes: [
                    'uuid', 'fullName', 'contactName', 'contactPhone', 'position'],
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await Client.findAll({
                attributes: [
                    'uuid', 'fullName', 'contactName', 'contactPhone', 'position'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getClientById = async (req, res) => {
    try {
        const client = await Client.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!client) return res.status(404).json({ msg: "Datos no encontrados" });
        let response;
        if (req.role === "admin" || req.role === "gerencia") {
            response = await Client.findOne({
                attributes: [
                    'uuid', 'fullName', 'contactName', 'contactPhone', 'position'],
                where: {
                    id: client.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await Client.findOne({
                attributes: [
                  'uuid', 'fullName', 'contactName', 'contactPhone', 'position'],
                where: {
                    [Op.and]: [{ id: client.id }, { userId: req.userId }]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createClient = async (req, res) => {
    const { fullName, contactName, contactPhone, position } = req.body;

    try {
        await Client.create({
            fullName,
            contactName,
            contactPhone,
            position,
            userId: req.userId
        });
        res.status(201).json({ msg: "Cliente creado con éxito" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateClient = async (req, res) => {
    try {
        const client = await Client.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!client) return res.status(404).json({ msg: "Datos no encontrados" });
        const {
            fullName, contactName, contactPhone, position
        } = req.body;

        if (req.role === "admin" || req.role === "gerencia") {
            await Client.update({
                fullName, contactName, contactPhone, position
            }, {
                where: {
                    id: client.id
                }
            });
        } else {
            if (req.userId !== client.userId) return res.status(403).json({ msg: "Acceso prohibido" });
            await Client.update({
                fullName, contactName, contactPhone, position
            }, {
                where: {
                    [Op.and]: [{ id: client.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Cliente actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteClient = async (req, res) => {
    try {
        const client = await Client.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!client) return res.status(404).json({ msg: "Datos no encontrados" });
        if (req.role === "admin" || req.role === "gerencia") {
            await Client.destroy({
                where: {
                    id: client.id
                }
            });
        } else {
            if (req.userId !== client.userId) return res.status(403).json({ msg: "Acceso prohibido" });
            await Client.destroy({
                where: {
                    [Op.and]: [{ id: client.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Cliente eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

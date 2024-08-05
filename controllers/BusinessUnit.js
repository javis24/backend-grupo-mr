import BusinessUnit from "../models/BusinessUnitModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getBusinessUnits = async (req, res) => {
    try {
        let response;
        if (req.role === "admin" || req.role === "gerencia") {
            response = await BusinessUnit.findAll({
                attributes: ['uuid', 'unitName', 'description', 'sales'],
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await BusinessUnit.findAll({
                attributes: ['uuid', 'unitName', 'description', 'sales'],
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

export const getBusinessUnitById = async (req, res) => {
    try {
        const businessUnit = await BusinessUnit.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!businessUnit) return res.status(404).json({ msg: "Datos no encontrados" });
        let response;
        if (req.role === "admin" || req.role === "gerencia") {
            response = await BusinessUnit.findOne({
                attributes: ['uuid', 'unitName', 'description', 'sales'],
                where: {
                    id: businessUnit.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await BusinessUnit.findOne({
                attributes: ['uuid', 'unitName', 'description', 'sales'],
                where: {
                    [Op.and]: [{ id: businessUnit.id }, { userId: req.userId }]
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

export const createBusinessUnit = async (req, res) => {
    const { unitName, description, sales } = req.body;
    try {
        await BusinessUnit.create({
            unitName,
            description,
            sales,
            userId: req.userId
        });
        res.status(201).json({ msg: "Unidad de negocio creada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateBusinessUnit = async (req, res) => {
    try {
        const businessUnit = await BusinessUnit.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!businessUnit) return res.status(404).json({ msg: "Datos no encontrados" });
        const { unitName, description, sales } = req.body;
        if (req.role === "admin" || req.role === "gerencia") {
            await BusinessUnit.update({ unitName, description, sales }, {
                where: {
                    id: businessUnit.id
                }
            });
        } else {
            if (req.userId !== businessUnit.userId) return res.status(403).json({ msg: "Acceso prohibido" });
            await BusinessUnit.update({ unitName, description, sales }, {
                where: {
                    [Op.and]: [{ id: businessUnit.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Unidad de negocio actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteBusinessUnit = async (req, res) => {
    try {
        const businessUnit = await BusinessUnit.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!businessUnit) return res.status(404).json({ msg: "Datos no encontrados" });
        if (req.role === "admin" || req.role === "gerencia") {
            await BusinessUnit.destroy({
                where: {
                    id: businessUnit.id
                }
            });
        } else {
            if (req.userId !== businessUnit.userId) return res.status(403).json({ msg: "Acceso prohibido" });
            await BusinessUnit.destroy({
                where: {
                    [Op.and]: [{ id: businessUnit.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Unidad de negocio eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

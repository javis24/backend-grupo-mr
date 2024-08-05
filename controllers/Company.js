import Company from "../models/CompanyModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getCompanies = async (req, res) => {
    try {
        let response;
        if (req.role === "admin" || req.role === "gerencia") {
            response = await Company.findAll({
                attributes: ['uuid', 'companyName', 'phone', 'interactionDate', 'product', 'paymentMethod', 'branch', 'prospects'],
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await Company.findAll({
                attributes: ['uuid', 'companyName', 'phone', 'interactionDate', 'product', 'paymentMethod', 'branch', 'prospects'],
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

export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!company) return res.status(404).json({ msg: "Datos no encontrados" });
        let response;
        if (req.role === "admin" || req.role === "gerencia") {
            response = await Company.findOne({
                attributes: ['uuid', 'companyName', 'phone', 'interactionDate', 'product', 'paymentMethod', 'branch', 'prospects'],
                where: {
                    id: company.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await Company.findOne({
                attributes: ['uuid', 'companyName', 'phone', 'interactionDate', 'product', 'paymentMethod', 'branch', 'prospects'],
                where: {
                    [Op.and]: [{ id: company.id }, { userId: req.userId }]
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

export const createCompany = async (req, res) => {
    const { companyName, phone, interactionDate, product, paymentMethod, branch, prospects } = req.body;
    try {
        await Company.create({
            companyName,
            phone,
            interactionDate,
            product,
            paymentMethod,
            branch,
            prospects,
            userId: req.userId
        });
        res.status(201).json({ msg: "Empresa creada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const company = await Company.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!company) return res.status(404).json({ msg: "Datos no encontrados" });
        const { companyName, phone, interactionDate, product, paymentMethod, branch, prospects } = req.body;
        if (req.role === "admin" || req.role === "gerencia") {
            await Company.update({ companyName, phone, interactionDate, product, paymentMethod, branch, prospects }, {
                where: {
                    id: company.id
                }
            });
        } else {
            if (req.userId !== company.userId) return res.status(403).json({ msg: "Acceso prohibido" });
            await Company.update({ companyName, phone, interactionDate, product, paymentMethod, branch, prospects }, {
                where: {
                    [Op.and]: [{ id: company.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Empresa actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!company) return res.status(404).json({ msg: "Datos no encontrados" });
        if (req.role === "admin" || req.role === "gerencia") {
            await Company.destroy({
                where: {
                    id: company.id
                }
            });
        } else {
            if (req.userId !== company.userId) return res.status(403).json({ msg: "Acceso prohibido" });
            await Company.destroy({
                where: {
                    [Op.and]: [{ id: company.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Empresa eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

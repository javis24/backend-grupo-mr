import Event from "../models/EventModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getEvents = async (req, res) => {
    try {
        let response;
        if (req.role === "admin" || req.role === "gerencia") {
            response = await Event.findAll({
                attributes: ['uuid', 'description', 'date', 'timeOfDay'],
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await Event.findAll({
                attributes: ['uuid', 'description', 'date', 'timeOfDay'],
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

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!event) return res.status(404).json({ msg: "Evento no encontrado" });
        let response;
        if (req.role === "admin" || req.role === "gerencia") {
            response = await Event.findOne({
                attributes: ['uuid', 'description', 'date', 'timeOfDay'],
                where: {
                    id: event.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await Event.findOne({
                attributes: ['uuid', 'description', 'date', 'timeOfDay'],
                where: {
                    [Op.and]: [{ id: event.id }, { userId: req.userId }]
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

export const createEvent = async (req, res) => {
    const { description, date, timeOfDay } = req.body;
    try {
        await Event.create({
            description,
            date,
            timeOfDay,
            userId: req.userId
        });
        res.status(201).json({ msg: "Evento creado con éxito" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!event) return res.status(404).json({ msg: "Evento no encontrado" });
        const { description, date, timeOfDay } = req.body;
        if (req.role === "admin" || req.role === "gerencia") {
            await Event.update({ description, date, timeOfDay }, {
                where: {
                    id: event.id
                }
            });
        } else {
            if (req.userId !== event.userId) return res.status(403).json({ msg: "Acceso prohibido" });
            await Event.update({ description, date, timeOfDay }, {
                where: {
                    [Op.and]: [{ id: event.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Evento actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!event) return res.status(404).json({ msg: "Evento no encontrado" });
        if (req.role === "admin" || req.role === "gerencia") {
            await Event.destroy({
                where: {
                    id: event.id
                }
            });
        } else {
            if (req.userId !== event.userId) return res.status(403).json({ msg: "Acceso prohibido" });
            await Event.destroy({
                where: {
                    [Op.and]: [{ id: event.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Evento eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

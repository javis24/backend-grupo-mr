import TrafficLight from "../models/TrafficLightModel.js";

export const getTrafficLightStatus = async (req, res) => {
    try {
        const status = await TrafficLight.findOne({
            where: { uuid: req.params.id }
        });
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateTrafficLightStatus = async (req, res) => {
    const { status } = req.body;
    try {
        await TrafficLight.update({ 
            status: status,
            lastScanned: new Date()
        }, {
            where: { uuid: req.params.id }
        });
        res.status(200).json({ msg: "Semáforo actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const dataMapper = require('../dataMapper');
const moment = require('moment');

const statController = {

    monthlyOccupation: async (req, res) => {
        try {

            const monthlyStats = await dataMapper.getMonthlyOccupation();

            res.send(monthlyStats);

        } catch(err) {
            console.trace(err);
            res.status(500).send(err);
        }
    },

    monthlyRoomDetailsOccupation: async (req, res) => {

        try {

            const monthlyRoomsStats = await dataMapper.getMonthlyRoomDetailsOccupation();

            res.send(monthlyRoomsStats);

        } catch(err) {
            console.trace(err);
            res.status(500).send(err);
        }

    },

    weeklyOccupation: async (req, res) => {

        try {

            const weeklyStats = await dataMapper.getWeeklyOccupation();

            res.send(weeklyStats);

        } catch(err) {
            console.trace(err);
            res.status(500).send(err);
        }

    },

    weeklyRoomDetailsOccupation: async (req, res) => {

        try {

            const weeklyRoomStats = await dataMapper.getWeeklyRoomDetailsOccupation();

            res.send(weeklyRoomStats);

        } catch(err) {
            console.trace(err);
            res.status(500).send(err);
        }

    }

};

module.exports = statController;
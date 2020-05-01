const dataMapper = require('../dataMapper');

const embalmerController = {

    allEmbalmers: async (req, res) => {
        try {

            const embalmers = await dataMapper.getAllEmbalmers();

            res.send(embalmers);

        } catch(err){
            console.trace(err);
            res.status(500).send(500, {err});
        }
    }
};

module.exports = embalmerController;
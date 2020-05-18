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
    },

    oneEmbalmer: async (req, res) => {
        try {
            const embalmerId = req.params.id;

            const embalmer = await dataMapper.getOneEmbalmer(embalmerId);

            res.send(embalmer);

        } catch(err){
            console.trace(err);
            res.status(500).send(500, {err});
        }
    },

    newEmbalmer: async (req, res) => {
        try {
            // console.log(req.body);
            if (!req.body.firstname || !req.body.lastname || !req.body.address || !req.body.zip_code || !req.body.city || !req.body.email) {
                return res.send('Veuillez remplir tous les champs obligatoires');
            }

            let result = await dataMapper.addEmbalmer(req.body);
            // console.log(result);

            if (result === 'Ce thanatopracteur existe déjà') {
                res.status(401).send(result);
            } else {
                res.redirect('/embalmer/list');
            }

        } catch(err){
            console.trace(err);
            res.status(500).send(500, {err});
        }
    },

    updateEmbalmer: async (req, res) => {
        try {

            const embalmerId = req.params.id;
            const updatedEmbalmer = await dataMapper.updateEmbalmer(embalmerId, req.body);

            res.send(updatedEmbalmer);

        } catch(err){
            console.trace(err);
            res.status(500).send(500, {err});
        }
    },

    deleteOneEmbalmer: async (req, res) => {
        try {

            const embalmerId = req.params.id;
            const deletedEmbalmer = await dataMapper.deleteEmbalmer(embalmerId);

            if (deletedEmbalmer) {
                res.send(`Thanatopracteur supprimé`);
            } else {
                res.send(`Suppression échouée`);
            }

        } catch(err){
            console.trace(err);
            res.status(500).send(err);
        }
    },
};

module.exports = embalmerController;
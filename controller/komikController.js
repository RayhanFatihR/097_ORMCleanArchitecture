const db = require('../models');

async function getAllKomik(req, res) {
    try {
        const komik = await db.Komik.findAll();
        res.status(200).json(komik);
    } catch (error) {
        console.error('Error retrieving komik:', error.message);
        res.status(500).json({ error: 'An error occurred while retrieving komik.' });
    }
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found.' });
        }
        res.status(200).json(komik);
    } catch (error) {
        console.error('Error retrieving komik:', error.message);
        res.status(500).json({ error: 'An error occurred while retrieving komik.' });
    }
}

async function updateKomik(req, res) {
    const { id } = req.params;
    const { title, description, author } = req.body;

    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found.' });
        }
        komik.title = title;
        komik.description = description;
        komik.author = author;
        await komik.save();
        res.status(200).json(komik);
    } catch (error) {
        console.error('Error updating komik:', error.message);
        res.status(500).json({ error: 'An error occurred while updating komik.' });
    }
}

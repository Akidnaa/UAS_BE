const Alumni = require('../models/Alumni');

const index = (req, res) => {
    const data = Alumni.getAll();
    if (data.length > 0) {
        res.status(200).json({
            message: 'Get All Resource',
            data,
        });
    } else {
        res.status(200).json({
            message: 'Data is empty',
        });
    }
};

const store = (req, res) => {
    const { name, phone, address, graduation_year, status, company_name, position } = req.body;

    // Validation
    if (!name || !phone || !address || !graduation_year || !status) {
        return res.status(422).json({
            message: 'All fields must be filled correctly',
        });
    }

    const newAlumni = Alumni.create(req.body);
    res.status(201).json({
        message: 'Resource is added successfully',
        data: newAlumni,
    });
};

const update = (req, res) => {
    const updatedAlumni = Alumni.update(req.params.id, req.body);

    if (updatedAlumni) {
        res.status(200).json({
            message: 'Resource is update successfully',
            data: updatedAlumni,
        });
    } else {
        res.status(404).json({
            message: 'Resource not found',
        });
    }
};

const destroy = (req, res) => {
    const result = Alumni.delete(req.params.id);

    if (result) {
        res.status(200).json({
            message: 'Resource is delete successfully',
        });
    } else {
        res.status(404).json({
            message: 'Resource not found',
        });
    }
};

const show = (req, res) => {
    const alumni = Alumni.find(req.params.id);

    if (alumni) {
        res.status(200).json({
            message: 'Get Detail Resource',
            data: alumni,
        });
    } else {
        res.status(404).json({
            message: 'Resource not found',
        });
    }
};

const search = (req, res) => {
    const result = Alumni.search(req.params.name);

    if (result.length > 0) {
        res.status(200).json({
            message: 'Get searched resource',
            data: result,
        });
    } else {
        res.status(404).json({
            message: 'Resource not found',
        });
    }
};

const freshGraduate = (req, res) => {
    const result = Alumni.findByStatus('fresh-graduate');

    res.status(200).json({
        message: 'Get fresh graduate resource',
        total: result.length,
        data: result,
    });
};

const employed = (req, res) => {
    const result = Alumni.findByStatus('employed');

    res.status(200).json({
        message: 'Get employed resource',
        total: result.length,
        data: result,
    });
};

const unemployed = (req, res) => {
    const result = Alumni.findByStatus('unemployed');

    res.status(200).json({
        message: 'Get unemployed resource',
        total: result.length,
        data: result,
    });
};

module.exports = { index, store, update, destroy, show, search, freshGraduate, employed, unemployed };

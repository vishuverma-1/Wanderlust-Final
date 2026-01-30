const Package = require('../models/Package');

const getPackages = async (req, res) => {
    const packages = await Package.find({});
    res.json(packages);
};

const getPackageById = async (req, res) => {
    const pkg = await Package.findById(req.params.id);
    if (pkg) {
        res.json(pkg);
    } else {
        res.status(404).json({ message: 'Package not found' });
    }
};

const createPackage = async (req, res) => {
    const { title, description, price, duration, location, image, activities } = req.body;
    const pkg = new Package({ title, description, price, duration, location, image, activities });
    const createdPackage = await pkg.save();
    res.status(201).json(createdPackage);
};

const updatePackage = async (req, res) => {
    const { title, description, price, duration, location, image, activities } = req.body;
    const pkg = await Package.findById(req.params.id);

    if (pkg) {
        pkg.title = title;
        pkg.description = description;
        pkg.price = price;
        pkg.duration = duration;
        pkg.location = location;
        pkg.image = image;
        pkg.activities = activities;
        const updatedPackage = await pkg.save();
        res.json(updatedPackage);
    } else {
        res.status(404).json({ message: 'Package not found' });
    }
};

const deletePackage = async (req, res) => {
    const pkg = await Package.findById(req.params.id);
    if (pkg) {
        await pkg.deleteOne();
        res.json({ message: 'Package removed' });
    } else {
        res.status(404).json({ message: 'Package not found' });
    }
};

module.exports = { getPackages, getPackageById, createPackage, updatePackage, deletePackage };

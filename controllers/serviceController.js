const fs = require("fs");
const path = require("path");
const generateId = require("../utils/generateId");

const dataPath = path.join(__dirname, "../data.json");

const getAllServices = (req, res, next) => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    const services = JSON.parse(data);
    res.status(200).json(services);
  } catch (err) {
    next(err);
  }
};

// Crear un nuevo servicio
const createService = (req, res, next) => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    const services = JSON.parse(data);

    const nuevoServicio = {
      id: generateId(),
      ...req.body,
    };

    services.push(nuevoServicio);
    fs.writeFileSync(dataPath, JSON.stringify(services, null, 2));

    res.status(201).json({ message: "Servicio creado", data: nuevoServicio });
  } catch (err) {
    next(err);
  }
};

const getServiceById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = fs.readFileSync(dataPath, "utf-8");
    const services = JSON.parse(data);

    const service = services.find((s) => s.id === id);
    if (!service) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json(service);
  } catch (err) {
    next(err);
  }
};

const updateService = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = fs.readFileSync(dataPath, "utf-8");
    const services = JSON.parse(data);

    const index = services.findIndex((s) => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    services[index] = { id, ...req.body };
    fs.writeFileSync(dataPath, JSON.stringify(services, null, 2));

    res
      .status(200)
      .json({ message: "Servicio actualizado", data: services[index] });
  } catch (err) {
    next(err);
  }
};

const deleteService = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = fs.readFileSync(dataPath, "utf-8");
    let services = JSON.parse(data);

    const index = services.findIndex((s) => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    const deleted = services.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify(services, null, 2));

    res.status(200).json({ message: "Servicio eliminado", data: deleted[0] });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
};

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data.json");

const generateId = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  const services = JSON.parse(data);
  const last = services[services.length - 1];
  return last ? last.id + 1 : 1;
};

module.exports = generateId;

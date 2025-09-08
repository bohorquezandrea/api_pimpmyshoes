require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const serviceRoutes = require("./routes/serviceRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/services", serviceRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

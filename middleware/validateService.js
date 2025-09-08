const Joi = require("joi");

const serviceSchema = Joi.object({
  nombre: Joi.string().min(3).required(),
  descripcion: Joi.string().allow("").optional(),
  precio: Joi.number().positive().required(),
  duracion_estimada: Joi.number().positive().required(),
  fecha_creacion: Joi.date().iso().required(),
});

const validateService = (req, res, next) => {
  const { error } = serviceSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: "Validación fallida",
      details: error.details.map((e) => e.message),
    });
  }

  next();
};

module.exports = validateService;

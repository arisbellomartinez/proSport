const Espacio = require('../models/espacios.model'); // Importa el modelo

// Obtener todos los espacios
const obtenerTodos = (req, res) => {
  Espacio.find()
    .then((espacios) => {
      res.json(espacios);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
  });
};

// Obtener un espacio por su ID
const obtenerPorId = (req, res) => {
  Espacio.findById(req.params.id)
    .then((espacio) => {
      if (!espacio) {
        return res.status(404).json({ mensaje: 'Espacio no encontrado' });
      }
      res.json(espacio);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Crear un nuevo espacio
const crear = async (req, res) => {
  const {
    propietario,
    deporte,
    nombre,
    descripcion,
    fotosAgregadas,
    cantidadDeParticipantes,
    fechaReserva,
    horaInicio,
    horaFin
  } = req.body;
  const nuevoEspacio = await Espacio.create({
    propietario,
    deporte,
    nombre,
    descripcion,
    fotos: fotosAgregadas,
    cantidadDeParticipantes,
    fechaReserva,
    horaInicio,
    horaFin
  });
  
  res.json(nuevoEspacio)
};

// Actualizar un espacio por su ID
const actualizar = (req, res) => {
  Espacio.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((espacio) => {
      if (!espacio) {
        return res.status(404).json({ mensaje: 'Espacio no encontrado' });
      }
      res.json(espacio);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Eliminar un espacio por su ID
const eliminar = (req, res) => {
  Espacio.findByIdAndDelete(req.params.id)
    .then((espacio) => {
      if (!espacio) {
        return res.status(404).json({ mensaje: 'Espacio no encontrado' });
      }
      res.json({ mensaje: 'Espacio eliminado' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};

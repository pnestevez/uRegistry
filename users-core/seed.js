const User = require('./models/User');
require('./db');

const independiente = {
  firstName: 'Alan',
  lastName: 'Velasco',
  username: 'avelasco',
  address: '815, Ricardo Enrique Bochini 751, Avellaneda, Provincia de Buenos Aires',
  coordinates: {
    lat: -34.6702153,
    lng: -58.3735294,
  },
  password: 'alan10',
};

const racing = {
  firstName: 'Matías',
  lastName: 'Rojas',
  username: 'mrojas',
  address: 'Diego A. Milito, B1870 Avellaneda, Provincia de Buenos Aires',
  coordinates: {
    lat: -34.6677326,
    lng: -58.3704082,
  },
  password: 'matias10',
};

const river = {
  firstName: 'Jorge',
  lastName: 'Carrascal',
  username: 'jcarrascal',
  address: 'Av. Pres. Figueroa Alcorta 7597, C1428 CABA',
  coordinates: {
    lat: -34.5453018,
    lng: -58.4519636,
  },
  password: 'jorge10',
};

const boca = {
  firstName: 'Carlos',
  lastName: 'Tevez',
  username: 'ctevez',
  address: 'Brandsen 805, C1161 CABA',
  coordinates: {
    lat: -34.6357113,
    lng: -58.3647911,
  },
  password: 'carlos10',
};

const lanus = {
  firstName: 'Pedro',
  lastName: 'de la Vega',
  username: 'pdelavega',
  address: 'Ramón Cabrero 2007, B1824 Remedios de Escalada, Provincia de Buenos Aires',
  coordinates: {
    lat: -34.7167606,
    lng: -58.3860222,
  },
  password: 'pedro10',
};

const argentina = {
  firstName: 'Diego Armando',
  lastName: 'Maradona',
  username: 'dmaradona',
  address: 'Avenida Segurola 4310, Buenos Aires',
  coordinates: {
    lat: -34.6006143,
    lng: -58.5190821,
  },
  password: 'diego10',
};

User.insertMany([independiente, racing, river, boca, lanus, argentina]).then(() => {
  console.log('Users created');
  process.exit();
});

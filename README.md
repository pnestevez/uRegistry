# uRegistry

uRegistrt es una aplicación web responsive realizada en React con el framework Next.js, que cuenta con una API REST confeccionada con Node.js para el almacenamiento y la consulta de información en una base de datos no relacional de MongoDB.

En este desarrollo utilicé estrategias de server side rendering, aunque las tareas de fetching se realizan client side, exclusivamente cuando el usuario se encuentra en sesión. Asimismo, llevé adelante una estrategia de local authentication con JWT (JSON Web Token).

El repositorio uRegistry contiene los directorios /users-core e /users-ui, que alojan respectivamente la API y la user interface. En el primero puede correr el comando 'npm run seed', para hidratar la base de datos.

Utilicé ESLint para darle estilo al código, con el formato de Airbnb.

**Nota:** sería prudente desarrollar tests tanto para la API como para la UI, y agregar validaciones a la password para mejorar su seguridad. Por otro lado, cabe destacar que Google Maps puede ser utilizado en modo sandbox sin su API Key, aunque recomiendo cargarla en .env (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=) para mejorar la experiencia del usuario. Tanto Geocoder como Places de Google sí requieren de la Key para su funcionamiento, por lo utilice la segunda de esas opciones y desarrolle una alternativa manual de carga de coordenadas, en caso de que se utilice sin la clave.

## Setup

0- Instalar MongoDB (o bien, con el comando 'docker run -d -p 27017:27017 mongo', en caso de que cuente con Docker)

    brew tap mongodb/brew
    brew install mongodb-community@4.4

1- Clonar el repositorio

    % git clone https://github.com/pnestevez/uRegistry.git

2- Instalar las dependencias

en /uRegistry/users-core

    % npm install
    % npm start

en /uRegistry/users-ui

    % npm install
    % npm start

La UI corre en el puerto 3000, en tanto que la API lo hace en el 3001.

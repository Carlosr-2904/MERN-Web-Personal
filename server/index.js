const mongoose = require('mongoose');
const app = require('./app'); 
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    API_VERSION,
    IP_SERVER
} = require('./constants');

const PORT = process.env.PORT || 3977;


const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        // console.log('La conexión a MongoDB se ha realizado correctamente');
        app.listen(PORT, () => {
            console.log("##################")
            console.log("#### API REST ####")
            console.log("##################")
            console.log(`Servidor corriendo en http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
        });
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1); // Exit the process with an error code
    }
};

connectToDatabase();
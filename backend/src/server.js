const http = require('http');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model.js');

// needs a port number otherwise 8000
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer(){
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();

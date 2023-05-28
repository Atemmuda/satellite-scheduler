const { getAllPlanets } = require('../../models/planets.model')

function httpGetAllPlanet(req, res) {
    return res.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanet,
};

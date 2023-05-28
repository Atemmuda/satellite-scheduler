const { parse } = require('csv-parse')
const fs = require('fs');
const path  = require('path');

// const allPlanets = []
const habitablePlanets = [];

/**
 * isHabitablePlanet - planets are habitable if 
 * 1. its 'koi_disposition' is confirmed and
 * 2. 'koi_insol' > 0.36 and 'koi_insol' < 1.11 and
 * 3. 'koi_prad' < 1.6
 * @param {*} planet which is possibly habitable
 * @returns true if all condition are met otherwise false
 */
function isHabitablePlanet(planet) {
    return (planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6)
}
/**
 * loadPlanetsData - load all the planet from the kepler_data file
 * @returns promise of habitable planets
 */

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }
            ))
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets found`);
                resolve();
            });
    })
}

function getAllPlanets(){
    return habitablePlanets;
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};

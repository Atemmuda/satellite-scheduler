const launches = new Map();

let latestFrightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Keepler Exo X',
    rocket: 'Eplorer IS1',
    launchDate: new Date('August 27, 2029'),
    target: 'Keepler-42 b',
    customers: ['NASA', 'UENR'],
    upcoming: true,
    success: true,
};

// setting the launches to the flightNumber
launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

/**
 * addNewLaunch - adds a new launch to the map of launches.
 * The launches are assignes to the flight number with Object.assign function.
 * @param launch the new launch to add to launches
 */
function addNewLaunch(launch) {
    latestFrightNumber++;
    launches.set(
        latestFrightNumber,
        Object.assign(launch, {
            flightNumber: latestFrightNumber,
            customers: ['UENR', 'NASA'],
            success: true,
            upcoming: true,
        })
    );
}

//checking for the launch item wanted
function existLaunchWithId(launchId) {
    return launches.has(launchId)
}

function abortLaunchById(launchId) {
    if (existLaunchWithId(launchId)) {
        const abortedLaunch = launches.get(launchId)
        abortedLaunch.success = false;
        abortedLaunch.upcoming = false;
        return abortedLaunch;
    }
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}

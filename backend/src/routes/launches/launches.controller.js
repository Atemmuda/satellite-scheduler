const {
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
} = require('../../models/launches.model.js');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunches(req, res) {
    const launch = req.body;

    //if any of the field for creating a launch is missing
    if (!launch.launchDate || !launch.rocket
        || !launch.mission || !launch.target) {
        return res.status(400).json({
            error: "missing launch data field",
        });
    }
    launch.launchDate = new Date(launch.launchDate)

    // if date is not a valid date type
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "incorrect date",
        });
    }
    addNewLaunch(launch)
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    //check for valid launch Id
    if(launchId){
        return res.status(200).json(abortLaunchById(launchId));
    }else{
        return res.status(404).json({
            error: `launch with ${launchId} not found`
        });
    }
    
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAbortLaunch
}

const getAllJobs = async (req, res) => {
    res.send('Get All Jobs')
}

const getJob = async (req, res) => {
    res.send('Get Job')
}

const createJob = async (req, res) => {
    res.send('Create a Job')
}

const updateJob = async (req, res) => {
    res.send('Update a Job')
}

const deleteJob = async (req, res) => {
    res.send('Delete a Job')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
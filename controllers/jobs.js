const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    const {
        user: { userId },        // accessing req.user and assigning its userId to userId
        params: { id: jobId }    // accessing req.params and assigning its id to jobId
    } = req
    const job = await Job.findOne({
        _id: jobId, createdBy: userId
    })
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    console.log(req.body)
    req.body.createdBy = req.user.userId
    console.log(req.user.userId)
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    const {
        body: { company, position },  // checking what user sent in
        user: { userId },
        params: { id: jobId }
    } = req
    if (company === '' || position === '') {
        throw new BadRequestError('Company ot Position fields cannot be blank')
    }
    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    )
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req
    const job = await Job.findByIdAndRemove({
        _id: jobId,
        createdBy: userId
    })
    if (!job) {
        throw new NotFoundError(`No job iwth id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
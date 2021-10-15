import { sample } from 'lodash'
import { Sample, User } from '../models'

const packSample = (sample) => {
    return {
        key: sample.key,
        id: sample.id,
        peakVoltage: sample.peakVoltage,
        RMSCurrent: sample.RMSCurrent,
        avgPower: sample.avgPower,
        created: sample.created,
    }
}

const packSamples = (sample) => sample.map(packSample)

const getSample = async (sampleKey) => {
    const sample = await Sample.collection.get({ key: sampleKey })
    return packSample(sample)
}

const getSamples = async (userID) => {
    const samples = (await Sample.collection.fetch()).list
    return packSamples(samples)
}

const addSample = async (user, s) => {
    const sample = Sample.init({ parent: user.key })

    sample.created = new Date()
    sample.peakVoltage = s.peakVoltage
    sample.RMSCurrent = s.RMSCurrent
    sample.avgPower = s.avgPower

    await sample.save()

    return await getSample(sample.key)
}

export { addSample, getSample, getSamples }

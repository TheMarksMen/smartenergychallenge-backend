import { sample } from 'lodash'
import { Sample, User} from '../models'

const packSample = (sample) => {
    return {
        key: sample.key,
        id: sample.id,
        peakVoltage: sample.peakVoltage,
        RMSCurrent: sample.RMSCurrent,
        avgPower: sample.avgPower,
        created: sample.created
    }
}

const packSamples = (sample) => sample.map(packSample)

const getSampleKey = async (sampleKey) => {
    const sample = await Sample.collection.get({ key: sampleKey })
    return packSample(sample)
}

const addSample = async (s, user) => {
    const sample = Sample.init({ parent: user.key })

    sample.peakVoltage = s.peakVoltage
    sample.RMSCurrent = s.RMSCurrent
    sample.avgPower = s.avgPower

    await sample.save()

    return await getSampleKey(sample.key)
}

export {
    addSample
}
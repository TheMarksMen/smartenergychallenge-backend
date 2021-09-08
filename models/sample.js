import { Model, Field } from 'fireo'

class Sample extends Model {
    id = Field.ID()
    created = Field.DateTime({ required: true, auto: true })
    peakVoltage = Field.Number()
    RMSCurrent = Field.Number()
    avgPower = Field.Number()
}

export default Sample 

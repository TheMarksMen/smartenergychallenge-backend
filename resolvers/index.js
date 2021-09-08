import { merge } from 'lodash'
import userResolver from './users'
import sampleResolver from './samples'
import datetimeScalar from '../scalars/datetime'

const rootResolver = {}

const customScalars = {
    DateTime: datetimeScalar,
}
export default merge(
    customScalars,
    rootResolver,
    userResolver,
    timeResolver
)

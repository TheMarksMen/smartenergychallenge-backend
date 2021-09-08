import {
    addQuestionOption,
} from '../controllers'
import { AuthenticationError } from 'apollo-server-express'
import { AdminAuthenticationError } from '../utils/errors'

const resolvers = {
    Query: {
        getSample: async 
    },
    Mutation: {
        addSample: async (parent, { input }, context) => {
            if (!context.user) throw new AuthenticationError()
            if (!context.user.admin) throw new AdminAuthenticationError()

            const { userID, time, peakVoltage, RMSCurrent, avgPower} = input

            const user = await getUser(userID)
            const sample = {time, peakVoltage, RMSCurrent, avgPower}

            return await addQuestionOption(user, sample)
        },
    },
}

export default resolvers
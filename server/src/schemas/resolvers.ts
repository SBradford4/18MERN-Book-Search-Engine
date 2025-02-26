import User from "../models/User.js";
import { signToken } from "../services/auth.js";

const resolvers = {
    Query: {
        me: async (_: any, _args: any) => {
            try {                
                // const user = await User.findOne()
                // return user;
                return;
            } catch (error) {
                console.error('Error fetching users:', error);
                throw new Error('Failed to fetch users');
            }
        },
    },
    Mutation: {
        createUser: async (_: any, { input }: { input: any }) => {
            const user = await User.create(input);
            const token = signToken(user.username, user.password, user._id); 
            return { user, token };
        },

        login: async (_: any, { email, password }: any) => {
            const user = await User.findOne({
                email
            });

            if(!user) {
                throw new Error("no user found");
            }

            const passwordVerify = await user.isCorrectPassword(password);

            if(!passwordVerify) {
                throw new Error("Password doesn't match. Please try again.");
            }

            const token = signToken(user.username, user.password, user._id); 
            return { user, token };
        },
    },
}

export default resolvers;
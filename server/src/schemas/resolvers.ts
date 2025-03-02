import User from "../models/User.js";
import { signToken } from "../services/auth.js";

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: any) => {
            try {
                if (context.user) {
                    return User.findOne({ _id: context.user._id });
                }
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

            if (!user) {
                throw new Error("no user found");
            }

            const passwordVerify = await user.isCorrectPassword(password);

            if (!passwordVerify) {
                throw new Error("Password doesn't match. Please try again.");
            }

            const token = signToken(user.username, user.password, user._id);
            return { user, token };
        },

        saveBook: async (_: any, { book }: any, context: any) => {
            if (context.user) {
                try {
                    const userBooks = await User.findOneAndUpdate(
                        {_id: context.user._id},
                        {
                            $addToSet: { savedBooks: book }
                        },
                        {
                            new: true,
                            runValidators: true
                        }
                    );

                    if (!userBooks) {
                        throw new Error("User not found");
                    }

                    return userBooks;
                } catch (error) {
                    console.error('Error fetching users:', error);
                    throw new Error('Failed to fetch users');
                }
            }
            return;
        },


        removeBook: async (_: any, { bookId }: any, context: any) => {
            console.log(bookId)
            if (context.user) {
                try {
                    const userBooks = await User.findOneAndUpdate(
                        {_id: context.user._id},
                        {
                            $pull: { savedBooks: {bookId} }
                        },
                        {
                            new: true
                        }
                    );
                    if (!userBooks) {
                        throw new Error("User not found");
                    }

                    return userBooks;
                } catch (error) {
                    console.error('Error fetching users:', error);
                    throw new Error('Failed to fetch users');
                }
            }
            return;
        }
    },
}

export default resolvers;
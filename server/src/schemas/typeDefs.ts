const typeDefs  = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Query {
        me: User
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String!
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: String
        user: User
    }

    input CreateUserInput {
        username: String!
        email: String!
        password: String!
    }

    input BookInput {
       description: String
       title: String
       bookId: String
       image: String
       link: String
       authors: [String]
    }

    type Mutation {
        createUser(input: CreateUserInput!): Auth
        login(email: String!, password: String!): Auth
        saveBook(book: BookInput): User
        removeBook(bookId: String): User
    }
`;

export default typeDefs;
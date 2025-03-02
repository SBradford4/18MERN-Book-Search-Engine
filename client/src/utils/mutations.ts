import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
}
`

export const ADD_USER = gql `
    mutation Mutation($input: CreateUserInput!) {
  createUser(input: $input) {
    token
    user {
      _id
      username
      email
      
    savedBooks {
      bookId
      authors
      description
      image
      link
      title
    }


    }
  }
}
`;

export const SAVE_BOOK = gql `
mutation SaveBook($book: BookInput) {
  saveBook(book: $book) {
    _id
    username
    email
    savedBooks {
      bookId
      authors
      description
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: String) {
  removeBook(bookId: $bookId) {
    savedBooks {
      bookId
      title
    }
  }
}
`;
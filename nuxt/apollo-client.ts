import { defineApolloClient } from '@nuxtjs/apollo'

export default defineApolloClient({
  httpEndpoint: process.env.NODE_ENV === 'production' ? 'https://iranartemia.com/api/api/graphql' : 'http://localhost:3032/api/graphql'
  ,
  httpLinkOptions: {
    credentials: 'include'

  },
  cookieAttributes: {

    path: '/',
    domain: process.env.NODE_ENV === 'production' ? 'iranartemia.com' : 'localhost:5173',
    secure: false
  }

})

// // HTTP connection to the API
// const httpLink = new HttpLink({
//   uri: import.meta.env.VITE_GQL_ENDPOINT, // DONE
//   credentials: 'include' // DONE
// })

// const LoadingMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers

//   emitter.emit('IsLoading', true)

//   const f = forward(operation)

//   f.forEach(() => {
//     emitter.emit('IsLoading', false)
//   })

//   return f
// })
// // const LoadingEndMiddleware = new ApolloLink((operation, forward) => {
// //   console.log("operation ends");

// //   return forward(operation);
// // });

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   const lastUserId = localStorage.getItem('userid')
//   if (lastUserId) {
//     operation.setContext({
//       headers: {
//         userid: lastUserId
//       }
//     })
//   }
//   return forward(operation)
// })

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   emitter.emit('Error', { message: 'خطا در ارتباط با شبکه', type: 'NETERR' })
//   console.log(graphQLErrors)
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     )
//   }
//   if (networkError) { console.log(`[Network error]: ${networkError}`) }
// })

// const requestLink = new ApolloLink((operation, forward) => {
//   emitter.emit('IsLoading', true)
//   return forward(operation).map((response) => {
//     emitter.emit('IsLoading', false)

//     return response
//   })
// })

// // Cache implementation
// const cache = new InMemoryCache()

// // Create the apollo client
// export const apolloClient = new ApolloClient({
//   link: from([
//     // LoadingMiddleware,
//     errorLink,
//     concat(requestLink, httpLink)
//   ]),
//   cache
// })

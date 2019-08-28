import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';

export const apoloClient = new ApolloClient({
    link: createHttpLink({uri: 'https://countries.trevorblades.com'}),
    cache: new InMemoryCache()
});


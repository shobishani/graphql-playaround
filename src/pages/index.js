import {Countries} from "./countries/Countries";
import {ViewCountry} from "./countries/ViewCountry";
import {Home} from "./home/Home";


export const routes = [
    {
        key: 1,
        exact: true,
        path: '/',
        component: Home
    },
    {
        key: 1,
        exact: true,
        path: '/countries',
        component: Countries
    },
    {
        key: 1,
        exact: true,
        path: '/countries/:code',
        component: ViewCountry
    }
];
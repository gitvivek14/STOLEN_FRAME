import {createSchema ,schemaTypes} from 'sanity'
import user from "./user";

export default createSchema({
    name:'default',
    types:schemaTypes.concat([
        user
    ])
})
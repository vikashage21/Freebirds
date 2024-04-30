import {z} from 'zod'


const sinupSchema = z.object({
    username:z.string().trim().min(3,{message :"Name must be at least of 3 char"}).max(255, {message :"Name must not be more than 255 characters"}),
    email:z.string().email().min(3,{message :"Email must be at least of 3 char"}).max(255, {message :"Email must not be more than 255 characters"}),
    password:z.string().min(3,{message :"Password must be at least of 3 char"}).max(255, {message :"Password must not be more than 255 characters"}),
    name:z.string().min(3,{message :"Name must be at least of 3 char"}).max(255, {message :"Name must not be more than 255 characters"}),
    avatar:z.string().min(3,{message :"Avatar must be at least of 3 char"}).max(255, {message :"Avatar must not be more than 255 characters"}),
    age:z.boolean(),
    gender:z.string().min(3,{message :"Gender must be at least of 3 char"}).max(255, {message :"Gender must not be more than 255 characters"}),
    photos:z.string().min(3,{message :"Photos must be at least of 3 char"}).max(255, {message :"Photos must not be more than 255 characters"}),
})

export {sinupSchema}
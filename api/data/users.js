import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email:"admin@gmail.com",
        password: bcrypt.hashSync("admin12345", 10),
        isAdmin: true
    },
    {
        name: 'Abdul Rahman',
        email:"abdul@gmail.com",
        password: bcrypt.hashSync("abdul12345", 10),
        isAdmin: false
    }
];

export default users;
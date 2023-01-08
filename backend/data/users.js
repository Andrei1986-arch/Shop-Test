import bcrypt from 'bcryptjs'


const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password:bcrypt.hashSync('123456' , 10),
    isAdmin: true
  },
  {
    name: 'Panaite Andrei',
    email: 'andrei@example.com',
    password:bcrypt.hashSync('123456' , 10),
  },
  {
    name: 'Tarabuta Georgiana',
    email: 'gina@example.com',
    password:bcrypt.hashSync('123456' , 10),
  },
  {
    name: 'Panaite Catalin',
    email: 'catalin@example.com',
    password:bcrypt.hashSync('123456' , 10),
  },
]

export default users
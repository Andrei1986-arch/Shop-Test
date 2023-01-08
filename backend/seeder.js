import mongoose from "mongoose";
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModels.js'
import Product from './models/productModels.js'
import Order from './models/orderModels.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map(product => {
      return {...product , user: adminUser}
    })

    await Product.insertMany(sampleProducts)
    console.log("Data Imported!");
    process.exit()
  } catch (error) {
    console.error(`There are some errors: ${error}`)
    process.exit(1)
  }
}
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
   
    console.log("Data Destroyed!");
    process.exit()
  } catch (error) {
    console.error(`There are some errors: ${error}`)
    process.exit(1)
  }
}

//node backend/seeder -d
//command to destroy / create data from seeder
//logic as follows...

if(process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

// have to add these lines in package.json to work with npm
//"data:import" : "node backend/seeder",
//		"data:destroy" : "node backend/seeder -d"
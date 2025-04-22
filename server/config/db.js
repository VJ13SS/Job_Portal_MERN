import mongoose from 'mongoose'

//function to mongodb database
const connectDB = async () => {
    mongoose.connection.on('connected',()=>console.log('DB Connected'))

    await mongoose.connect(`mongodb://localhost:27017/job-portal`)//job-portal is the name of the db
}

export default connectDB
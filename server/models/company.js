import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
})

const companyModel = mongoose.models.company || mongoose.model('company',companySchema)

export default companyModel
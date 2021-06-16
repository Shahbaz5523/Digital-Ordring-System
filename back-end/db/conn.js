const env = require('dotenv')
env.config()

const mongoose = require('mongoose')
const DB = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.8wfvk.mongodb.net/${process.env.PROJECT_NAME}?retryWrites=true&w=majority`
// const DB = 'mongodb+srv://SheikhUmar123:SheikhUmar5522@cluster0.8wfvk.mongodb.net/digitalresturant?retryWrites=true&w=majority'



mongoose.connect(DB , {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
}).then(()=>{
    console.log('connection sucesssfull');
}).catch((err) =>{
    console.log('no connection');
})
const {mongoose} = require('mongoose')
require('dotenv').config({path:"ebackend/config/.env"});
const connectDatabase = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'ebackend'
        })
        console.log('MongoDB connected');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
}

module.exports = connectDatabase;
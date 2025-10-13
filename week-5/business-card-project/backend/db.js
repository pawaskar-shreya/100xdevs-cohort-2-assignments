import mongoose from 'mongoose';
import 'dotenv/config';
mongoose.connect(process.env.MONGO_URI)

// const Schema = mongoose;

const CardsSchema = mongoose.Schema ({
    name : String,
    description : String, 
    interests : [String], 
    socials : [
        {
            type : Map,
            of : String
        }
    ]
})

const Card = mongoose.model('Cards', CardsSchema)

export { Card }
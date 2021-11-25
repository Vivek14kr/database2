const express = require("express");
const mongoose = require("mongoose")
// const data = require("./data.json")

const connect = ()=>{
    return mongoose.connect(" mongodb://127.0.0.1:27017/movie")
}

const userSchema = new mongoose.Schema({
     id: {
             type: Number,
             required: true,
             unique: true
         },
         movie_name: {
             type: String,
             required: true
         },
         movie_genre: {
             type: String,
             required: false
         },
         production: {
             type: Number,
             required: true
         },
         budget: {
             type: Number,
             required: true
         },
   
} ,{
    versionKey: false,
    timestamps: true,
}, );

const User = mongoose.model('users', userSchema);

const app = express();

app.use(express.json())

const logger = (req, res, next)=>{
    req.name = "Vivek Kumar"

  next();
}

app.use(logger) 
app.post('/users', async (req, res) => {
    try {
        const movie = await User.create(req.body);

        return res.status(201).send(movie);
    } catch (e) {
        res.status(201).send(movie);
    }
});

app.get('/users', async (req, res) => {
 

    try {
        const movies = await User.find().lean().exec();

        return res.status(201).send(movies);
    } catch (e) {
        res.status(500).send({
            message: e.message,
            status: 'Failed'
        });
    }
});

app.get('/users/:id', async (req, res) => {
   

    try {
       
        const movie = await User.findById(req.params.id).lean().exec();

        return res.status(201).send(movie);
    } catch (e) {
        res.status(500).send({
            message: e.message,
            status: 'Failed'
        });
    }
});

app.patch('/users/:id', async (req, res) => {
   

    try {
    
        const movie = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
            .lean()
            .exec();

        return res.status(201).send(movie);
    } catch (e) {
        return res.status(500).send({
            message: e.message,
            status: 'Failed'
        });
    }
});

app.delete('/users/:id', async (req, res) => {
  

    try {
        const movie = await User.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(201).send(movie);
    } catch (e) {
        res.status(500).send({
            message: e.message,
            status: 'Failed'
        });
    }
});


app.listen(2345, async function(){
    await connect()
    console.log("server is running on port 2345")
})
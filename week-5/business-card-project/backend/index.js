const express = require('express');
const app = express();
const { createCard, updateCard, deleteCard } = require('./zod.js');
const { Card } = require('./db')
const cors = require('cors')
app.use(cors());


app.use(express.json());

app.post('/create', async function(req, res) {
    const createInput = req.body;
    const parsedCreate = createCard.safeParse(createInput);

    if(!parsedCreate.success) {
        res.status(400).json({
            msg : "Inputs invalid"
        })
        return;
    }

    // push data to db
    await Card.create(parsedCreate.data);
    res.status(400).json({
        msg : "Card added to db"
    })
})

app.get('/read', async function(req, res) {
    const allCards = await Card.find({})

    res.status(200).json({
        Cards : allCards
    })
})

app.put('/update', async function(req, res) {
    const updateInput = req.body;
    const parsedUpdate = updateCard.safeParse(updateInput);

    if(!parsedUpdate.success) {
        res.status(400).json({
            msg : "Inputs invalid"
        })
        return;
    }

    // make update to db
    await Card.updateMany(
        { _id : parsedUpdate.data._id }, 
        {
            $set: {
                name : parsedUpdate.data.name, 
                description : parsedUpdate.data.description, 
                interests : parsedUpdate.data.interests, 
                socials : parsedUpdate.data.socials, 
            }
        }
    )
    res.status(400).json({
        msg : "updated your card!"
    })
})

app.delete('/delete', async function(req, res) {
    const deleteInput = req.body;
    const parsedDelete = deleteCard.safeParse(deleteInput);

    if(!parsedDelete.success) {
        res.status(400).json({
            msg : "Inputs id"
        })
        return;
    }

    // delete card from db
    await Card.deleteOne(
        {_id : parsedDelete.data._id}
    )
    res.status(400).json({
        msg : "Your card is deleted"
    })
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
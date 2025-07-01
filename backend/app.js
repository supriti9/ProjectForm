const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.get('/api/apod',async(req,res)=>{
    try {
        const { date } = req.query;
        const response = await axios.get('https://api.nasa.gov/planetary/apod',{
            params: { api_key: process.env.NASA_API_KEY,
            date: date
            }
        });
        res.json(response.data); 
    }catch(err){
        res.status(500).json({error: 'Failed to fetch'})
    }
});


app.get('/api/neo',async(req,res)=>{
    try{
        const today_date = new Date().toISOString().split('T')[0];
        const startDate = req.query.start_date || today_date;
        const endDate = req.query.end_date || today_date;

        const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed',{
        params: {
            start_date: startDate,
            end_date: endDate,
            api_key: process.env.NASA_API_KEY
        }
        });
        res.json(response.data)
    }catch(error){
        console.log("Error while fetching NEO",error.message);
        res.status(500).json({error: 'Failed to fetch NEO' })
    }
});


module.exports = app;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import "./NeoChart.css"

const NeoChart = () => {
  const [neoData, setNeosData] = useState([]);
  useEffect(() => {
    const fetchNeoData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/neo');
        const nearObjects = response.data.near_earth_objects;
        const formatData = Object.entries(nearObjects).reduce((acc,[date, asteroids]) =>{
        const finalData =  asteroids.map(asteroid => ({
          name: asteroid.name, date: date,
          diameter: asteroid.estimated_diameter.meters.estimated_diameter_max
        }));
        return acc.concat(finalData);
        },[]);
        setNeosData(formatData.slice(0, 10));
      } catch (err) {
        console.error('Error fetching NEO data:', err.message);
      }
    };
    fetchNeoData();
  }, []);

  return (
    <div className='neo-container'>
      <h2>Top Asteroid which are near Earth(by Max Diameter)</h2>
      <ResponsiveContainer width="100%" height={400} >
        <BarChart data={neoData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Diameter (m)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="diameter" fill="#6a5acd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NeoChart;

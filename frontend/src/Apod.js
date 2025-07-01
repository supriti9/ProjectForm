import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Apod.css';

export default function Apod() {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [apod, setApods] = useState(null)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApod = async(date) => {
      setLoading(true);
      const formattedDate = date.toISOString().split('T')[0];
      try {
      const res =  await axios.get(`https://projectform-eid4.onrender.com/api/apod?date=${formattedDate}`);
          setApods(res.data);
          setError(null);
          setLoading(false);
        }
        catch(err){
          console.error(err);
          setError('Failed to fetch APOD api');
          setLoading(false);
        };
    };
    fetchApod(selectedDate);
  }, [selectedDate]);

  return (
    <div className='apod-container'>
      <h2>Picture of the dayy</h2>
      <div className='apod-picker'>
        <label>Select Date:&nbsp;</label>
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy/MM/dd" maxDate={new Date()} minDate={new Date('1995/0616')}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className='err-msg'>{error}</p>}
      {apod && !loading && !error && (
        <div>
          <h3>{apod.title}</h3>
          {apod.media_type === 'image' ? (
            <img src={apod.url} alt={apod.title} className='img-bg' />
          ) 
          : (
            <iframe title="APOD Video" src={apod.url} width="100%" height="500" allow="fullscreen"
            ></iframe>
          )}
          <p>{apod.explanation}</p>
        </div>
      )}
    </div>
  );
}


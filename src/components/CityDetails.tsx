import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCityFromStorage } from '../helpers';
import '../styles/cityDetails.scss';
const CityDetails = () => {
  const [notesEditable, setNotesEditable] = useState(false);


  const { cityName } = useParams();
  const storedNotes = localStorage.getItem(cityName) || '';
  const userCurrentCity = JSON.parse(localStorage.getItem('userCurrentCity') || '{}');
  const [notes, setNotes] = useState(storedNotes);
  
  const cityDetails = getCityFromStorage(cityName);

  if (userCurrentCity?.name === cityName) {
    return <p>We have your details</p>
  }

  const handleSave = (event: any) => {
    event.preventDefault();
    localStorage.setItem(cityName, notes)
    setNotesEditable(false);
  }

  const handleCommentChange = (event: any) => {
    setNotes(event.target.value)
  }

  const handleCancelClick = () => {
    setNotesEditable(false)
    setNotes('')
  }

  const getCityDetails = () => {
    if (!cityDetails) {
      return <p>City not found</p>;
    }
    return <p>City Details {cityName}</p>
  }
  const getCommentSection = () => {
    if (!cityDetails){
      return null;
    }

    if (notesEditable) {
      return (
        <>
          <form>
            <textarea value={notes} onChange={handleCommentChange}></textarea>
          </form>
           <button onClick={handleSave}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      )
    }

    return (
      <>
        <p>{storedNotes}</p>
        <button onClick={() => setNotesEditable(true)} >Edit</button>
      </>
    )
  }

  return (
    <div className="city-details-wrapper app">
      <Link to="/"> Go Back</Link>
      {getCityDetails()}
      {getCommentSection()}
    </div>
  )
};


export default CityDetails;

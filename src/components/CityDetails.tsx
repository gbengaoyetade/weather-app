import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCityFromStorage } from '../helpers';

const CityDetails = () => {
  const [notesEditable, setNotesEditable] = useState(false);


  const { cityName } = useParams();
  const storedNotes = localStorage.getItem(cityName) || '';
  const userCurrentCity = JSON.parse(localStorage.getItem('userCurrentCity') || '');
  const [notes, setNotes] = useState(storedNotes);
  
  const cityDetails = getCityFromStorage(cityName);

  if (userCurrentCity?.name === cityName) {
    return <p>We have your details</p>
  }
  if (!cityDetails) {
    return <p>City not found</p>;
  }

  const handleSave = (event: any) => {
    event.preventDefault();
    localStorage.setItem(cityName, notes)
    setNotesEditable(false);
  }

  const handleCommentChange = (event: any) => {
    setNotes(event.target.value)
  }

  const getCommentSection = () => {
    if (notesEditable) {
      return (
        <>
          <form>
            <textarea value={notes} onChange={handleCommentChange}></textarea>
          </form>
           <button onClick={handleSave}>Save</button>
          <button onClick={() => setNotesEditable(false)}>Cancel</button>
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
    <>
      <Link to="/">Go back</Link>
      <p>City Details {cityName}</p>
      
      {getCommentSection()}
    </>
  )
};


export default CityDetails;

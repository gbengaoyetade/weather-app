import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../store';
import { SAVE_NOTES, DELETE_NOTE } from '../constants';


const Notes = (props: {cityName: string}) => {
  const { state, dispatch } = useContext(AppContext);
  const { cityName } = props;
  const [notesEditable, setNotesEditable] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setNotes(state.notes[cityName] || '')
  }, [cityName, state.notes]);

  const handleSave = (event: any) => {
    event.preventDefault();
    setNotesEditable(false);
    dispatch({
      type: SAVE_NOTES,
      notes: { [cityName]: notes }
    });
  }
  
  const handleCommentChange = (event: any) => {
    setNotes(event.target.value)
  }

  const handleCancelClick = () => {
    setNotesEditable(false)
  }

  const handleDelete = () => {
    setNotesEditable(false);
    dispatch({
      type: DELETE_NOTE,
      cityName
    });
  }

  const cityNotes = state.notes[cityName];

  if (notesEditable) {
    return (
      <>
        <form>
          <textarea value={notes} onChange={handleCommentChange}></textarea>
        </form>
          <button className="notes-button" onClick={handleSave}>Save</button>
          <button className="notes-button" onClick={handleCancelClick}>Cancel</button>
          {
            cityNotes ? <button className="notes-button" onClick={handleDelete}>Delete</button> : null
          }
          
      </>
    )
  }

  return (
    <>
      { cityNotes ?  <p className="notes">{cityNotes}</p> : null }
      <button className="notes-button" onClick={() => setNotesEditable(true)} >
        { cityNotes ? 'Edit' : 'Add Notes' }
      </button>
    </>
  )
}

export default Notes;

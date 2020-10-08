import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../store';
import { SAVE_NOTES } from '../constants';


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
    })
  }
  
  const handleCommentChange = (event: any) => {
    setNotes(event.target.value)
  }

  const handleCancelClick = () => {
    setNotesEditable(false)
  }

  const cityNotes = state.notes[cityName];

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
      <p>{cityNotes}</p>
      <button onClick={() => setNotesEditable(true)} >
        { cityNotes ? 'Edit' : 'Add Notes' }
      </button>
    </>
  )
}

export default Notes;

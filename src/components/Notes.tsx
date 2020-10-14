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

  const handleSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setNotesEditable(false);
    dispatch({
      type: SAVE_NOTES,
      notes: { [cityName]: notes }
    });
  }
  
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <div className="notes-wrapper">
        <form>
          <textarea
            data-testid="notes-input"
            value={notes}
            onChange={handleCommentChange}
            placeholder="Add notes"
          >
          </textarea>
        </form>
        <div className="action-buttons">
          <button className="notes-button info" onClick={handleSave}>Save</button>
          <button className="notes-button warning" onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className="notes-wrapper">
      { cityNotes ? <p className="notes">{cityNotes}</p> : null}
      <div className="action-buttons">
        <button className="notes-button info" onClick={() => setNotesEditable(true)} >
          { cityNotes ? 'Edit' : 'Add Notes' }
        </button>
        {
          cityNotes ? <button className="notes-button danger" onClick={handleDelete}>Delete</button> : null
        }
      </div>
    </div>
  )
}

export default Notes;

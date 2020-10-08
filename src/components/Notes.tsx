import React, { useState} from 'react';

const Notes = () => {
  const [notes, setNotes ] = useState('');
  const [notesEditable, setNotesEditable] = useState(false);

  const handleSave = (event: any) => {
    event.preventDefault();
    setNotesEditable(false);
  }
  
  const handleCommentChange = (event: any) => {
    setNotes(event.target.value)
  }

  const handleCancelClick = () => {
    setNotesEditable(false)
    setNotes('')
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
      <p></p>
      <button onClick={() => setNotesEditable(true)} >Edit</button>
    </>
  )
}

export default Notes;

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Notes from '../Notes';
import { AppContext } from '../../store';
import { SAVE_NOTES, DELETE_NOTE } from '../../constants';
import { initialStateMock as state } from '../../mocks';



describe('Notes', () => {

  const dispatch = jest.fn();

  it('should match snapshot', () => {
    const { container } = render(
      <AppContext.Provider value={{ dispatch, state }}>
        <Notes cityName="Beijing"/>
      </AppContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show Add Notes button when notes are empty', () => {
    const { getByText } = render(
      <AppContext.Provider value={{ dispatch, state }}>
        <Notes cityName="Tokyo"/>
      </AppContext.Provider>
    );
    expect(getByText('Add Notes')).toBeInTheDocument();
  });

  it('should show textarea when Edit button is clicked', () => {
    const { getByText, getByTestId } = render(
      <AppContext.Provider value={{ dispatch, state }}>
        <Notes cityName="Beijing"/>
      </AppContext.Provider>
    );
    
    fireEvent.click(getByText('Edit'))
    
    expect(getByTestId('notes-input')).toBeInTheDocument();
    expect(getByText('Save')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('should call dispatch when save button is clicked', () => {
    const { getByText, getByTestId } = render(
      <AppContext.Provider value={{ dispatch, state }}>
        <Notes cityName="Beijing"/>
      </AppContext.Provider>
    );
    
    fireEvent.click(getByText('Edit'));
    fireEvent.change(getByTestId('notes-input'), { target: { value: 'test' }})
    fireEvent.click(getByText('Save'));
    expect(dispatch).toHaveBeenCalledWith({
      type: SAVE_NOTES,
      notes: {'Beijing': 'test'}})
  });

  it('should call dispatch when delete button is clicked', () => {
    const { getByText } = render(
      <AppContext.Provider value={{ dispatch, state }}>
        <Notes cityName="Beijing"/>
      </AppContext.Provider>
    );
    
    fireEvent.click(getByText('Delete'));
    expect(dispatch).toHaveBeenCalledWith({
      type: DELETE_NOTE,
      cityName:'Beijing'
    });
  });

  it('should allow users cancel edits', () => {
    const { getByText, getByTestId } = render(
      <AppContext.Provider value={{ dispatch, state }}>
        <Notes cityName="Beijing"/>
      </AppContext.Provider>
    );

    expect(getByText('hello world')).toBeInTheDocument();

    fireEvent.click(getByText('Edit'));
    fireEvent.change(getByTestId('notes-input'), { target: { value: 'test' }})
    fireEvent.click(getByText('Cancel'));

    expect(getByText('hello world')).toBeInTheDocument();
  });
});

import React from 'react';
import {render} from '@testing-library/react-native';
import Note from './Note';
import {AgendaEntry} from 'react-native-calendars';

const dummyNote: AgendaEntry = {
  name: 'Note 1 ',
  height: 50,
  day: '2020-12-12',
};

describe('Note', () => {
  it('should render the name correctly', () => {
    const {getByText} = render(<Note reservation={dummyNote} isFirst />);
    expect(getByText('Note 1')).toMatchSnapshot();
  });
});

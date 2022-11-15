import React, {useState, useContext, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {AgendaEntry, Calendar} from 'react-native-calendars';
import DataContext from '../../context/dataContext';
import {CalendarContextType} from '../../types/types';

const Create = () => {
  const {addItem, items, timeToString} = useContext(
    DataContext,
  ) as CalendarContextType;

  const [selectedDate, setSelectedDate] = useState(timeToString(Date.now()));
  const [note, setNote] = useState('');

  const setMarkedDate = useCallback((date: string) => {
    return {
      [date]: {selected: true, marked: true, selectedColor: '#942b2b'},
    };
  }, []);

  const createNote = useCallback(() => {
    const doesNoteExist = items[selectedDate]?.find(
      (item: AgendaEntry) => item.name === note,
    );

    if (doesNoteExist) {
      Alert.alert('Note already exists');
      return;
    }

    if (items[selectedDate]) {
      addItem({
        [selectedDate]: [
          ...items[selectedDate],
          {name: note, height: 50, day: selectedDate},
        ],
      });
    } else {
      addItem({
        [selectedDate]: [{name: note, height: 50, day: selectedDate}],
      });
    }
    setNote('');
  }, [selectedDate, note, items, addItem]);

  return (
    <ScrollView style={styles.container}>
      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={setMarkedDate(selectedDate)}
        theme={{
          todayTextColor: '#6d6868',
          selectedDayBackgroundColor: '#333232',
          selectedDayTextColor: '#ffffff',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
          selectedDotColor: '#333232',
          dotColor: '#333232',
        }}
      />
      <TextInput
        value={note}
        onChangeText={setNote}
        style={styles.input}
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={createNote}>
        <Text>Create</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
  },
  input: {
    borderWidth: 1,
    height: 100,
    borderColor: 'gray',
    backgroundColor: 'white',
    margin: 15,
  },
  button: {
    backgroundColor: 'grey',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Create;

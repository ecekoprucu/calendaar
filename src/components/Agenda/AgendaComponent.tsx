import React, {useCallback, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Agenda, AgendaEntry} from 'react-native-calendars';
import DataContext from '../../context/dataContext';
import Note from '../Item/Note';
import {CalendarContextType} from '../../types/types';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {DayAgenda} from 'react-native-calendars/src/types';

const AgendaComponent = () => {
  const {items, timeToString} = useContext(DataContext) as CalendarContextType;

  const renderItem = useCallback(
    (reservation: AgendaEntry, isFirst: boolean) => {
      return (
        <Note reservation={reservation} isFirst={isFirst} key={uuidv4()} />
      );
    },
    [],
  );

  const reservationsKeyExtractor = useCallback(
    (item: DayAgenda, index: Number) => {
      return `${item?.reservation?.day}${index}`;
    },
    [],
  );

  const currentTime = timeToString(Date.now());

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={currentTime}
        loadItemsForMonth={month => {
          if (!items[month.dateString]) {
            items[month.dateString] = [];
          }
        }}
        renderEmptyDate={() => {
          return (
            <View style={styles.emptyDate}>
              <Text>No items for this day</Text>
            </View>
          );
        }}
        renderItem={renderItem}
        showClosingKnob={true}
        theme={{
          calendarBackground: '#d3d1d1',
          selectedDayBackgroundColor: '#373434',
          agendaKnobColor: 'black',
          selectedDotColor: '#343434',
          dotColor: '#424141',
          todayTextColor: '#000000',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
          dayTextColor: '#000000',
          monthTextColor: '#000000',
          textSectionTitleColor: '#000000',
          agendaDayTextColor: '#000000',
          agendaDayNumColor: '#000000',
          agendaTodayColor: '#000000',
        }}
        showOnlySelectedDayItems
        reservationsKeyExtractor={reservationsKeyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 600,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
  },
});

export default AgendaComponent;

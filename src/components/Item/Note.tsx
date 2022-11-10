/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {AgendaEntry} from 'react-native-calendars';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {CalendarContextType} from '../../types/types';

import DataContext from '../../context/dataContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

type NoteProps = {
  reservation: AgendaEntry;
  isFirst: boolean;
};

const Note = ({reservation, isFirst}: NoteProps) => {
  const {deleteItem, editItem} = useContext(DataContext) as CalendarContextType;
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(reservation.name);

  const handleEdit = () => {
    editItem(reservation, note);
    setIsEditing(false);
  };

  const fontSize = isFirst ? 16 : 14;
  const color = isFirst ? 'black' : '#43515c';

  const renderLeftActions = (dragX: {
    interpolate: (arg0: {inputRange: number[]; outputRange: number[]}) => any;
  }) => {
    const transform = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton
        style={[
          {
            height: reservation.height,
            marginTop: 17,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
          },
        ]}
        onPress={() => deleteItem(reservation)}>
        <Animated.Text
          style={[
            {
              transform: [{translateX: transform}],
            },
          ]}>
          <FontAwesomeIcon style={{color: 'white'}} icon={faTrash} />
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <View>
      <Swipeable renderLeftActions={renderLeftActions}>
        <View style={{...styles.item, height: reservation.height}}>
          <Text style={{fontSize, color, flex: 10}}>{reservation.name}</Text>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setIsEditing(true)}>
            <FontAwesomeIcon style={{color: 'black'}} icon={faEdit} />
          </TouchableOpacity>
        </View>
      </Swipeable>
      <Modal transparent visible={isEditing} animationType="slide">
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput style={styles.input} value={note} onChangeText={setNote} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonSave} onPress={handleEdit}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setIsEditing(false)}>
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  buttonClose: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  buttonSave: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Note;

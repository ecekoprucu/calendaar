import React, {useState, createContext, useCallback } from 'react';
import { AgendaSchedule, AgendaEntry } from 'react-native-calendars';
import { CalendarContextType } from '../types/types';

const DataContext = createContext<CalendarContextType | null>(null);

type Props = {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: Props) => {
    const timeToString = (time: number) => {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }

    const [items, setItems] = useState<AgendaSchedule>({});

    const addItem = useCallback((item: AgendaSchedule) => {
      setItems({...items, ...item});
    }, [items]);

    const deleteItem = useCallback((item: AgendaEntry) => {
      const newItems = items[item.day].filter((i: AgendaEntry) => i.name !== item.name);
      setItems({...items, [item.day]: newItems});
    }, [items]);

    const editItem = useCallback((item: AgendaEntry, text: string) => {
      const newItems = items[item.day].map((i: AgendaEntry) => {
        if(i.name === item.name){
          i.name = text;
        }
        return i;
      });
      setItems({...items, [item.day]: newItems});
    }, [items]);

   
    return (
      <DataContext.Provider value={{items, timeToString, addItem, deleteItem, editItem}}>
        {children}
      </DataContext.Provider>
    );
  };
  
  export default DataContext;
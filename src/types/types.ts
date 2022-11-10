import { AgendaSchedule, AgendaEntry } from 'react-native-calendars';

export type CalendarContextType = {
    items: AgendaSchedule;
    timeToString: (time: number) => string;
    addItem: (item: AgendaSchedule) => void;
    deleteItem: (item: AgendaEntry) => void;
    editItem: (item: AgendaEntry, text: string) => void;
};
import { getCurrentFormattedDate } from '../helpers/utility_functions';
import { parseDatesFromString } from '../helpers/utility_functions';

export interface Note {
    id: number;
    name: string;
    created: string;
    category: string;
    content: string;
    dates: string;
    archived: boolean;
}

const note1 = "Upgrade my computer with an Intel Core i9 processor";
const note2 = "Reschedule the planting of the rose bush from 04/09/2023 to 05/10/2023";

const notes: Note[] = [
    {
        id: 1,
        name: 'Note 1',
        created: getCurrentFormattedDate(),
        category: 'Idea',
        content: note1,
        dates: parseDatesFromString(note1),
        archived: false
    },
    {
        id: 2,
        name: 'Note 2',
        created: getCurrentFormattedDate(),
        category: 'Random Thought',
        content: note2,
        dates: parseDatesFromString(note2),
        archived: false
    },
    {
        id: 3,
        name: 'Note',
        created: getCurrentFormattedDate(),
        category: 'Task',
        content: note2,
        dates: parseDatesFromString(note2),
        archived: false
    },
    {
        id: 4,
        name: 'Note',
        created: getCurrentFormattedDate(),
        category: 'Random Thought',
        content: note2,
        dates: parseDatesFromString(note2),
        archived: false
    },
    {
        id: 5,
        name: 'Note',
        created: getCurrentFormattedDate(),
        category: 'Task',
        content: note2,
        dates: parseDatesFromString(note2),
        archived: false
    },
    {
        id: 6,
        name: 'Note',
        created: getCurrentFormattedDate(),
        category: 'Idea',
        content: note2,
        dates: parseDatesFromString(note2),
        archived: false
    },
    {
        id: 7,
        name: 'Note',
        created: getCurrentFormattedDate(),
        category: 'Task',
        content: note2,
        dates: parseDatesFromString(note2),
        archived: false
    },
];

export default notes;

export const categories = ['Task', 'Random Thought', 'Idea'];
export const allowedFields = ['name', 'category', 'content'];

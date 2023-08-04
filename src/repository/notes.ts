import { getCurrentFormattedDate } from '../helpers/utility_functions';

export interface Note {
    id: number;
    name: string;
    created: string;
    category: string;
    content: string;
    archived: boolean;
}

const notes: Note[] = [
    {
        id: 1,
        name: 'Note 1',
        created: getCurrentFormattedDate(),
        category: 'Idea',
        content: 'Upgrade my computer with an Intel Core i9 processor',
        archived: false
    },
    {
        id: 2,
        name: 'Note 2',
        created: getCurrentFormattedDate(),
        category: 'Task',
        content: 'Reschedule the planting of the rose bush from 04/09/2023 to 05/10/2023',
        archived: false
    },
];

export default notes;

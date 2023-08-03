export interface Note {
    id: number;
    name: string;
    date: string;
    category: string;
    content: string;
}

const notes: Note[] = [
    {
        id: 1,
        name: 'Note 1',
        date: '2023-08-01',
        category: 'Idea',
        content: 'Upgrade my computer with an Intel Core i9 processor',
    },
    {
        id: 2,
        name: 'Note 2',
        date: '2023-08-02',
        category: 'Task',
        content: 'Reschedule the planting of the rose bush from 04/09/2023 to 05/10/2023',
    },
];

export default notes;

import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', listId: '1', name: 'Chalkbag', done: false },
  { id: '2', listId: '1', name: 'Shoes', done: false },
  { id: '3', listId: '1', name: 'Water bottle', done: false },
  { id: '4', listId: '1', name: 'Harness', done: false },
  { id: '5', listId: '1', name: 'Rope', done: false },
  { id: '6', listId: '1', name: 'Quickdrawers', done: false },
  { id: '7', listId: '1', name: 'Helmet', done: false },
  { id: '8', listId: '1', name: 'Tape', done: false },
  { id: '9', listId: '1', name: 'First Aid-Kit', done: false },
  { id: '10', listId: '1', name: 'Liquid Chalk', done: false },
  { id: '11', listId: '1', name: 'Slings', done: false },
  { id: '12', listId: '1', name: 'Topography', done: false },
  { id: '13', listId: '1', name: 'Snacks', done: false },
  { id: '14', listId: '2', name: 'Intouchables', done: false },
  { id: '15', listId: '2', name: 'The Pursuit of Happiness', done: false },
  { id: '16', listId: '2', name: 'Law Abiding Citizen', done: false },
  { id: '17', listId: '2', name: 'The Bucket List', done: false },
  { id: '18', listId: '3', name: 'Get a cute Dog', done: false },
  { id: '19', listId: '3', name: 'Visit New Sealand', done: false },
  { id: '20', listId: '3', name: 'Climb a 8A Route', done: false },
];

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => [...state, action.payload],
    removeItem: (state, action) =>
      state.filter((item) => item.id !== action.payload),
    setItem: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      item.name = action.payload.name;
      item.done = action.payload.done;
    },
    removeItemsByListId: (state, action) =>
      state.filter((item) => item.id !== action.payload),
  },
});

export const { addItem, removeItem, setItem, removeItemsByListId } =
  itemsSlice.actions;

export default itemsSlice.reducer;

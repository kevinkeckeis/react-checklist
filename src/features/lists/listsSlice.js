import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    title: 'Climbing Packlist',
  },
  { id: '2', title: 'Movielist' },
  { id: '3', title: 'Bucketlist' },
];

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action) => [...state, action.payload],
    removeList: (state, action) =>
      state.filter((list) => list.id !== action.payload),
    setList: (state, action) => {
      let list = state.find((list) => list.id === action.payload.id);
      list.title = action.payload.title;
    },
  },
});

export const { addList, removeList, setList } = listSlice.actions;

export default listSlice.reducer;

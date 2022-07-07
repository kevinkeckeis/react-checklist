import { configureStore } from '@reduxjs/toolkit';
import listReducer from '../components/listsSlice';
import itemsReducer from '../components/itemsSlice';

export const store = configureStore({
  reducer: { lists: listReducer, items: itemsReducer },
});

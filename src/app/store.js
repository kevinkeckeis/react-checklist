import { configureStore } from '@reduxjs/toolkit';
import listReducer from '../features/lists/listsSlice';
import itemsReducer from '../features/items/itemsSlice';

export const store = configureStore({
  reducer: { lists: listReducer, items: itemsReducer },
});

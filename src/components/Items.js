import { nanoid } from 'nanoid';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Item from './Item';
import { addItem } from './itemsSlice';

const Items = ({ handleSelection, listId }) => {
  const list = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [newName, setNewName] = useState('');
  const filterList = list.filter((item) => item.listId === listId);
  const renderList = useMemo(
    () => filterList.map((item) => <Item key={item.id} item={item} />),
    [list, listId]
  );

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newName === '') return;
    const newItem = {
      id: nanoid(),
      listId: listId,
      name: newName,
      done: false,
    };
    dispatch(addItem(newItem));
    setNewName('');
  };

  return (
    <div className='flex-1'>
      <form onSubmit={handleAddItem} className='flex h-8'>
        <input
          type='text'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className='form-input flex-1 mr-1 rounded-l'
          placeholder='add new item'
        />
        <input className='form-input py-1 px-2 rounded-r' type='submit'></input>
      </form>
      <ul className='pt-2'>{renderList}</ul>
    </div>
  );
};

export default Items;

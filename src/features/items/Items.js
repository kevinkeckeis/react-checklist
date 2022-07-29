import { nanoid } from 'nanoid';
import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Item from './Item';
import { addItem } from './itemsSlice';

const Items = ({ listId }) => {
  const list = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [newName, setNewName] = useState('');
  const filterList = list.filter((item) => item.listId === listId);
  const inputRef = useRef(null);
  const renderList = useMemo(
    () => filterList.map((item) => <Item key={item.id} item={item} />),
    [filterList]
  );

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newName === '') {
      inputRef.current.focus();
      return;
    }
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
          ref={inputRef}
        />
        <input
          className='form-input py-1 px-2 rounded-r hover:text-blue-700 hover:border-blue-700 cursor-pointer'
          type='submit'
        ></input>
      </form>
      <ul className='pt-2'>{renderList}</ul>
    </div>
  );
};

export default Items;

import { nanoid } from 'nanoid';
import React, { MouseEvent, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/store';
import Item from './Item';
import { addItem } from './itemsSlice';

type Props = {
  listId: string;
};

const Items: React.FC<Props> = ({ listId }) => {
  const list = useAppSelector((state) => state.items);
  const dispatch = useDispatch();
  const [newName, setNewName] = useState('');
  const filterList = list.filter((item) => item.listId === listId);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const renderList = useMemo(
    () => filterList.map((item) => <Item key={item.id} item={item} />),
    [filterList]
  );

  const handleAddItem = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newName === '') {
      inputRef.current?.focus();
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

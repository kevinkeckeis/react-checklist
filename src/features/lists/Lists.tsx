import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import List from './List';
import { nanoid } from '@reduxjs/toolkit';
import { addList } from './listsSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';

type Props = {
  handleSelection: (listId: string) => void;
  selection: string | null;
};

const Lists: React.FC<Props> = ({ handleSelection, selection }) => {
  const lists = useAppSelector((state) => state.lists);
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const renderList = lists.map((list) => {
    return (
      <List
        key={list.id}
        list={list}
        handleSelection={handleSelection}
        selection={selection}
      />
    );
  });

  const handleAddList = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle === '') {
      inputRef.current?.focus();
      return;
    }
    const newList = { id: nanoid(), title: newTitle };
    dispatch(addList(newList));
    setNewTitle('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className='flex-1'>
      <form onSubmit={handleAddList} className='flex h-8'>
        <input
          type='text'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className='form-input flex-auto mr-1 rounded-l'
          placeholder='add new list'
          ref={inputRef}
        />
        <input
          className='form-input py-1 px-2 rounded-r hover:text-blue-700 hover:border-blue-700 cursor-pointer'
          type='submit'
        />
      </form>
      <ul className='pt-2'>{renderList}</ul>
    </div>
  );
};

export default Lists;

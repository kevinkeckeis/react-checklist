import { CheckIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, setItem } from './itemsSlice';

const Item = ({ item }) => {
  const [name, setName] = useState(item.name);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const edit = (e) => {
    e.preventDefault();
    dispatch(setItem({ id: item.id, name: name, done: item.done }));
    setIsEdit(false);
  };

  const remove = () => {
    dispatch(removeItem(item.id));
  };

  const switchDone = (e) => {
    const newState = {
      id: item.id,
      name: item.name,
      done: item.done ? false : true,
    };
    dispatch(setItem(newState));
  };
  return (
    <li className='flex m-3 items-center'>
      <input
        type='checkbox'
        className='mr-2'
        onChange={switchDone}
        checked={item.done}
      />
      {isEdit ? (
        <>
          <form onSubmit={edit} className='flex-1'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='form-input h-7'
            />
          </form>
        </>
      ) : (
        <div
          className='flex-1 hover:text-blue-400 cursor-pointer select-none'
          onClick={switchDone}
        >
          {item.name}
        </div>
      )}

      {isEdit ? (
        <div
          className='text-gray-700 p-1 hover:text-green-400  cursor-pointer'
          onClick={edit}
        >
          <CheckIcon className='h-6 w-6' />
        </div>
      ) : (
        <div
          className='text-gray-700 p-1 hover:text-blue-400  cursor-pointer'
          onClick={() => setIsEdit(!isEdit)}
        >
          <PencilAltIcon className='h-6 w-6' />
        </div>
      )}
      <div
        className='text-gray-700 p-1 hover:text-blue-400 cursor-pointer'
        onClick={remove}
      >
        <TrashIcon className='h-6 w-6' />
      </div>
    </li>
  );
};

export default React.memo(Item);

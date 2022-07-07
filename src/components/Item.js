import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, setItem } from './itemsSlice';

const Item = ({ item }) => {
  const [name, setName] = useState(item.name);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  console.log(item);
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
      ) : (
        <div
          className='text-gray-700 p-1 hover:text-blue-400  cursor-pointer'
          onClick={() => setIsEdit(!isEdit)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            />
          </svg>
        </div>
      )}
      <div
        className='text-gray-700 p-1 hover:text-blue-400 cursor-pointer'
        onClick={remove}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
          />
        </svg>
      </div>
    </li>
  );
};

export default React.memo(Item);

import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItemsByListId, setItem } from './itemsSlice';
import { removeList, setList } from './listsSlice';

const List = ({ handleSelection, selection, list }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(list.title);
  const titleElement = useRef(null);
  const dispatch = useDispatch();
  const remove = () => {
    dispatch(removeList(list.id));
    dispatch(removeItemsByListId(list.id));
  };
  const select = (e) => {
    if (e.target === e.currentTarget || e.target === titleElement.current) {
      handleSelection(list.id);
    }
  };
  const edit = (e) => {
    e.preventDefault();
    setIsEdit(false);
    dispatch(setList({ id: list.id, title: title }));
  };

  return (
    <li
      onClick={select}
      className='flex py-3 hover:bg-blue-200 cursor-pointer items-center'
    >
      {isEdit ? (
        <>
          <form onSubmit={edit} className='flex-auto flex'>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='form-input h-7 flex-1'
            />
          </form>
        </>
      ) : selection === list.id ? (
        <div className='flex-1 font-bold mx-2' ref={titleElement}>
          {list.title}
        </div>
      ) : (
        <div className='flex-1 mx-2' ref={titleElement}>
          {list.title}
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

export default React.memo(List);

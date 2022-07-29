import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItemsByListId, setItem } from '../items/itemsSlice';
import { removeList, setList } from './listsSlice';
import { CheckIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

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

export default React.memo(List);

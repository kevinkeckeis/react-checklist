import React from 'react';

const Header = () => {
  console.log('header');
  return (
    <header>
      <h1 className='text-2xl text-center mb-5'>React Checklist</h1>
    </header>
  );
};

export default React.memo(Header);

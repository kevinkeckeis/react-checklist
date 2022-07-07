import Header from './components/Header';
import Lists from './components/Lists';
import Items from './components/Items';
import { useCallback, useState } from 'react';

function App() {
  const [selection, setSelection] = useState();
  const handleSelection = useCallback((listId) => setSelection(listId), []);

  return (
    <div className='container mx-auto p-10 max-w-screen-md'>
      <Header />
      <div className='flex flex-col md:flex-row gap-5'>
        <Lists handleSelection={handleSelection} selection={selection} />
        <Items listId={selection} />
      </div>
    </div>
  );
}

export default App;

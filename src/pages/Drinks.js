import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Drinks() {
  const { setHeaderTitle, setHideSearch } = useContext(MyContext);

  useEffect(() => {
    setHeaderTitle('Drinks');
    setHideSearch(true);
  });

  return (
    <div>
      <Header />
    </div>
  );
}

export default Drinks;

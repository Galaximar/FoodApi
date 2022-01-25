import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Ladding } from './components/Ladding';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { dietTypes } from './redux/actions/actions';
import { Container } from './components/Container';

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(dietTypes());
  },[dispatch])
  return (
    <div className="App">
      <h1>Henry Food</h1>
      <Routes>
        <Route path="/" element={<Ladding />} />
        <Route path="/food" element={<Container />} />
      </Routes>
    </div>
  );
}

export default App;

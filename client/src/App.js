import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Ladding } from './components/Ladding';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { dietTypes } from './redux/actions/actions';
import { Container } from './components/Container';
import { CreateRecipe } from './components/CreateRecipe';
import { CardInfo } from './components/CardInfo';
import { NavBar } from './components/NavBar';
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(dietTypes());
  },[dispatch])
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Ladding />} />
        <Route path="/food" element={<Container />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/food/info/:id" element={<CardInfo />}/>
      </Routes>
    </div>
  );
}

export default App;

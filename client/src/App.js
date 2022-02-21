import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Ladding } from './components/Ladding';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { dietTypes, getDietTypes } from './redux/actions/actions';
import { Container } from './components/Container';
import { CreateRecipe } from './components/CreateRecipe';
import { CardInfo } from './components/CardInfo';
import { NavBar } from './components/NavBar';
import { UpdateRecipe } from './components/UpdateRecipe';
import axios from 'axios';
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const fetchDietTypes=async ()=>{
      const data=await axios.get("http://localhost:3001/api/recipes/dietTypes/all");
      if(data.data.length===0) dispatch(dietTypes());
      else dispatch(getDietTypes());
      return data;
    }
    fetchDietTypes();
  },[dispatch])
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Ladding />} />
        <Route path="/food" element={<Container />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/food/info/:id" element={<CardInfo />}/>
        <Route path="/food/update/:id" element={<UpdateRecipe />}/>
      </Routes>
    </div>
  );
}

export default App;

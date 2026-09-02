import React,{useEffect,useState,} from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreManu from '../../components/ExploreMenu/ExploreManu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDowndload from '../../components/AppDowndload/AppDowndload'
import { useLocation } from 'react-router-dom'

const Home = () => {

  const[category,setCategory]=useState("All");

  const location = useLocation()

  useEffect(() => {
    
    if (location.state?.scrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [location])

  return (
    <div>
      <Header />
      <ExploreManu  category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
      <AppDowndload/>
    </div>
  )
}

export default Home

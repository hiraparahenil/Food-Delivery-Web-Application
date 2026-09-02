import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {

  // 🔍 StoreContext માંથી search પણ મેળવી લીધું
  const { food_list, search } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
          // ૧. કેટેગરી ફિલ્ટર શરત
          const matchesCategory = category === "All" || category === item.category;
          
          // ૨. સર્ચ ક્વેરી ફિલ્ટર શરત (કેસ ઇનસેન્સિટિવ)
          const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

          if (matchesCategory && matchesSearch) {
            return (
              <FoodItem 
                key={item._id || index} 
                id={item._id} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
                image={item.image} 
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
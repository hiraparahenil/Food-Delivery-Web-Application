import axios from "axios";
import { createContext } from "react";

export const StoreContext = createContext(null);
import { useState ,useEffect } from "react";



const StoreProvider = ( props ) => {

    const[cartItems, setCartItems] = useState({});
     const [token,setToken]=useState("");
     const[food_list,setFood_list] =useState([]);
     const [showLogin, setShowLogin] = useState(false);

    const url="http://localhost:4000"


    const addToCart = async(itemId) => {
      if(!cartItems[itemId]){
        setCartItems(prev => ({...prev, [itemId]: 1}));
      }
      else{
        setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1}));
      }
      if(token){
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      }
    }

    const removeFromCart = async(itemId) => { 
      setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));
      if(token){
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
      }
      
    }

   const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = food_list.find((product) => product._id === item);
      if (itemInfo) { // Checks if itemInfo is defined before accessing price
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
  }
  return totalAmount;
}

  const fetchFoodList = async () => {
  try {
    const response = await axios.get(url + "/api/food/list");
    setFood_list(response.data.data || []);
  } catch (error) {
    console.log("Error fetching food list:", error);
  }
}

const loadCartData = async(token)=>{
  const response =await axios.post(url+"/api/cart/get",{},{headers:{token}})
  setCartItems(response.data.cartData);
}

useEffect(() => {
  async function loadData() {
    await fetchFoodList();
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      await loadCartData(localStorage.getItem("token"));
    }
  }
  loadData();
}, [])


  const contextValue = {
  food_list,
  cartItems,
  setCartItems,
  addToCart,
  removeFromCart,
  getTotalCartAmount,
  url,
  token,
  setToken,
  showLogin,
  setShowLogin
}
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider;

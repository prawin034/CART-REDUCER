import React, { useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initialstate = {
  loading: false,
  error: false,
  cart: cartItems,
  total: 0,
  amount: 0, //it will be empty object but for time being we will passs data
  err: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  //CLEAR ALL ITEMS

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeItemsBasedOnID = (id) => {
    dispatch({ type: 'REMOVE_CART', payload: id });
  };

  const IncreaseAmount = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };
  const DECREASEAmount = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };

  const FetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const Response = await fetch(url);
      const data = await Response.json();
      dispatch({ type: 'CARTITEMS', payload: data });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
      console.log(err.message);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItemsBasedOnID,
        IncreaseAmount,
        DECREASEAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

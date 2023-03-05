const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }
  if (action.type === 'REMOVE_CART') {
    const filterItems = state.cart.filter((item) => item.id !== action.payload);

    return { ...state, cart: filterItems };
  }

  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }

        return cartItem;
      })
      .filter((item) => item.amount !== 0);

    return { ...state, cart: tempCart };
  }

  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        console.log(price, amount);
        cartTotal.amount += amount;
        cartTotal.total = cartTotal.total + price * amount;

        return cartTotal;
      },
      { total: 0, amount: 0 }
    );
    total = parseFloat(total.toFixed(1));
    return { ...state, total, amount };
  }
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }
  if (action.type === 'ERROR') {
    return { ...state, loading: false, error: true, err: action.payload };
  }
  if (action.type === 'CARTITEMS') {
    return { ...state, cart: action.payload, loading: false };
  }
  return state;
};

export default reducer;

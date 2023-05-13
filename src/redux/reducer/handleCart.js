const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADDITEM":
      // Check if Product already exists
      const exist = state.find((x) => x.sku === product.sku);
      if (exist) {
        // Increase the quantity
        return state.map((x) =>
          x.sku === product.sku ? { 
            ...x, 
            //check if quantity available is greater than quantity in cart; if so, don't add more
            qty: parseFloat(product.quantity_available) >= x.qty + 1 ? x.qty + 1 : x.qty
          } : x
        );
      } else {
        const product = action.payload;
        return [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
      }
      break;

    case "DELETEITEM":
      const exist1 = state.find((x) => x.sku === product.sku);
      if (exist1.qty === 1) {
        return state.filter((x) => x.sku !== exist1.sku);
      } else {
        return state.map((x) =>
          x.sku === product.sku ? { ...x, qty: x.qty - 1 } : x
        );
      }
      break;

    default:
      return state;
      break;
  }
};

export default handleCart;
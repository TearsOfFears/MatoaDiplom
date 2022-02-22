export const existingCartItem = ({prevCartItems, nextCartItem}) => {
  return prevCartItems.find(cartItem => cartItem.documentId === nextCartItem.documentId)
}

export const handleAddToCart = ({prevCartItems, nextCartItem}) => {
  const quantityIncrement = 1;
  const cartItemExists = existingCartItem({prevCartItems, nextCartItem});

  if (cartItemExists) {
    return prevCartItems.map(cartItem => cartItem.documentId === nextCartItem.documentId
      ? {
        ...cartItem,
        quantity: cartItem.quantity + quantityIncrement
      }
      : cartItem)
  }

  return [
    ...prevCartItems, {
      ...nextCartItem,
      quantity: quantityIncrement
    }
  ];

}


export const handleRemoveCartItem = ({
    prevCartItems,
    cartItemToRemove
})=>{
    return prevCartItems.filter( item =>item.documentId !== cartItemToRemove.documentId);
}


export const handleReduceCartItem = ({
    prevCartItems,
    cartItemToReduce
})=>{
    const existingCartItem = prevCartItems.find(cartItem => cartItem.documentId === cartItemToReduce.documentId);
    if(existingCartItem.quantity ===1){
       return (prevCartItems.filter( item =>item.documentId !== existingCartItem.documentId));
    }
    
    return prevCartItems.map( cartItem =>cartItem.documentId === existingCartItem.documentId ?
        {
            ...cartItem,
            quantity:cartItem.quantity-1
        }:
        cartItem
        );
}
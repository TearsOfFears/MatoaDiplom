import {createSelector} from "reselect"

export const selectCartData = state => state.cartData;

export const selectCartItems = createSelector(
    [selectCartData],
    cartData => cartData.cartItems
);


export const selectCartItemsCountPrice= createSelector(
  [selectCartItems],
  cartItems => cartItems.map((data,key)=>{
    if(typeof data.packageType === "undefined"){
      return 0
    }
   else{
    return data.quantity * data.packageType.price;
   }
   
  })
);


export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
      cartItems.reduce(
        (quantity, cartItem) =>
          quantity + cartItem.quantity
        , 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems=> cartItems.reduce((quantity,cartItem)=>
        quantity+cartItem.quantity * cartItem.price,0
    )
)






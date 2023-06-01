export const categoryConstants = {
  MENS_CLOTHING: "men's clothing",
  WOMENS_CLOTHING: "women's clothing",
  JEWELERY: "jewelery",
  ELECTRONICS: "electronics",
};

export const getCategory = (category) => {
  if (category === "mensClothing") return categoryConstants.MENS_CLOTHING;
  else if (category === "womensClothing")
    return categoryConstants.WOMENS_CLOTHING;
  else if (category === "jewelery") return categoryConstants.JEWELERY;
  else if (category === "electronics") return categoryConstants.ELECTRONICS;
};

export const updateProductConstansts = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  ADD_TO_WISHLIST: "addToWishlist",
  REMOVE_FROM_WISHLIST: "removeFromWishlist",
};

export const getUpdateProp = (product, action, rating) => {
  if (action === updateProductConstansts.INCREMENT) {
    return {
      quantity: product.quantity + 1,
      rating: { ...rating, count: rating?.count - 1 },
    };
  } else if (action === updateProductConstansts.DECREMENT) {
    return {
      quantity: product.quantity - 1,
      rating: { ...rating, count: rating?.count + 1 },
    };
  } else if (action === updateProductConstansts.ADD_TO_WISHLIST) {
    return { wishlist: true };
  } else if (action === updateProductConstansts.REMOVE_FROM_WISHLIST) {
    return { wishlist: false };
  }
};

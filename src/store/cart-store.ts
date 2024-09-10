import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartProduct } from '../types/product.type';

interface CartState {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      //Methods

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.21;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return { subTotal, tax, total, itemsInCart };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        //1.Revisar si el producto ya existe en el carrito
        const productInCart = cart.some(
          item => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //2.Se que el producto ya existe en el carrito, actualizar la cantidad
        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity
            };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          item => item.id !== product.id || item.size !== product.size
        );
        set({ cart: updatedCartProducts });
      }
    }),
    {
      name: 'shopping-cart' // Name of the item in the storage (must be unique!)
    }
  )
);

import { configureStore } from '@reduxjs/toolkit' 
import cartreducer from './Cartslice'

export const store = configureStore({
  reducer: {
    cart: cartreducer
  },
})
import { configureStore } from '@reduxjs/toolkit'
import suplierReducer from '../features/suplierSlice'
import barangReducer from '../features/barangSlice'

export default configureStore({
    reducer: {
        suplier:suplierReducer,
        barang:barangReducer,
    },
  })
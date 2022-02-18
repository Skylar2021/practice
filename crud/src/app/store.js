import { configureStore } from '@reduxjs/toolkit'
import staffSlice from './slice'

const reducer = {
  staff: staffSlice
}

const store = configureStore({
  reducer: reducer,
})

export default store
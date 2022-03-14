import { configureStore } from '@reduxjs/toolkit'
// import counterReducer  from './slice'
import staffInfo from './slice'

const reducer = {
  // counter: counterReducer
  staff: staffInfo
}

const store = configureStore({
  reducer: reducer,
})

export default store
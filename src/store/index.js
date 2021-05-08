
import { configureStore } from '@reduxjs/toolkit';

import { linksReducer } from './links';


const store = configureStore({
  reducer: {
  // TODO: Create auth reducer
    // auth: authReducer,
    links: linksReducer,
  }
});

export default store;
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import userReducer from './reducers/userReducer'
import activeReducer from './reducers/activeReducer'

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null)
    },
    setItem(_key, value) {
      return Promise.resolve(value)
    },
    removeItem(_key) {
      return Promise.resolve()
    },
  }
}

const localStorageConfig =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

const persistConfig = {
  key: 'root',
  storage: localStorageConfig,
  // blacklist: [],
}

const rootReducer = combineReducers({
  user: userReducer,
  active: activeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
})

export const persistor = persistStore(store)

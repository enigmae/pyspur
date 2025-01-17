import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import flowReducer from './flowSlice';
import { FlowState } from './flowSlice';
import nodeTypesReducer from './nodeTypesSlice';
import panelReducer from './panelSlice';
import type { Node, Edge } from '@xyflow/react';

// Define the RootState type
export interface RootState {
  flow: FlowState;
  nodeTypes: {
    data: Record<string, any>;
  };
  panel: {
    isNodePanelExpanded: boolean;
  };
}

// Define the persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['nodes', 'edges', 'nodeTypes'],
};

const rootReducer = combineReducers({
  flow: flowReducer,
  nodeTypes: nodeTypesReducer,
  panel: panelReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Define store types
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;

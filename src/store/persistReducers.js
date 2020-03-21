import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// Armazenando dados do usuário no storage do navegador.
export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'fastfeet',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};

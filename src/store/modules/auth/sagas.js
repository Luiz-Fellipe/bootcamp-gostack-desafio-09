import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~services/history';
import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    // passando o token no cabeçalho das chamadas a api
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    history.push('/deliveries');
  } catch (error) {
    console.tron.log(error);
    toast.error('Falha na autenticação. Verifique seus dados !');
    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

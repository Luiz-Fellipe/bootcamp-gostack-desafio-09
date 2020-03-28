import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Deliveries from '~/pages/Deliveries';
import Deliverymen from '~/pages/Deliverymen';
import Recipient from '~/pages/Recipient';
import DeliveryProblem from '~/pages/DeliveryProblem';
import FormAddDelivery from '~/pages/Deliveries/FormAddDelivery';

import SignIn from '~/pages/SignIn';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/encomendas" exact component={Deliveries} isPrivate />
      <Route
        path="/encomendas/cadastrar"
        exact
        component={FormAddDelivery}
        isPrivate
      />
      <Route path="/entregadores" exact component={Deliverymen} isPrivate />
      <Route path="/destinatarios" exact component={Recipient} isPrivate />
      <Route path="/problemas" exact component={DeliveryProblem} isPrivate />
    </Switch>
  );
}

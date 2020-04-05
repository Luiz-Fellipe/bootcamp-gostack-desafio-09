import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Deliveries from '~/pages/Deliveries';
import Deliverymen from '~/pages/Deliverymen';
import Recipient from '~/pages/Recipient';
import DeliveryProblem from '~/pages/DeliveryProblem';
import FormDelivery from '~/pages/Deliveries/FormDelivery';
import FormDeliveryman from '~/pages/Deliverymen/FormDeliveryman';
import FormRecipient from '~/pages/Recipient/FormRecipient';

import SignIn from '~/pages/SignIn';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/encomendas" exact component={Deliveries} isPrivate />
      <Route
        path="/encomendas/cadastrar"
        exact
        component={FormDelivery}
        isPrivate
      />
      <Route
        path="/encomendas/editar/:id"
        exact
        component={FormDelivery}
        isPrivate
      />
      <Route path="/entregadores" exact component={Deliverymen} isPrivate />
      <Route
        path="/entregadores/cadastrar"
        exact
        component={FormDeliveryman}
        isPrivate
      />
      <Route
        path="/entregadores/editar/:id"
        exact
        component={FormDeliveryman}
        isPrivate
      />
      <Route path="/destinatarios" exact component={Recipient} isPrivate />
      <Route
        path="/destinatarios/cadastrar"
        exact
        component={FormRecipient}
        isPrivate
      />
      <Route
        path="/destinatarios/editar/:id"
        exact
        component={FormRecipient}
        isPrivate
      />
      <Route path="/problemas" exact component={DeliveryProblem} isPrivate />
    </Switch>
  );
}

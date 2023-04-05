import { PropType } from 'vue';

import { OrderCheckoutInteractor } from 'src/uses-cases/order-checkout-interactor';
import { ExtractPublicPropTypes } from 'src/helpers/vue-prop-type';

export const orderCheckoutProperties = {
  'interactor': {
    'type': Object as PropType<OrderCheckoutInteractor>,
    'required': true
  }
};

export type OrderCheckoutProperties = ExtractPublicPropTypes<typeof orderCheckoutProperties>;

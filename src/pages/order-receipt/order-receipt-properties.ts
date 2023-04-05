import { PropType } from 'vue';

import { OrderReceiptInteractor } from 'src/uses-cases/order-receipt-interactor';
import { ExtractPublicPropTypes } from 'src/helpers/vue-prop-type';

export const orderReceiptProperties = {
  'id': {
    'type': String,
    'required': true
  },
  'interactor': {
    'type': Object as PropType<OrderReceiptInteractor>,
    'required': true
  }
};

export type OrderReceiptProperties = ExtractPublicPropTypes<typeof orderReceiptProperties>;

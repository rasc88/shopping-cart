import { PropType } from 'vue';

import { OrderProductInteractor } from 'src/uses-cases/order-product-interactor';
import { ExtractPublicPropTypes } from 'src/helpers/vue-prop-type';

export const productDetailsProperties = {
  'id': {
    'type': String,
    'required': true
  },
  'interactor': {
    'type': Object as PropType<OrderProductInteractor>,
    'required': true
  }
};

export type ProductDetailsProperties = ExtractPublicPropTypes<typeof productDetailsProperties>;

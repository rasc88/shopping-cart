import { PropType } from 'vue';

import { ExtractPublicPropTypes } from 'src/helpers/vue-prop-type';
import { ShippingMethods } from 'src/shipping-methods';

export const checkoutFormProperties = {
  'shippingMethods': {
    'type': Object as PropType<ShippingMethods>,
    'required': true
  },
  'countries': {
    'type': Object as PropType<string[]>,
    'required': true
  }
};

export type CheckoutFormProperties = ExtractPublicPropTypes<typeof checkoutFormProperties>;

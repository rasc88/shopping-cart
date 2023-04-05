import { PropType } from 'vue';

import { CartInfo } from 'src/entities/cart-info';
import { ExtractPublicPropTypes } from 'src/helpers/vue-prop-type';

export const cartWidgetProperties = {
  'cartInfo': {
    'type': Object as PropType<CartInfo>,
    'required': true
  }
};

export type CartWidgetProperties = ExtractPublicPropTypes<typeof cartWidgetProperties>;

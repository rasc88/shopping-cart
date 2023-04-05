import { ExtractPublicPropTypes } from 'src/helpers/vue-prop-type';

export const checkoutOptionsCardProperties = {
  'message': {
    'type': String,
    'required': true
  }
};

export type CheckoutOptionsCardProperties = ExtractPublicPropTypes<typeof checkoutOptionsCardProperties>;

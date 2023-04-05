import { PropType } from 'vue';

import { ExtractPublicPropTypes } from 'src/helpers/vue-prop-type';

export const addressInformationProperties = {
  'countries': {
    'type': Object as PropType<string[]>,
    'required': true
  }
};

export type AddressInformationProperties = ExtractPublicPropTypes<typeof addressInformationProperties>;

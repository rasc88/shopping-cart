<script lang="ts">
import { computed, defineComponent, reactive, ref, SetupContext, toRaw, watch } from 'vue';

import AddressInformation from 'components/address-information/address-information.vue';
import CardInformation from 'components/card-information/card-information.vue';
import { State } from './checkout-form-state';
import { checkoutFormProperties } from './checkout-form-properties';

function onSubmit (state: State, context: SetupContext): (event: Event) => void {
  return (event: Event) => {
    event.preventDefault();

    context.emit('complete-order', toRaw(state));
  };
}

function onChangedShipping (context: SetupContext): (newValue: string, oldValue: string) => void {
  return (newValue: string, oldValue: string) => {
    if (newValue !== oldValue) {
      context.emit('shipping-change', newValue);
    }
  };
}

function createState (): State {
  return reactive<State>({
    'customerEmail': '',
    'shippingAddress': {
      'country': '',
      'firstName': '',
      'lastName': '',
      'address': '',
      'city': '',
      'postalCode': ''
    },
    'shippingMethod': 'Free',
    'billingAddress': {
      'country': '',
      'firstName': '',
      'lastName': '',
      'address': '',
      'city': '',
      'postalCode': ''
    },
    'billingMethod': 'different-address',
    'cardInformation': {
      'number': '',
      'name': '',
      'cvv': '',
      'expirationDate': ''
    },
    'termsOfService': false
  }) as State;
}

function setup (_, context: SetupContext): Record<string, unknown> {
  const state = createState();
  const form = ref(null);

  watch(() => state.shippingMethod, onChangedShipping(context));

  return {
    'state': state,
    'form': form,
    'isNewBillingAddressVisible': computed(() => state.billingMethod === 'different-address'),
    'onSubmit': onSubmit(state, context)
  };
}

export default defineComponent({
  'name': 'checkout-form',
  'components': {
    AddressInformation,
    CardInformation
  },
  'props': checkoutFormProperties,
  'setup': setup
});
</script>

<template>
  <q-form
    :form="form"
    class="checkout-form full-width"
    @submit="onSubmit"
  >
    <div class="checkout-form__contact-information">
      <h6 class="no-margin text-bold text-primary q-pb-sm">
        Contact information
      </h6>
      <q-input
        v-model="state.customerEmail"
        type="email"
        label=""
        rounded
        outlined
        stack-label
        dense
        hide-bottom-space
        lazy-rules
        :rules="[ inputValue => inputValue && inputValue.length > 0 || 'Enter a valid email' ]"
      >
        <template #label>
          <span>Email Address</span>
        </template>
        <template #prepend>
          <q-icon
            name="mail_outline"
            color="grey-5"
          />
        </template>
      </q-input>
    </div>

    <div class="checkout-form__shipping-address q-mt-lg">
      <h6 class="no-margin text-bold text-primary q-pb-sm">
        Shipping Address
      </h6>
      <address-information
        v-model="state.shippingAddress"
        class="full-width"
        :countries="countries"
      />
    </div>

    <div class="checkout-form__shipping-method q-mt-lg">
      <h6 class="no-margin text-bold text-primary q-pb-sm">
        Shipping method
      </h6>
      <div
        v-for="([key, value]) in shippingMethods"
        :key="key"
        class="row q-pt-sm"
      >
        <q-radio
          v-model="state.shippingMethod"
          dense
          :val="key"
          :label="key"
        />
        <span class="text-caption text-bold text-right col">
          {{ value }}
        </span>
      </div>
    </div>

    <div class="checkout-form__billing-address  q-mt-lg">
      <h6 class="no-margin text-bold text-primary q-pb-sm">
        Billing address
      </h6>
      <div class="row q-pt-sm">
        <q-radio
          v-model="state.billingMethod"
          dense
          val="same-as-shipping"
          label="Same as shipping address"
        />
      </div>
      <div class="row q-pt-sm">
        <q-radio
          v-model="state.billingMethod"
          dense
          val="different-address"
          label="Use a different billing address"
        />
      </div>
      <address-information
        v-if="isNewBillingAddressVisible"
        v-model="state.billingAddress"
        :countries="countries"
        class="address-information full-width q-mt-lg"
      />
    </div>

    <card-information
      v-model="state.cardInformation"
      class="checkout-form__payment-information q-mt-lg"
    />

    <div class="checkout-form__terms q-mt-md">
      <div class="row items-start">
        <q-checkbox v-model="state.termsOfService" />
        <div class="col text-caption">
          By checking this box, I acknowledge that I have read and agree to the Terms of Service and Monthly Billing Terms of this website.
        </div>
      </div>
    </div>

    <div class="checkout-form__button q-mt-lg">
      <q-btn
        class="q-mt-sm"
        unelevated
        rounded
        color="primary"
        label="Complete order"
        no-caps
        icon-right="east"
        padding="sm lg"
        type="submit"
      />
    </div>
  </q-form>
</template>

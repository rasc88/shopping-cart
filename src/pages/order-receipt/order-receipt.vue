<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { ExtractInnerPropTypes } from 'src/helpers/vue-prop-type';
import CheckoutOptionsCard from 'components/checkout-options-card/checkout-options-card.vue';
import CartWidget from 'components/cart-widget/cart-widget.vue';
import { orderReceiptProperties } from './order-receipt-properties';
import { State } from './order-receipt-state';

type Properties = ExtractInnerPropTypes<typeof orderReceiptProperties>

function setupPage (state: State, props: Properties): void {
  const context = props.interactor.getOrderReceiptContext(props.id);

  state.cartInfo = context.cartInfo;
  state.orderReceipt = context.orderReceipt;
}

function createState (): State {
  return reactive<State>({
    'cartInfo': undefined,
    'orderReceipt': undefined
  }) as State;
}

function setup (props: Properties): Record<string, unknown> {
  const state = createState();

  setupPage(state, props);

  return {
    'state': state
  };
}

export default defineComponent({
  'name': 'order-receipt',
  'components': {
    CheckoutOptionsCard,
    CartWidget
  },
  'props': orderReceiptProperties,
  'setup': setup
});
</script>

<template>
  <q-page class="order-receipt row items-stretch">
    <div class="order-receipt__form-section col-md-6 col-sm-6 col-xs-12 q-pa-lg">
      <div class="row items-start">
        <div class="offset-md-3 offset-sm-1 col-md-7 col-sm-10 col-xs-12">
          <div class="fit column wrap justify-center items-center">
            <q-img
              class="q-mb-sm"
              src="/icons/thumbs-up.svg"
              width="7rem"
              :ratio="1"
            />
            <h6 class="no-margin text-bold text-primary">
              Thank you for your order
            </h6>
            <div class="no-margin text-primary q-pt-sm">
              Your order is confirmed
            </div>
            <q-chip
              class="q-my-lg q-pa-md"
              outline
              color="purple"
            >
              <span class="text-bold">Order ID: #{{ state.orderReceipt.id }}</span>
            </q-chip>
            <q-btn
              class="q-mt-sm"
              unelevated
              rounded
              color="primary"
              label="Back to Shop"
              no-caps
              icon="west"
              padding="sm lg"
              type="submit"
              to="/"
            />
          </div>
          <q-card
            class="order-receipt__form row q-pa-lg q-mt-lg"
            flat
            bordered
          >
            <div class="row full-width q-mb-lg">
              <div class="col-6">
                <div class="fit column wrap justify-start items-start content-start">
                  <span>Name:</span>
                  <span class="text-bold">{{ state.orderReceipt.customerName }}</span>
                </div>
              </div>
              <div class="col-6">
                <div class="fit column wrap justify-start items-start content-start">
                  <span>Email:</span>
                  <span class="text-bold">{{ state.orderReceipt.customerEmail }}</span>
                </div>
              </div>
            </div>
            <div class="row full-width q-mb-lg">
              <div class="col-6">
                <div class="fit column wrap justify-start items-start content-start">
                  <span>Shipping Address:</span>
                  <span class="text-bold">{{ state.orderReceipt.shippingAddress }}</span>
                </div>
              </div>
              <div class="col-6">
                <div class="fit column wrap justify-start items-start content-start">
                  <span>Billing Address:</span>
                  <span class="text-bold">{{ state.orderReceipt.billingAddress }}</span>
                </div>
              </div>
            </div>
            <div class="row full-width q-mb-lg">
              <div class="col-6">
                <div class="fit column wrap justify-start items-start content-start">
                  <span>Shipping:</span>
                  <span class="text-bold">{{ state.orderReceipt.shippingMethod }}</span>
                </div>
              </div>
              <div class="col-6">
                <div class="fit column wrap justify-start items-start content-start">
                  <span>Payment method:</span>
                  <span class="text-bold">{{ state.orderReceipt.paymentMethod }}</span>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>

    <div class="order-receipt__cart-section col-md-6 col-sm-6 col-xs-12 bg-grey q-pa-lg">
      <div class="row">
        <div class="col-md-7 col-sm-10 col-xs-12">
          <cart-widget
            class="order-receipt__cart-widget q-px-sm full-width"
            :cart-info="state.cartInfo"
          />
          <checkout-options-card
            class="order-receipt__checkout-icons q-mt-lg q-pa-sm"
            message="Secure SSL Encryption & Guaranteed Safe Checkout"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

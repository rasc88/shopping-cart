<script lang="ts">
import { defineComponent, onBeforeUnmount, reactive } from 'vue';
import { Router, useRouter } from 'vue-router';

import CheckoutOptionsCard from 'components/checkout-options-card/checkout-options-card.vue';
import CartWidget from 'src/components/cart-widget/cart-widget.vue';
import CheckoutForm from 'components/checkout-form/checkout-form.vue';
import { ExtractInnerPropTypes } from 'utils/vue-prop-type';
import { PurchaseOrder } from 'src/entities/purchase-order';
import { CartInfo } from 'src/entities/cart-info';
import { orderCheckoutProperties } from './order-checkout-properties';
import { State } from './order-checkout-state';

type Properties = ExtractInnerPropTypes<typeof orderCheckoutProperties>

function OnShippingChanged (props: Properties): (method: string) => void {
  return (method: string) => {
    props.interactor.setShippingMethod(method);
  };
}

function onOrderCreated (router: Router): (id: string) => void {
  return (id: string) => {
    router.push(`order-receipt/${id}`);
  };
}

function onCompleteOrder (props: Properties): (order: PurchaseOrder) => void {
  return (order: PurchaseOrder) => {
    props.interactor.createOrder(order);
  };
}

function onCartUpdated (state: State): (info: CartInfo) => void {
  return (info: CartInfo) => {
    state.cartInfo = info;
  };
}

function registerEvents (state: State, props: Properties, router: Router): void {
  state.subscriptions = [
    props.interactor.suscribe('order-created', onOrderCreated(router)),
    props.interactor.suscribe('cart-updated', onCartUpdated(state))
  ];
}

function doOnBeforeUnmount (state: State): void {
  state.subscriptions.forEach((unsubscribe) => unsubscribe());
}

function setupPage (state: State, props: Properties, router: Router): void {
  registerEvents(state, props, router);

  const context = props.interactor.getCheckoutFormContext();

  state.cartInfo = context.cartInfo;
  state.shippingMethods = context.shippingMethods;
  state.countries = context.countries;
}

function createState (): State {
  return reactive<State>({
    'cartInfo': undefined,
    'shippingMethods': undefined,
    'countries': [],
    'subscriptions': []
  }) as State;
}

function setup (props: Properties): Record<string, unknown> {
  const router = useRouter();
  const state = createState();

  setupPage(state, props, router);
  onBeforeUnmount(() => doOnBeforeUnmount(state));

  return {
    'state': state,
    'onCompleteOrder': onCompleteOrder(props),
    'OnShippingChanged': OnShippingChanged(props)
  };
}

export default defineComponent({
  'name': 'order-checkout',
  'components': {
    CheckoutOptionsCard,
    CartWidget,
    CheckoutForm
  },
  'props': orderCheckoutProperties,
  'setup': setup
});
</script>

<template>
  <q-page class="order-checkout row items-stretch">
    <div class="order-checkout__form-section col-md-6 col-sm-6 col-xs-12 q-pa-lg">
      <div class="row">
        <div class="offset-md-3 offset-sm-1 col-md-7 col-sm-10 col-xs-12">
          <div class="order-checkout__title row">
            <h5 class="no-margin text-bold text-primary">
              Checkout
            </h5>
          </div>
          <div class="order-checkout__breadcrumbs row q-pb-lg">
            <q-breadcrumbs>
              <template #separator>
                <q-icon
                  name="chevron_right"
                  color="primary"
                />
              </template>
              <q-breadcrumbs-el
                label="Cart"
                class="text-grey-6"
              />
              <q-breadcrumbs-el
                label="Shipping & Billing"
                class="text-bold text-primary"
              />
            </q-breadcrumbs>
          </div>
          <div class="order-checkout__form row">
            <checkout-form
              :shipping-methods="state.shippingMethods"
              :countries="state.countries"
              @shipping-change="OnShippingChanged"
              @complete-order="onCompleteOrder"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="order-checkout__cart-section col-md-6 col-sm-6 col-xs-12 bg-grey q-pa-lg">
      <div class="row">
        <div class="col-md-7 col-sm-10 col-xs-12">
          <cart-widget
            class="order-checkout__cart-widget q-px-sm full-width"
            :cart-info="state.cartInfo"
          />
          <checkout-options-card
            class="order-checkout__checkout-icons q-mt-lg q-pa-sm"
            message="Secure SSL Encryption & Guaranteed Safe Checkout"
          />
          <q-card
            class="order-checkout__club-message q-mt-lg q-pa-sm"
            flat
            bordered
          >
            <div class="row q-pa-md">
              <span class="text-caption text-bold q-py-sm">
                The ultimate jewellery club
              </span>
              <span class="text-caption">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </span>
              <div class="column full-width q-pt-md">
                <span class="text-caption">
                  <q-icon
                    color="positive"
                    name="check"
                  />
                  Extra 10% off.
                </span>
                <span class="text-caption">
                  <q-icon
                    color="positive"
                    name="check"
                  />
                  Free shiping.
                </span>
                <span class="text-caption">
                  <q-icon
                    color="positive"
                    name="check"
                  />
                  Free return.
                </span>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

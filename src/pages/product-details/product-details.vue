<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, reactive } from 'vue';
import { useQuasar } from 'quasar';

import CheckoutOptionsCard from 'components/checkout-options-card/checkout-options-card.vue';
import { ExtractInnerPropTypes } from 'utils/vue-prop-type';
import { productDetailsProperties } from './product-details-properties';
import { State } from './product-details-state';
import { Router, useRouter } from 'vue-router';

type Properties = ExtractInnerPropTypes<typeof productDetailsProperties>

function onButtonClicked (props: Properties, router: Router): () => void {
  return () => {
    props.interactor.updateCart();

    router.push('/checkout');
  };
}

function doOnBeforeUnmount (state: State): void {
  state.subscriptions.forEach((unsubscribe) => unsubscribe());
}

function registerEvents (state: State, props: Properties): void {
  state.subscriptions = [
    props.interactor.suscribe('update-product-qty', (qty: number) => { state.productQtySelected = qty; })
  ];
}

function setupPage (state: State, props: Properties): void {
  registerEvents(state, props);

  state.product = props.interactor.getProduct(props.id);
  state.currentImage = state.product.images[0].id;
}

function createState (): State {
  return reactive<State>({
    'productQtySelected': 1,
    'product': undefined,
    'currentImage': '',
    'subscriptions': []
  }) as State;
}

function setup (props: Properties): Record<string, unknown> {
  const state = createState();
  const router = useRouter();
  const $q = useQuasar();

  setupPage(state, props);
  onBeforeUnmount(() => doOnBeforeUnmount(state));

  return {
    'state': state,
    'onAddProduct': () => props.interactor.incrementProductQty(),
    'onRemoveProduct': () => props.interactor.decrementProductQty(),
    'isXsScreen': computed(() => $q.screen.xs),
    'onButtonClicked': onButtonClicked(props, router)
  };
}

export default defineComponent({
  'name': 'product-details',
  'components': {
    CheckoutOptionsCard
  },
  'props': productDetailsProperties,
  'setup': setup
});
</script>

<template>
  <q-page class="product-details row justify-center q-pa-lg">
    <div
      v-if="state.product"
      class="col-md-6 col-xs-12"
    >
      <q-carousel
        v-model="state.currentImage"
        class="product-details__carousel rounded-borders"
        control-type="push"
        animated
        arrows
        control-color="light-green
"
      >
        <q-carousel-slide
          v-for="image in state.product.images"
          :key="image.id"
          class="product-details__current-image"
          :name="image.id"
          :img-src="image.source"
        />
      </q-carousel>

      <q-card
        class="product-details__quantity-selection q-mt-lg q-pt-md"
        flat
        bordered
      >
        <q-card-section class="product-details__price-section q-pt-none">
          <div class="row items-center justify-center">
            <span class="text-weight-medium">Price: </span>
            <span class="q-mx-sm text-h6 text-weight-bolder">${{ state.product.price }}</span>
            <span class="text-bold q-pa-sm bg-grey rounded-borders">-{{ state.product.discount }}%</span>
          </div>
        </q-card-section>

        <q-card-section class="product-details__quantity-section q-pt-none">
          <div class="row items-center justify-center">
            <div class="col-md-8 col-xs-12 q-pa-sm bg-grey rounded-borders">
              <div class="row items-center justify-center">
                <span class="q-mx-md">Quantity:</span>
                <div
                  class="product-details__remove-button bg-white rounded-borders q-pa-sm"
                  @click="onRemoveProduct"
                >
                  <q-icon
                    name="remove"
                    class="text-h6"
                  />
                </div>
                <span class="q-mx-md">{{ state.productQtySelected }}</span>
                <div
                  class="product-details__add-button bg-white rounded-borders q-pa-sm"
                  @click="onAddProduct"
                >
                  <q-icon
                    name="add"
                    class="text-h6"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <div class="product-details__description q-mt-lg q-pa-sm">
        {{ state.product.description }}
      </div>

      <div class="row justify-between">
        <checkout-options-card
          class="product-details__checkout-options col-md-7 col-sm-7 col-xs-12 q-mt-lg q-pa-sm"
          message="Guaranteed Safe & Secure Checkout"
        />
        <q-card
          v-if="!isXsScreen"
          class="product-details__support-section col-md-4 col-sm-4 q-mt-lg q-pa-md"
          flat
          bordered
        >
          <div class="row items-center justify-center full-height no-wrap">
            <q-img
              class="product-details__support-agent-image"
              src="/icons/support-agent.jpg"
              fit="contain"
            />
            <div class="column q-ml-lg">
              <span class="text-bold">24/7</span>
              <span>Support</span>
            </div>
          </div>
        </q-card>
      </div>

      <div class="column items-center q-mt-lg q-gutter-lg">
        <q-btn
          class="product-details__confirm-button"
          unelevated
          rounded
          color="primary"
          label="Yes, I want"
          no-caps
          icon-right="east"
          padding="sm lg"
          @click="onButtonClicked"
        />
        <q-btn
          class="product-details__cancel-button text-caption"
          rounded
          flat
          color="primary"
          label="No, Thanks"
          no-caps
        />
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.product-details {
  &__description {
    white-space: pre-line;
  }

  &__support-agent-image {
    width: 4rem;
  }
}
</style>

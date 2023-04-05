<script lang="ts">
import { defineComponent } from 'vue';

import { cartWidgetProperties } from './cart-widget-properties';

export default defineComponent({
  'name': 'cart-widget',
  'props': cartWidgetProperties
});
</script>

<template>
  <div class="cart-widget">
    <div
      v-for="item in cartInfo.items"
      :key="item.product.id"
      class="cart-widget__product row items-center q-pt-sm"
    >
      <q-img
        class="cart-widget__product-image col-2 rounded-borders"
        :src="item.product.images[0].source"
        :ratio="1"
      >
        <div class="cart-widget__product-label text-caption">
          {{ item.quantity }}
        </div>
      </q-img>
      <span class="q-px-sm text-caption text-bold">
        {{ item.product.title }}
      </span>
      <span class="text-caption text-right col">
        ${{ item.total }}
      </span>
    </div>
    <hr>
    <div class="row q-pt-sm">
      <span class="text-caption text-bold">
        Subtotal:
      </span>
      <span class="text-caption text-right col">
        ${{ cartInfo.subtotal }}
      </span>
    </div>
    <div class="row q-pt-sm">
      <span class="text-caption text-bold">
        Shipping:
      </span>
      <span class="text-caption text-right col">
        {{ cartInfo.shipping }}
      </span>
    </div>
    <hr>
    <div class="row q-pt-sm">
      <span class="text-caption text-bold">
        Total:
      </span>
      <span class="text-caption text-bold text-right col">
        ${{ cartInfo.total }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-widget {
  &__product-image {
    overflow: visible;
  }

  &__product-label {
    position: relative;
    margin: 0;
    padding: 0;
    top: -0.25rem;
    left: -0.25rem;
    width: 1.5rem;

    color: black;
    text-align: center;

    background: white;
    border-radius: 50%;
    border: solid 1px gray;
  }
}
</style>

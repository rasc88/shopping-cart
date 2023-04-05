<script lang="ts">
import { defineComponent } from 'vue';
import { checkoutOptionsCardProperties } from './checkout-options-card-properties';

export default defineComponent({
  'title': 'checkout-options-card',
  'props': checkoutOptionsCardProperties
});
</script>

<template>
  <q-card
    class="checkout-options-card"
    flat
    bordered
  >
    <div class="row items-center justify-center q-pa-md">
      <div class="text-caption">
        <q-icon
          class="text-h6"
          name="lock_outline"
        /> {{ message }}
      </div>
      <div class="col-12 q-pt-sm">
        <q-img
          class="checkout-options-card__icons"
          src="/icons/checkout-icons.jpg"
          fit="contain"
        />
      </div>
    </div>
  </q-card>
</template>

<style lang="scss" scoped>
  .checkout-options-card {
    &__icons {
      max-height: 1.5rem;
    }
  }
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';

function setup (): Record<string, unknown> {
  const card = ref({
    'number': '',
    'name': '',
    'cvv': '',
    'expirationDate': ''
  });

  return {
    'card': card
  };
}

export default defineComponent({
  'name': 'card-information',
  'emits': ['update:modelValue'],
  'setup': setup
});
</script>

<template>
  <div class="card-information">
    <div class="row">
      <div class="full-width">
        <h6 class="no-margin text-bold text-primary">
          Payment method
        </h6>
        <div class="text-caption q-mb-md">
          All transactions are secured and encrypted
        </div>
        <q-input
          v-model="card.number"
          label=""
          rounded
          outlined
          stack-label
          dense
          hide-bottom-space
          mask="card"
          lazy-rules
          :rules="[ inputValue => inputValue && inputValue.length > 0 || 'Please enter a valid number']"
          @update:model-value="() => $emit('update:modelValue', card)"
        >
          <template #label>
            <span>Card number</span>
          </template>

          <template #prepend>
            <q-icon
              name="payment"
              color="grey-5"
            />
          </template>
        </q-input>
      </div>

      <div class="full-width q-mt-md">
        <q-input
          v-model="card.name"
          label=""
          rounded
          outlined
          stack-label
          dense
          hide-bottom-space
          lazy-rules
          :rules="[ inputValue => inputValue && inputValue.length > 0 || 'Please enter a value']"
          @update:model-value="() => $emit('update:modelValue', card)"
        >
          <template #label>
            <span>Name on Card</span>
          </template>

          <template #prepend>
            <q-icon
              name="mail_outline"
              color="grey-5"
            />
          </template>
        </q-input>
      </div>

      <div class="full-width row">
        <q-input
          v-model="card.expirationDate"
          class="col-md-6 col-sm-12 col-xs-12 q-mt-md"
          label=""
          rounded
          outlined
          stack-label
          dense
          hide-bottom-space
          mask="##/##"
          lazy-rules
          :rules="[ inputValue => inputValue && inputValue.length > 0 || 'Please enter a value']"
          @update:model-value="() => $emit('update:modelValue', card)"
        >
          <template #label>
            <span>MM/YY</span>
          </template>
        </q-input>
        <q-input
          v-model="card.cvv"
          class="offset-md-1 col-xs-12 col-sm-12 col-md-5 q-mt-md"
          label=""
          rounded
          outlined
          stack-label
          dense
          hide-bottom-space
          maxlength="3"
          mask="###"
          lazy-rules
          :rules="[ inputValue => inputValue && inputValue.length > 0 || 'Please enter a value']"
          @update:model-value="() => $emit('update:modelValue', card)"
        >
          <template #label>
            <span>CVV</span>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

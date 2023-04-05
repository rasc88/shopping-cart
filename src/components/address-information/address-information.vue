<script lang="ts">
import { Address } from 'src/entities/customer-address';
import { defineComponent, ref } from 'vue';

import { addressInformationProperties } from './address-information-properties';

function setup (): Record<string, unknown> {
  const address = ref<Address>({
    'country': '',
    'firstName': '',
    'lastName': '',
    'address': '',
    'city': '',
    'postalCode': ''
  });

  return {
    'address': address
  };
}

export default defineComponent({
  'name': 'address-information',
  'props': addressInformationProperties,
  'emits': ['update:modelValue'],
  'setup': setup
});
</script>

<template>
  <div class="address-information">
    <div class="full-width">
      <q-select
        v-model="address.country"
        :options="countries"
        label="Country"
        rounded
        outlined
        stack-label
        dense
        hide-bottom-space
        lazy-rules
        :rules="[ inputValue => inputValue && inputValue.length > 0 || 'Please select a country']"
        @update:model-value="() => $emit('update:modelValue', address)"
      >
        <template #label>
          <span>Country</span>
        </template>

        <template #prepend>
          <q-icon
            name="outlined_flag"
            color="grey-5"
          />
        </template>
      </q-select>
    </div>

    <div class="full-width row">
      <q-input
        v-model="address.firstName"
        class="col-md-6 col-sm-12 col-xs-12 q-mt-md"
        label=""
        rounded
        outlined
        stack-label
        dense
        hide-bottom-space
        lazy-rules
        :rules="[ inputValue => inputValue && inputValue.length > 0 || 'Please enter a valid name' ]"
        @update:model-value="() => $emit('update:modelValue', address)"
      >
        <template #label>
          <span>First Name</span>
        </template>

        <template #prepend>
          <q-icon
            name="person_outline"
            color="grey-5"
          />
        </template>
      </q-input>
      <q-input
        v-model="address.lastName"
        class="offset-md-1 col-md-5 col-sm-12 col-xs-12 q-mt-md"
        label=""
        rounded
        outlined
        stack-label
        dense
        hide-bottom-space
        lazy-rules
        :rules="[ inputValue => inputValue && inputValue.length > 0 || 'Please enter a valid last name' ]"
        @update:model-value="() => $emit('update:modelValue', address)"
      >
        <template #label>
          <span>Last Name</span>
        </template>

        <template #prepend>
          <q-icon
            name="person_outline"
            color="grey-5"
          />
        </template>
      </q-input>
    </div>

    <div class="full-width q-mt-md">
      <q-input
        v-model="address.address"
        label=""
        rounded
        outlined
        stack-label
        dense
        hide-bottom-space
        lazy-rules
        :rules="[ inputValue => inputValue && inputValue.length > 0 || 'Please enter a valid address' ]"
        @update:model-value="() => $emit('update:modelValue', address)"
      >
        <template #label>
          <span>Address</span>
        </template>

        <template #prepend>
          <q-icon
            name="my_location"
            color="grey-5"
          />
        </template>
      </q-input>
    </div>

    <div class="full-width row">
      <q-input
        v-model="address.city"
        class="col-md-6 col-sm-12 col-xs-12 q-mt-md"
        label=""
        rounded
        outlined
        stack-label
        dense
        hide-bottom-space
        lazy-rules
        :rules="[ inputValue => inputValue && inputValue.length > 0 || 'Please enter a valid city' ]"
        @update:model-value="() => $emit('update:modelValue', address)"
      >
        <template #label>
          <span>City</span>
        </template>
      </q-input>
      <q-input
        v-model="address.postalCode"
        type="number"
        class="offset-md-1 col-md-5 col-sm-12 col-xs-12 q-mt-md"
        label=""
        rounded
        outlined
        stack-label
        dense
        hide-bottom-space
        lazy-rules
        :rules="[ inputValue => inputValue && inputValue.length > 0 || 'Please enter a valid postal code' ]"
        @update:model-value="() => $emit('update:modelValue', address)"
      >
        <template #label>
          <span>Postal Code</span>
        </template>
      </q-input>
    </div>
  </div>
</template>

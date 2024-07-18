<script setup>
import { computed, ref } from 'vue'

const form = {
  vehicleBasePrice: ref(0),
  vehicleType: ref('common')
}

const basicBuyerFee = ref('')
const sellerSpecialFee = ref('')
const associationFee = ref('')
const storageFee = ref('')
const totalVehiclePrice = ref('')

const errors = ref({})

const isVehicleBasePriceValid = computed(
  () => form.vehicleBasePrice.value > -1 || form.vehicleBasePrice.value === ''
)
const validateField = (field) => {
  if (field === 'vehicleBasePrice' && !isVehicleBasePriceValid.value) {
    errors.value.vehicleBasePrice = 'Base price should be greater or equal to 0.'
  }
}

const sendVehicleInfo = async () => {
  errors.value = {}
  validateField('vehicleBasePrice')
  if (Object.keys(errors.value).length === 0) {
    try {
      // NOTE: I don't usually use fetch, I use axios with a state manager like Pinia, Vuex or tanStackQuery. I'm using fetch right now only to remove all unnecessary code and libraries for only one request.
      // NOTE2: Obviously I would usually use env variables for the base url but it simplifies things for now
      const response = await fetch(
        `http://localhost:5292/api/auction/getTotalVehiclePrice?basePrice=${form.vehicleBasePrice.value}&vehicleType=${form.vehicleType.value}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const detailledVehicleCost = await response.json()

      basicBuyerFee.value = parseFloat(detailledVehicleCost.basicBuyerFee).toFixed(2)
      sellerSpecialFee.value = parseFloat(detailledVehicleCost.sellerSpecialFee).toFixed(2)
      associationFee.value = parseFloat(detailledVehicleCost.associationFee).toFixed(2)
      storageFee.value = parseFloat(detailledVehicleCost.storageFee).toFixed(2)
      totalVehiclePrice.value = parseFloat(detailledVehicleCost.totalVehiclePrice).toFixed(2)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<template>
  <section class="m-8">
    <h1 class="text-5xl mb-5 font-bold">Calculate vehicle bid</h1>
    <form @submit.prevent="sendVehicleInfo" class="mb-7">
      <div class="flex flex-col mb-5">
        <span class="text-red-500" v-if="errors.vehicleBasePrice && !isVehicleBasePriceValid">{{
          errors.vehicleBasePrice
        }}</span>
        <label for="basePrice" class="text-sm">Vehicle base price</label>
        <input
          required
          type="number"
          name="basePrice"
          id="basePrice"
          class="pl-2 rounded h-8 border-2 border-black"
          v-model="form.vehicleBasePrice.value"
          @blur="validateField('vehicleBasePrice')"
        />
      </div>
      <div class="flex flex-col mb-5">
        <label for="vehicleType" class="text-sm">Vehicle type</label>
        <select
          name="vehicleType"
          id="vehicleType"
          class="rounded h-8 border-2 border-black"
          v-model="form.vehicleType.value"
        >
          <option value="common">Common</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>
      <button type="submit" class="rounded bg-black text-white p-2" :disabled="errors.length > 0">
        Calculate
      </button>
    </form>

    <h3 class="font-bold text-2xl mb-5">Calculation result</h3>
    <div class="flex flex-col">
      <span>Basic buyer fees: {{ basicBuyerFee }}</span>
      <span>Seller fees: {{ sellerSpecialFee }}</span>
      <span>Association fees: {{ associationFee }}</span>
      <span>Storage fees: {{ storageFee }}</span>
    </div>
    <div>
      <span class="font-bold">Total vehicule cost: {{ totalVehiclePrice }} </span>
    </div>
  </section>
</template>

<style scoped></style>

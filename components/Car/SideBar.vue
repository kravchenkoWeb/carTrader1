<script setup>
const { makes } = useCars();
const modal = ref({ make: false, location: false, price: false });
const route = useRoute();
const router = useRouter();
const city = ref("");
const priceRange = ref({
  min: "",
  max: "",
});
const updateModal = (key) => {
  modal.value[key] = !modal.value[key];
};

const priceRangeText = computed(() => {
  const { minPrice, maxPrice } = route.query;
  if (!minPrice && !maxPrice) {
    return "Any";
  } else if (!minPrice && maxPrice) {
    return `< $${maxPrice}`;
  } else if (!maxPrice && minPrice) {
    return `> $${minPrice}`;
  } else {
    return `$${minPrice} - $${maxPrice}`;
  }
});

const onChangeLocation = () => {
  if (!city.value) {
    return;
  }

  if (!isNaN(parseInt(city.value))) {
    throw createError({
      statusCode: 400,
      message: "Invalid city format",
    });
  }
  updateModal("location");

  navigateTo({
    name: "city-city-car-make",
    params: { city: city.value, make: route.params.make },
  });

  city.value = "";
};

const onChangeMake = (make) => {
  updateModal("make");
  navigateTo({
    name: "city-city-car-make",
    params: { city: route.params.city, make },
  });
};

const onPriceChange = () => {
  updateModal("price");
  if (priceRange.value.min && priceRange.value.max) {
    if (parseInt(priceRange.value.min) > parseInt(priceRange.value.max)) {
      return;
    }

    router.push({
      name: "city-city-car-make",
      params: { ...route.params },
      query: { minPrice: priceRange.value.min, maxPrice: priceRange.value.max },
    });
  }
};
</script>

<template>
  <div class="shadow border w-64 mr-10 z-30 h-[190px]">
    <!-- LOCATION STARTS -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Location</h3>
      <h3 @click="updateModal('location')" class="text-blue-400 capitalize">
        {{ route.params.city }}
      </h3>
      <div
        v-if="modal.location"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input v-model="city" type="text" class="border p-1 rounded" />
        <button
          @click="onChangeLocation"
          class="bg-blue-400 w-full mt-2 rounded text-white p-1"
        >
          Apply
        </button>
      </div>
    </div>
    <!-- LOCATION ENDS -->

    <!-- MAKE STARTS -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Make</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('make')">
        {{ route.params.make || "Any" }}
      </h3>
      <div
        v-if="modal.make"
        class="absolute border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white"
      >
        <h4
          v-for="make in makes"
          :key="make"
          class="w-1/3"
          @click="onChangeMake(make)"
        >
          {{ make }}
        </h4>
      </div>
    </div>
    <!-- MAKE ENDS -->

    <!-- PRICE START -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Price</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('price')">
        {{ priceRangeText }}
      </h3>
      <div
        v-if="modal.price"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input
          class="border p-1 rounded"
          type="number"
          placeholder="Min"
          v-model="priceRange.min"
        />
        <input
          class="border p-1 rounded"
          type="number"
          placeholder="Max"
          v-model="priceRange.max"
        />
        <button
          @click="onPriceChange"
          class="bg-blue-400 w-full mt-2 rounded text-white p-1"
        >
          Apply
        </button>
      </div>
    </div>
    <!-- PRICE ENDS -->
  </div>
</template>

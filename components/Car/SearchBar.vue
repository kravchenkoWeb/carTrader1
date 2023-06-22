<script setup>
const city = ref("");
const cityError = ref(false);

const handleSearch = () => {
  if (!city.value) {
    return (cityError.value = true);
  }

  navigateTo({ name: "city-city-car-make", params: { city: city.value } });
};
</script>

<template>
  <div
    class="font-serif w-[1000px] text-2xl rounded-full bg-white flex justify-between overflow-hidden drop-shadow-2xl mx-auto"
  >
    <input
      :class="{ 'border-red-500 border': cityError }"
      type="text"
      class="py-3 px-5 w-full text-2xl rounded-full focus:outline-none"
      placeholder="Search by city..."
      v-model="city"
    />
    <button class="bg-sky-500 px-10 text-white" @click="handleSearch">
      Search
    </button>
  </div>
</template>

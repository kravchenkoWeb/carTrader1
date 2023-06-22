<script setup>
const route = useRoute();
const { capitalizeFirstLetter } = useUtilities();
useHead({
  title: `${capitalizeFirstLetter(route.params.name)}`,
});

const { data: car } = await useFetchCar(route.params.id);

definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div>
    <CarDetailHero :car="car" />

    <CarDetailAttributes :features="car.features" />

    <CarDetailDescription :description="car.description" />

    <CarDetailContact />
  </div>
</template>

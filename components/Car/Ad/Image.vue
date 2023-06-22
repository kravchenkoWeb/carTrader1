<script setup>
const image = useState("carImage", () => {
  return {
    preview: null,
    image: null,
  };
});

const emits = defineEmits("changeInput");

const onImageUpload = (evt) => {
  const input = evt.target;
  if (input.files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value.preview = e.target.result;
    };
    image.value.image = input.files[0];
    reader.readAsDataURL(input.files[0]);
    emits("changeInput", input.files[0], "image");
  }
};
</script>

<template>
  <div class="col-md-5 offset-md-1 mt-2 w-[100%]"></div>
  <label for="" class="text-cyan-500 mb-1 text-sm">Image *</label>
  <form class="mt-2">
    <div class="form-group">
      <div class="relative">
        <input
          type="file"
          accept="image/*"
          class="opacity-0 absolute cursor-pointer"
          @change="onImageUpload"
        />
        <span class="cursor-pointer">Browse file</span>
      </div>
      <div v-if="image.preview" class="border p-2 mt-3 w-66">
        <img :src="image.preview" alt="image" class="img-fluid" />
      </div>
    </div>
  </form>
</template>

<script setup>
const user = useSupabaseUser();
const supabaseclient = useSupabaseClient();
const logout = async () => {
  // manually remove cookie with supabase
  // try {
  //   await $fetch("/api/_supabase/session", {
  //     method: "POST",
  //     body: {
  //       event: "SIGNED_OUT",
  //       session: null,
  //     },
  //   });
  // } catch (err) {
  //   console.log(err);
  // }

  // user.value = null;

  // make user.value = null;
  // remove jwt from cookie
  const { error } = supabaseclient.auth.signOut();
  if (error) {
    console.log(error);
  }
  // navigate to public page

  navigateTo({
    name: "index",
  });
};
</script>

<template>
  <header
    class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
  >
    <NuxtLink class="text-3xl font-mono" :to="{ name: 'index' }"
      >cartrader</NuxtLink
    >
    <div>
      <div v-if="user">
        <button @click="logout" class="bg-red-400 rounded p-3 text-white mr-3">
          Logout
        </button>
        <button
          @click="navigateTo({ name: 'profile-listings' })"
          class="bg-blue-400 rounded p-3 text-white"
        >
          Profile
        </button>
      </div>
      <button
        v-else
        @click="navigateTo({ name: 'login' })"
        class="bg-blue-400 rounded p-3 text-white"
      >
        Login
      </button>
    </div>
  </header>
</template>

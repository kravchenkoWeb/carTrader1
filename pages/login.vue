<script setup>
definePageMeta({
  layout: "custom",
  title: "Login",
});

const supabase = useSupabaseClient();
const login = async () => {
  const { error } = supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.log(error);
  }
};

const user = useSupabaseUser();
</script>

<template>
  <div class="mt-10">
    <h1 class="text-5xl font-bold mb-7">Login</h1>
    <pre>{{ user }}</pre>
    <button @click="login" class="bg-red-400 p-3 rounded text-white font-bold">
      Login with google
    </button>
  </div>
</template>

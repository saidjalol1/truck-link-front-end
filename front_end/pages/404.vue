<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white text-gray-700 px-6 text-center">
    <h1 class="text-9xl font-extrabold text-blue-600">404</h1>
    <p class="text-2xl md:text-3xl font-semibold mt-4">Oops! Sahifa topilmadi.</p>
    <p class="text-gray-500 mt-2">Siz izlayotgan sahifa mavjud emas yoki boshqa joyga ko‘chirildi.</p>
    
    <div class="mt-8 flex gap-4">
      <NuxtLink to="/" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300">
        Bosh sahifaga qaytish
      </NuxtLink>
      <NuxtLink to="/contact" class="border border-gray-300 hover:border-blue-600 hover:text-blue-600 py-2 px-6 rounded-lg transition-all duration-300">
        Bog‘lanish
      </NuxtLink>
    </div>

    <img
      src="/images/404-illustration.svg"
      alt="404 Image"
      class="mt-12 w-full max-w-md mx-auto"
    />
  </div>
</template>

<script setup>
// No logic needed for static page
</script>

<style scoped>
/* Optional custom styles */
</style>

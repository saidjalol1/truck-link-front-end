<!-- layouts/error.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen px-4">
  <div class="text-center max-w-lg mx-auto">
    <!-- Robot SVG -->
    <div class="mx-auto mb-6 w-40 h-40">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="100" fill="#F3F4F6"/>
        <rect x="60" y="60" width="80" height="80" rx="12" fill="#E5E7EB"/>
        <circle cx="80" cy="90" r="8" fill="#3B82F6"/>
        <circle cx="120" cy="90" r="8" fill="#3B82F6"/>
        <rect x="85" y="120" width="30" height="8" rx="4" fill="#9CA3AF"/>
        <rect x="92" y="40" width="16" height="30" rx="8" fill="#3B82F6"/>
        <circle cx="100" cy="38" r="6" fill="#3B82F6"/>
      </svg>
    </div>

    <!-- Text -->
    <h1 class="text-5xl font-bold text-gray-800 mb-2">404</h1>
    <p class="text-lg text-gray-600 mb-4">Oops! Page not found</p>
    <p class="text-sm text-gray-500 mb-6">The page you are looking for doesn’t exist or has been moved.</p>

    <!-- Button -->
    <a href="/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow">
      Go to Homepage
    </a>
  </div>
</div>
</template>

<script setup>
defineProps({
  error: Object
})
</script>
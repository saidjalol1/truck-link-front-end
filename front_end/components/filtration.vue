<template>
  <div class="w-full mb-4">
    <!-- Compact Filter toggle button -->
    <button 
      class="flex items-center justify-center gap-2 w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors relative"
      @click="toggleFilters"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
      </svg>
      Saralash
      <span 
        v-if="activeFiltersCount > 0" 
        class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
      >
        {{ activeFiltersCount }}
      </span>
    </button>

    <!-- Compact Filter panel -->
    <div 
      class="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 md:relative md:inset-auto md:bg-transparent md:z-auto"
      :class="showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto'"
      @click="closeFiltersOnOverlay"
    >
      <div 
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto transform transition-transform duration-300 md:relative md:bottom-auto md:rounded-xl md:max-h-none md:overflow-visible md:mt-2 md:border md:border-gray-200 md:shadow-sm"
        :class="showFilters ? 'translate-y-0' : 'translate-y-full md:translate-y-0'"
        @click.stop
      >
        <!-- Mobile header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-100 md:hidden">
          <h3 class="text-lg font-semibold text-gray-900">Filters</h3>
          <div class="flex items-center gap-3">
            <button 
              v-if="activeFiltersCount > 0"
              @click="clearAllFilters"
              class="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear All
            </button>
            <button 
              @click="toggleFilters"
              class="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Desktop clear button -->
        <div 
          v-if="activeFiltersCount > 0"
          class="hidden md:flex justify-end p-3 pb-0"
        >
          <button 
            @click="clearAllFilters"
            class="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 hover:bg-gray-50 rounded transition-colors"
          >
            Clear All
          </button>
        </div>

        <!-- Compact Filter grid -->
        <div class="p-4 md:p-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            <!-- Date Range Filter -->
            <div class="space-y-2">
              <label class="block text-xs font-medium text-gray-700">Qo'shilgan sana</label>
              <div class="flex gap-2">
                <input 
                  type="date" 
                  class="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="From"
                >
                <input 
                  type="date" 
                  class="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="To"
                >
              </div>
            </div>

            <!-- Location From -->
            <div class="space-y-2">
              <label class="block text-xs font-medium text-gray-700">Qayerdan</label>
              <select class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white">
                <option>All Cities</option>
                <option>Chicago, IL</option>
                <option>New York, NY</option>
                <option>Los Angeles, CA</option>
              </select>
            </div>

            <!-- Location To -->
            <div class="space-y-2">
              <label class="block text-xs font-medium text-gray-700">Qayerga</label>
              <select class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white">
                <option>All Cities</option>
                <option>Indianapolis, IN</option>
                <option>Boston, MA</option>
                <option>Miami, FL</option>
              </select>
            </div>

            <!-- Weight Range -->
            <div class="space-y-2">
              <label class="block text-xs font-medium text-gray-700">Og'irlik (lbs)</label>
              <div class="flex gap-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  class="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                <input 
                  type="number" 
                  placeholder="Max"
                  class="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
            </div>

            <!-- Vehicle Type -->
            <div class="space-y-2">
              <label class="block text-xs font-medium text-gray-700">Mashina turi</label>
              <div class="space-y-1.5">
                <label class="flex items-center gap-2 text-xs cursor-pointer">
                  <input 
                    type="checkbox" 
                    class="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  >
                  <span class="text-gray-700">Van</span>
                </label>
                <label class="flex items-center gap-2 text-xs cursor-pointer">
                  <input 
                    type="checkbox" 
                    class="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  >
                  <span class="text-gray-700">Truck</span>
                </label>
                <label class="flex items-center gap-2 text-xs cursor-pointer">
                  <input 
                    type="checkbox" 
                    class="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  >
                  <span class="text-gray-700">Semi</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="space-y-2 sm:col-span-2 lg:col-span-1">
              <label class="block text-xs font-medium text-gray-700">Narx ($)</label>
              <div class="flex gap-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  class="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                <input 
                  type="number" 
                  placeholder="Max"
                  class="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
            </div>

            <!-- Distance Range -->
            <div class="space-y-2">
              <label class="block text-xs font-medium text-gray-700">Masofa (mi)</label>
              <div class="flex gap-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  class="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                <input 
                  type="number" 
                  placeholder="Max"
                  class="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile apply button -->
        <div class="p-4 pt-0 border-t border-gray-100 md:hidden">
          <button 
            @click="applyFilters"
            class="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showFilters = ref(false)
const activeFiltersCount = ref(2) // Mock active filter count

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const closeFiltersOnOverlay = (event) => {
  if (event.target === event.currentTarget) {
    showFilters.value = false
  }
}

const clearAllFilters = () => {
  activeFiltersCount.value = 0
  // Add logic to clear all filter values
  console.log('Clearing all filters')
}

const applyFilters = () => {
  showFilters.value = false
  // Add logic to apply filters
  console.log('Applying filters')
}
</script>
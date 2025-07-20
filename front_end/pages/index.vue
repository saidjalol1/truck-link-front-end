<template>
  <div class="flex">
    <div class="hidden md:block lg:block">
      <TruckersSidebarMenu />
    </div>
    <div class="w-full">
      <TruckersHeader />
      <div class="px-3 mt-2">
        <Filtration />
      </div>

      <!-- Results Summary -->
      <div class="px-3">
        <p class="text-xs text-gray-600">
          Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} loads
        </p>
      </div>

      <!-- Cards container - Compact Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 px-3 mb-4">
        <LoadCard 
          v-for="(load, index) in paginatedLoads" 
          :key="`load-${currentPage}-${index}`"
          :load="load"
          @click="openModal(load)"
          class="cursor-pointer hover:shadow-md transition-shadow duration-150"
        />
      </div>

      <!-- Load Detail Modal -->
      <LoadModal 
        :isOpen="modalOpen"
        :loadData="selectedLoad"
        @close="closeModal"
        @accept="handleAcceptLoad"
      />

      <!-- Compact Pagination -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-3 pb-4 px-3">
        <div class="flex items-center gap-2">
          <!-- Previous button -->
          <button 
            class="flex items-center px-2 py-1 text-xs border border-gray-300 bg-white rounded hover:bg-gray-50 hover:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <!-- Page numbers -->
          <div class="flex items-center gap-1">
            <!-- First page -->
            <button 
              v-if="showFirstPage"
              class="min-w-[28px] h-7 flex items-center justify-center text-xs border border-gray-300 bg-white rounded hover:bg-gray-50 hover:border-blue-400 transition-colors"
              :class="{ 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600': currentPage === 1 }"
              @click="goToPage(1)"
            >
              1
            </button>

            <!-- Left ellipsis -->
            <span v-if="showLeftEllipsis" class="px-1 text-xs text-gray-500">...</span>

            <!-- Visible page numbers -->
            <button 
              v-for="page in visiblePages" 
              :key="page"
              class="min-w-[28px] h-7 flex items-center justify-center text-xs border border-gray-300 bg-white rounded hover:bg-gray-50 hover:border-blue-400 transition-colors"
              :class="{ 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600': currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>

            <!-- Right ellipsis -->
            <span v-if="showRightEllipsis" class="px-1 text-xs text-gray-500">...</span>

            <!-- Last page -->
            <button 
              v-if="showLastPage"
              class="min-w-[28px] h-7 flex items-center justify-center text-xs border border-gray-300 bg-white rounded hover:bg-gray-50 hover:border-blue-400 transition-colors"
              :class="{ 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600': currentPage === totalPages }"
              @click="goToPage(totalPages)"
            >
              {{ totalPages }}
            </button>
          </div>

          <!-- Next button -->
          <button 
            class="flex items-center px-2 py-1 text-xs border border-gray-300 bg-white rounded hover:bg-gray-50 hover:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>

        <!-- Items per page selector -->
        <div class="flex items-center gap-2">
          <label for="perPage" class="text-xs text-gray-600 whitespace-nowrap">Per page:</label>
          <select 
            id="perPage"
            v-model="itemsPerPage" 
            @change="handleItemsPerPageChange"
            class="px-2 py-1 text-xs border border-gray-300 rounded bg-white cursor-pointer focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="md:hidden">
    <TruckersBottomMenu />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'


// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Enhanced mock data with complete load information
const allLoads = ref([
  ...Array.from({ length: 100 }, (_, i) => {
    const origins = [
      { city: 'Chicago', state: 'IL', address: '1234 Industrial Blvd, Chicago, IL 60608' },
      { city: 'New York', state: 'NY', address: '5678 Freight St, Brooklyn, NY 11220' },
      { city: 'Los Angeles', state: 'CA', address: '9012 Logistics Ave, Los Angeles, CA 90058' },
      { city: 'Miami', state: 'FL', address: '3456 Port Rd, Miami, FL 33142' }
    ]
    
    const destinations = [
      { city: 'Indianapolis', state: 'IN', address: '7890 Warehouse Dr, Indianapolis, IN 46220' },
      { city: 'Boston', state: 'MA', address: '2345 Distribution Ct, Boston, MA 02128' },
      { city: 'Phoenix', state: 'AZ', address: '6789 Supply Chain Blvd, Phoenix, AZ 85043' },
      { city: 'Atlanta', state: 'GA', address: '4567 Cargo Way, Atlanta, GA 30309' }
    ]

    const cargoTypes = ['Electronics', 'Machinery', 'Food Products', 'Textiles', 'Auto Parts', 'Medical Supplies']
    const vehicles = ['Van', 'Truck', 'Semi', 'Flatbed', 'Refrigerated']
    const shippers = [
      'ABC Logistics Inc.', 'Global Freight Solutions', 'Premier Transport Co.', 
      'Nationwide Shipping LLC', 'Elite Cargo Services', 'Fast Track Logistics'
    ]

    const origin = origins[Math.floor(Math.random() * origins.length)]
    const destination = destinations[Math.floor(Math.random() * destinations.length)]
    const distance = Math.floor(Math.random() * 500) + 100
    const baseRate = Math.floor(Math.random() * 800) + 400
    const fuelSurcharge = Math.floor(baseRate * 0.1)
    const additionalFees = Math.floor(Math.random() * 50) + 10
    const totalPrice = baseRate + fuelSurcharge + additionalFees

    return {
      id: i + 1,
      loadId: `LD-2024-${String(i + 1).padStart(6, '0')}`,
      origin: {
        ...origin,
        date: 'May 15, 2025',
        time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 6)}0 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        contact: ['John Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'][Math.floor(Math.random() * 4)],
        phone: `(${Math.floor(Math.random() * 900) + 100}) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
      },
      destination: {
        ...destination,
        date: 'May 16, 2025',
        time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 6)}0 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        contact: ['Lisa Davis', 'Tom Anderson', 'Maria Garcia', 'James Taylor'][Math.floor(Math.random() * 4)],
        phone: `(${Math.floor(Math.random() * 900) + 100}) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
      },
      details: {
        distance: distance,
        weight: `${(Math.floor(Math.random() * 20000) + 5000).toLocaleString()}`,
        vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
        price: totalPrice,
        cargoType: cargoTypes[Math.floor(Math.random() * cargoTypes.length)]
      },
      pricing: {
        baseRate: baseRate,
        fuelSurcharge: fuelSurcharge,
        additionalFees: additionalFees
      },
      equipment: `${vehicles[Math.floor(Math.random() * vehicles.length)]}, ${Math.floor(Math.random() * 10) + 48}ft`,
      specialInstructions: [
        'Handle with care. Appointment required for delivery.',
        'Time-sensitive delivery. No delays accepted.',
        'Refrigerated transport required. Maintain temperature.',
        'Hazmat certified driver required.',
        'Inside delivery service needed.'
      ][Math.floor(Math.random() * 5)],
      postedDate: `${Math.floor(Math.random() * 24)} hours ago`,
      shipper: {
        name: shippers[Math.floor(Math.random() * shippers.length)],
        rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
        phone: `(800) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        email: `dispatch@${shippers[Math.floor(Math.random() * shippers.length)].toLowerCase().replace(/[^a-z]/g, '')}.com`
      }
    }
  })
])

// Computed properties
const totalItems = computed(() => allLoads.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

const startItem = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return end > totalItems.value ? totalItems.value : end
})

const paginatedLoads = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return allLoads.value.slice(start, end)
})

// Pagination display logic
const visiblePages = computed(() => {
  const pages = []
  const current = currentPage.value
  const total = totalPages.value
  
  if (total <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show pages around current page
    if (current <= 4) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i)
      }
    } else if (current >= total - 3) {
      for (let i = total - 4; i <= total - 1; i++) {
        pages.push(i)
      }
    } else {
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
    }
  }
  
  return pages
})

const showFirstPage = computed(() => totalPages.value > 1 && !visiblePages.value.includes(1))
const showLastPage = computed(() => totalPages.value > 1 && !visiblePages.value.includes(totalPages.value))
const showLeftEllipsis = computed(() => visiblePages.value.length > 0 && visiblePages.value[0] > 2)
const showRightEllipsis = computed(() => visiblePages.value.length > 0 && visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1)

// Methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll to top of cards
    document.querySelector('.grid')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleItemsPerPageChange = () => {
  currentPage.value = 1 
}

// Watch for changes that might affect pagination
watch([itemsPerPage], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
})

// Modal functionality
const modalOpen = ref(false)
const selectedLoad = ref(null)

const openModal = (load) => {
  selectedLoad.value = load
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  selectedLoad.value = null
}

const handleAcceptLoad = (load) => {
  console.log('Accepting load:', load)
  // Here you would typically make an API call to accept the load
  alert(`Load ${load.loadId} has been accepted!`)
  closeModal()
}
</script>
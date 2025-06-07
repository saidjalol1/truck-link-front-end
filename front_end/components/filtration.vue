<template>
  <div class="filter-container">
    <!-- Mobile filter toggle button -->
    <button 
      class="filter-toggle mobile-only"
      @click="toggleFilters"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
      </svg>
      Saralash
      <span class="filter-count" v-if="activeFiltersCount > 0">{{ activeFiltersCount }}</span>
    </button>

    <!-- Filter panel -->
    <div class="filter-panel" :class="{ 'expanded': showFilters }">
      <div class="filter-header desktop-only">
        <h3>Filter Results</h3>
        <button class="clear-filters" v-if="activeFiltersCount > 0">
          Clear All
        </button>
      </div>

      <!-- Mobile header -->
      <div class="filter-header mobile-only">
        <h3>Filters</h3>
        <div class="mobile-header-actions">
          <button class="clear-filters" v-if="activeFiltersCount > 0">Clear All</button>
          <button class="close-filters" @click="toggleFilters">✕</button>
        </div>
      </div>

      <div class="filter-grid">
        <!-- Date Range Filter -->
        <div class="filter-group">
          <label>Qo'shilgan sana Bo'yicha</label>
          <div class="date-inputs">
            <input type="date" placeholder="From">
            <input type="date" placeholder="To">
          </div>
        </div>

        <!-- Location Filters -->
        <div class="filter-group">
          <label>Qayerdan</label>
          <select>
            <option>All Cities</option>
            <option>Chicago, IL</option>
            <option>New York, NY</option>
            <option>Los Angeles, CA</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Qayerga</label>
          <select>
            <option>All Cities</option>
            <option>Indianapolis, IN</option>
            <option>Boston, MA</option>
            <option>Miami, FL</option>
          </select>
        </div>

        <!-- Weight Range Filter -->
        <div class="filter-group">
          <label>Og'irlik (lbs)</label>
          <div class="weight-inputs">
            <input type="number" placeholder="Min">
            <input type="number" placeholder="Max">
          </div>
        </div>

        <!-- Vehicle Type Filter -->
        <div class="filter-group">
          <label>Mashina turi</label>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox">
              <span class="checkmark"></span>
              Van
            </label>
            <label class="checkbox-label">
              <input type="checkbox">
              <span class="checkmark"></span>
              Truck
            </label>
            <label class="checkbox-label">
              <input type="checkbox">
              <span class="checkmark"></span>
              Semi
            </label>
          </div>
        </div>
      </div>

      <!-- Apply button for mobile -->
      <div class="filter-actions mobile-only">
        <button class="apply-filters">Apply Filters</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showFilters = ref(false)
const activeFiltersCount = ref(2) // Mock active filter count

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}
</script>

<style scoped>
.filter-container {
  width: 100%;
  margin-bottom: 24px;
}

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  position: relative;
}

.filter-toggle:hover {
  background: #f8f9fa;
}

.filter-count {
  background: #2196F3;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.filter-panel {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  margin-top: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.filter-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.mobile-header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.clear-filters, .close-filters, .apply-filters {
  background: none;
  border: 1px solid #e0e0e0;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  color: #666;
}

.clear-filters:hover, .close-filters:hover {
  background: #f8f9fa;
}

.apply-filters {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
  width: 100%;
  padding: 14px;
  font-weight: 500;
}

.apply-filters:hover {
  background: #1976D2;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.filter-group input, .filter-group select {
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  background: white;
}

.filter-group input:focus, .filter-group select:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.date-inputs, .weight-inputs, .price-inputs {
  display: flex;
  gap: 8px;
}

.date-inputs input, .weight-inputs input, .price-inputs input {
  flex: 1;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 0;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin: 0;
}

.filter-actions {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

/* Mobile styles */
@media (max-width: 768px) {
  .mobile-only {
    display: block;
  }

  .desktop-only {
    display: none;
  }

  .filter-panel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    border-radius: 0;
    margin: 0;
    max-height: 100vh;
    overflow-y: auto;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .filter-panel.expanded {
    transform: translateY(0);
  }

  .filter-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .date-inputs, .weight-inputs, .price-inputs {
    flex-direction: column;
    gap: 12px;
  }
}

/* Desktop styles */
@media (min-width: 769px) {
  .mobile-only {
    display: none;
  }

  .desktop-only {
    display: flex;
  }

  .filter-panel {
    display: block !important;
  }

  .filter-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .filter-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
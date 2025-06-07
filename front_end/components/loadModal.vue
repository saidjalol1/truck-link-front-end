<template>
  <!-- Modal Overlay -->
  <div 
    v-if="isOpen" 
    class="modal-overlay"
    @click="closeModal"
  >
    <!-- Modal Container -->
    <div 
      class="modal-container"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Load Details</h2>
        <button 
          class="close-btn"
          @click="closeModal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="modal-content">
        <!-- Route Information -->
        <section class="section">
          <h3 class="section-title">Route Information</h3>
          <div class="route-container">
            <!-- Origin -->
            <div class="location-card origin-card">
              <div class="location-dot origin"></div>
              <div class="location-details">
                <h4>{{ loadData.origin.city }}, {{ loadData.origin.state }}</h4>
                <p class="location-address">{{ loadData.origin.address }}</p>
                <div class="datetime-info">
                  <span class="date">{{ loadData.origin.date }}</span>
                  <span class="time">{{ loadData.origin.time }}</span>
                </div>
                <div class="contact-info">
                  <p><strong>Contact:</strong> {{ loadData.origin.contact }}</p>
                  <p><strong>Phone:</strong> {{ loadData.origin.phone }}</p>
                </div>
              </div>
            </div>

            <!-- Route Arrow -->
            <div class="route-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" transform="rotate(90 12 12)"/>
              </svg>
            </div>

            <!-- Destination -->
            <div class="location-card destination-card">
              <div class="location-dot destination"></div>
              <div class="location-details">
                <h4>{{ loadData.destination.city }}, {{ loadData.destination.state }}</h4>
                <p class="location-address">{{ loadData.destination.address }}</p>
                <div class="datetime-info">
                  <span class="date">{{ loadData.destination.date }}</span>
                  <span class="time">{{ loadData.destination.time }}</span>
                </div>
                <div class="contact-info">
                  <p><strong>Contact:</strong> {{ loadData.destination.contact }}</p>
                  <p><strong>Phone:</strong> {{ loadData.destination.phone }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Load Details -->
        <section class="section">
          <h3 class="section-title">Load Details</h3>
          <div class="details-grid">
            <div class="detail-card">
              <div class="detail-icon">🚚</div>
              <div class="detail-info">
                <span class="detail-label">Distance</span>
                <span class="detail-value">{{ loadData.details.distance }} miles</span>
              </div>
            </div>
            <div class="detail-card">
              <div class="detail-icon">⚖️</div>
              <div class="detail-info">
                <span class="detail-label">Weight</span>
                <span class="detail-value">{{ loadData.details.weight }} lbs</span>
              </div>
            </div>
            <div class="detail-card">
              <div class="detail-icon">🚐</div>
              <div class="detail-info">
                <span class="detail-label">Vehicle Type</span>
                <span class="detail-value">{{ loadData.details.vehicle }}</span>
              </div>
            </div>
            <div class="detail-card">
              <div class="detail-icon">📦</div>
              <div class="detail-info">
                <span class="detail-label">Cargo Type</span>
                <span class="detail-value">{{ loadData.details.cargoType }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Pricing Information -->
        <section class="section">
          <h3 class="section-title">Pricing</h3>
          <div class="pricing-card">
            <div class="price-main">
              <span class="price-amount">${{ loadData.details.price }}</span>
              <span class="price-per-mile">${{ pricePerMile }}/mi</span>
            </div>
            <div class="price-breakdown">
              <div class="price-item">
                <span>Base Rate:</span>
                <span>${{ loadData.pricing.baseRate }}</span>
              </div>
              <div class="price-item">
                <span>Fuel Surcharge:</span>
                <span>${{ loadData.pricing.fuelSurcharge }}</span>
              </div>
              <div class="price-item">
                <span>Additional Fees:</span>
                <span>${{ loadData.pricing.additionalFees }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Additional Information -->
        <section class="section">
          <h3 class="section-title">Additional Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>Load ID:</strong>
              <span>{{ loadData.loadId }}</span>
            </div>
            <div class="info-item">
              <strong>Posted:</strong>
              <span>{{ loadData.postedDate }}</span>
            </div>
            <div class="info-item">
              <strong>Equipment:</strong>
              <span>{{ loadData.equipment }}</span>
            </div>
            <div class="info-item">
              <strong>Special Instructions:</strong>
              <span>{{ loadData.specialInstructions }}</span>
            </div>
          </div>
        </section>

        <!-- Shipper Information -->
        <section class="section">
          <h3 class="section-title">Shipper Information</h3>
          <div class="shipper-card">
            <div class="shipper-avatar">
              {{ loadData.shipper.name.charAt(0) }}
            </div>
            <div class="shipper-details">
              <h4>{{ loadData.shipper.name }}</h4>
              <p class="shipper-rating">
                <span class="stars">★★★★☆</span>
                <span class="rating-text">({{ loadData.shipper.rating }}/5.0)</span>
              </p>
              <p><strong>Phone:</strong> {{ loadData.shipper.phone }}</p>
              <p><strong>Email:</strong> {{ loadData.shipper.email }}</p>
            </div>
          </div>
        </section>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button class="btn-secondary" @click="closeModal">
          Close
        </button>
        <button class="btn-primary" @click="acceptLoad">
          Accept Load
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  loadData: {
    type: Object,
    default: () => ({
      loadId: 'LD-2024-001234',
      origin: {
        city: 'Chicago',
        state: 'IL',
        address: '1234 Industrial Blvd, Chicago, IL 60608',
        date: 'May 15, 2023',
        time: '8:00 AM',
        contact: 'John Smith',
        phone: '(312) 555-0123'
      },
      destination: {
        city: 'Indianapolis',
        state: 'IN',
        address: '5678 Warehouse Dr, Indianapolis, IN 46220',
        date: 'May 15, 2023',
        time: '2:00 PM',
        contact: 'Sarah Johnson',
        phone: '(317) 555-0456'
      },
      details: {
        distance: 184,
        weight: '18,500',
        vehicle: 'Van',
        price: 850,
        cargoType: 'Electronics'
      },
      pricing: {
        baseRate: 750,
        fuelSurcharge: 75,
        additionalFees: 25
      },
      equipment: 'Dry Van, 53ft',
      specialInstructions: 'Handle with care. Appointment required for delivery.',
      postedDate: '2 hours ago',
      shipper: {
        name: 'ABC Logistics Inc.',
        rating: 4.2,
        phone: '(800) 555-0789',
        email: 'dispatch@abclogistics.com'
      }
    })
  }
})

const emit = defineEmits(['close', 'accept'])

const pricePerMile = computed(() => {
  return (props.loadData.details.price / props.loadData.details.distance).toFixed(2)
})

const closeModal = () => {
  emit('close')
}

const acceptLoad = () => {
  emit('accept', props.loadData)
}

// Prevent body scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Handle escape key
const handleEscape = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

// Add/remove event listener
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleEscape)
  } else {
    document.removeEventListener('keydown', handleEscape)
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.modal-content {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #2196F3;
  display: inline-block;
}

.route-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.location-card {
  flex: 1;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #2196F3;
}

.destination-card {
  border-left-color: #FF9800;
}

.location-card h4 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.location-address {
  color: #666;
  margin: 0 0 12px 0;
  font-size: 14px;
}

.datetime-info {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.date, .time {
  background: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #333;
}

.contact-info p {
  margin: 4px 0;
  font-size: 14px;
  color: #555;
}

.route-arrow {
  color: #2196F3;
  display: flex;
  align-items: center;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.detail-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-icon {
  font-size: 24px;
  background: white;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-info {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.detail-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.pricing-card {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
  border-radius: 16px;
  padding: 24px;
}

.price-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.price-amount {
  font-size: 32px;
  font-weight: 700;
}

.price-per-mile {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
}

.price-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.shipper-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
}

.shipper-avatar {
  width: 60px;
  height: 60px;
  background: #2196F3;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}

.shipper-details h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.shipper-rating {
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  color: #FFD700;
}

.rating-text {
  color: #666;
  font-size: 14px;
}

.modal-footer {
  padding: 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-secondary, .btn-primary {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: white;
  border: 1px solid #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background: #f8f9fa;
}

.btn-primary {
  background: #2196F3;
  border: 1px solid #2196F3;
  color: white;
}

.btn-primary:hover {
  background: #1976D2;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0;
  }
  
  .modal-container {
    border-radius: 0;
    max-height: 100vh;
    height: 100vh;
  }
  
  .route-container {
    flex-direction: column;
    gap: 12px;
  }
  
  .route-arrow {
    transform: rotate(90deg);
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .price-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .shipper-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
<template>
  <div class="load-card" @click="$emit('click', load)">
    <!-- Header with Load ID and Posted Time -->
    <div class="card-header">
      <span class="load-id">{{ load.loadId }}</span>
      <span class="posted-time">{{ load.postedDate }}</span>
    </div>

    <!-- Route Information -->
    <div class="route-section">
      <div class="location origin">
        <div class="location-dot origin-dot"></div>
        <div class="location-info">
          <h4 class="city">{{ load.origin.city }}, {{ load.origin.state }}</h4>
          <p class="datetime">{{ load.origin.date }} • {{ load.origin.time }}</p>
        </div>
      </div>

      <div class="route-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" transform="rotate(90 12 12)"/>
        </svg>
      </div>

      <div class="location destination">
        <div class="location-dot destination-dot"></div>
        <div class="location-info">
          <h4 class="city">{{ load.destination.city }}, {{ load.destination.state }}</h4>
          <p class="datetime">{{ load.destination.date }} • {{ load.destination.time }}</p>
        </div>
      </div>
    </div>

    <!-- Load Details -->
    <div class="details-section">
      <div class="detail-item">
        <span class="detail-icon">🚚</span>
        <span class="detail-text">{{ load.details.distance }} mi</span>
      </div>
      <div class="detail-item">
        <span class="detail-icon">⚖️</span>
        <span class="detail-text">{{ load.details.weight }} lbs</span>
      </div>
      <div class="detail-item">
        <span class="detail-icon">🚐</span>
        <span class="detail-text">{{ load.details.vehicle }}</span>
      </div>
    </div>

    <!-- Cargo Type -->
    <div class="cargo-type">
      <span class="cargo-label">{{ load.details.cargoType }}</span>
    </div>

    <!-- Price and Action -->
    <div class="card-footer">
      <div class="price-section">
        <span class="price">${{ load.details.price.toLocaleString() }}</span>
        <span class="price-per-mile">${{ (load.details.price / load.details.distance).toFixed(2) }}/mi</span>
      </div>
      <button class="view-details-btn">
        <span>View Details</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>
    </div>

    <!-- Shipper Info -->
    <div class="shipper-info">
      <div class="shipper-avatar">
        {{ load.shipper.name.charAt(0) }}
      </div>
      <div class="shipper-details">
        <span class="shipper-name">{{ load.shipper.name }}</span>
        <div class="shipper-rating">
          <span class="stars">★★★★☆</span>
          <span class="rating-text">({{ load.shipper.rating }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  load: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>

<style scoped>
.load-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 380px;
  min-width: 320px;
}

.load-card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  border-color: #2196F3;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.load-id {
  font-weight: 600;
  color: #2196F3;
  font-size: 14px;
  background: #E3F2FD;
  padding: 4px 8px;
  border-radius: 6px;
}

.posted-time {
  font-size: 12px;
  color: #666;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 6px;
}

.route-section {
  margin-bottom: 16px;
}

.location {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.location:last-child {
  margin-bottom: 0;
}

.location-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.origin-dot {
  background: #2196F3;
}

.destination-dot {
  background: #FF9800;
}

.location-info {
  flex: 1;
}

.city {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.datetime {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.route-arrow {
  text-align: center;
  color: #2196F3;
  margin: 8px 0;
}

.details-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.detail-icon {
  font-size: 16px;
}

.detail-text {
  font-size: 12px;
  font-weight: 500;
  color: #333;
}

.cargo-type {
  margin-bottom: 16px;
}

.cargo-label {
  display: inline-block;
  background: #E8F5E8;
  color: #2E7D32;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price {
  font-size: 24px;
  font-weight: 700;
  color: #2196F3;
}

.price-per-mile {
  font-size: 12px;
  color: #666;
}

.view-details-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #2196F3;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.view-details-btn:hover {
  background: #1976D2;
  transform: translateX(2px);
}

.shipper-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.shipper-avatar {
  width: 36px;
  height: 36px;
  background: #2196F3;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.shipper-details {
  flex: 1;
}

.shipper-name {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.shipper-rating {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stars {
  color: #FFD700;
  font-size: 12px;
}

.rating-text {
  font-size: 12px;
  color: #666;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .load-card {
    width: 100%;
    min-width: 280px;
    padding: 16px;
  }
  
  .details-section {
    flex-direction: column;
    gap: 8px;
  }
  
  .detail-item {
    flex-direction: row;
    justify-content: space-between;
  }
  
  .card-footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .view-details-btn {
    justify-content: center;
  }
}
</style>
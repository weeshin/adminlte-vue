<template>
    <div id="map">

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps({
  routes: {
    type: Array as () => [number, number][],
    required: true,
    default: () => []
  }
});

const map = ref<L.Map>();
const vehicleMarker = ref<L.Marker | null>(null);
const pathLine = ref<L.Polyline | null>(null);

const vehicleIcon = L.icon({
  iconUrl: 'src/assets/car-top-view.png', // Replace with your vehicle icon path
  iconSize: [48, 48], // Adjust based on your icon size
  iconAnchor: [19, 19] // Adjust based on your icon size
});

const initializeMap = () => {
  if (map.value) {
    map.value.remove(); // Remove the existing map instance
  }
  
  map.value = L.map('map').setView([3.1390, 101.6869], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value);

  // Initialize vehicle marker
  vehicleMarker.value = L.marker([3.1390, 101.6869], { icon: vehicleIcon }).addTo(map.value);

  // Initialize path line
  pathLine.value = L.polyline([], { color: 'blue' }).addTo(map.value);
};

const updateVehiclePosition = (lat: number, lng: number) => {
  if (vehicleMarker.value && pathLine.value) {
    vehicleMarker.value.setLatLng([lat, lng]);
    pathLine.value.addLatLng([lat, lng]);
    map.value?.panTo([lat, lng]);
  }
};

// Watch for changes in routes and update vehicle position
watch(props.routes, (newRoutes) => {
  if (newRoutes && newRoutes.length > 0) {
    const [lat, lng] = newRoutes[newRoutes.length - 1];
    updateVehiclePosition(lat, lng);
  }
}, { immediate: true });

onMounted(() => {
  initializeMap();
});


</script>

<style scoped>
#map { height: 500px; }
</style>
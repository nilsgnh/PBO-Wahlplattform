<template>
  <div v-if="authStore.isAuthenticated" class="centered-header">
    <h1 class="text-3xl font-bold p-2">Sie sind erfolgreich verifiziert, {{ authStore.user.name }}</h1>
  </div>
  <div v-else class="background">
    <h1 class="text-3xl font-bold p-2">Mit BundID anmelden oder registrieren</h1>
    <p class="text-xl">
      Melden Sie sich mit Ihrem elektronischen Personalausweis über BundID an, um weiter Digitale Wahlplattform zu
      nutzen.
    </p>
    <div class="login-box">
      <button @click="authStore.login" class="login-button">Weiter mit BundId →</button>
    </div>
    <div v-if="authStore.showModal" class="modal-overlay">
      <div class="modal">
        <p>Sie werden zu BundId.de weitergeleitet, um den Authentifizierungsprozess fortzusetzen.</p>
        <div class="button-container">
          <div class="secondaryBtn" @click="authStore.cancelLogin">Abbrechen</div>
          <div class="primaryBtn" @click="authStore.confirmLogin">Weiter</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.background {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding-top: 20px;
  padding-bottom: 50px;
}
.centered-header {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
}

.login-box {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 5%;
  width: 100%; /* Default to full width */
  max-width: 1050px; /* Set a maximum width */
  height: auto; /* Allow the height to adjust automatically */
  aspect-ratio: 2; /* Set an aspect ratio if known, or adjust as needed */
  justify-self: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-image: url('../assets/bundIdlogo2.png');
  background-size: cover; /* Ensure the image covers the entire box */
  background-position: center;
  background-repeat: no-repeat;
}

.login-button {
  position: absolute; /* Position the button absolutely within the login-box */
  top: 80%; /* Center vertically */
  left: 8%;
  font-size: large;
  background-color: white;
  color: rgb(0 116 179);
  padding: 10px 80px;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: transparent; /* Change background to transparent on hover */
  color: white;
  border: 2px solid #ccc;;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent grey */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensure it's above other content */
}

.modal {
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensure it's above the overlay */
}

.button-container {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
}

</style>
<script setup>
import { useAuthStore } from '../stores/useAuth.js'; // Importiere den Auth-Store

// Hole den Auth-Store aus Pinia
const authStore = useAuthStore();
</script>

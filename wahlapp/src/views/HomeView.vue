<template>
  <div id="home">
    <!-- Willkommensnachricht -->
    <main>
      <div class="welcome-container">
        <h1 class="text-3xl font-bold p-2">{{ $t('welcome') }}</h1>

        <!-- Nachricht basierend auf dem Verifizierungsstatus -->
        <h2 class="text-3xl">
          Max Mustermann
        </h2>
        <div class="primaryBtn" @click="navigateToVerification">
          <p class="text-xl">{{ $t('verify') }}</p>
        </div>

        <!-- Navigation Buttons -->
        <div class="primaryBtn" @click="navigateToElection">
          <p class="text-xl">{{ $t('currentElection') }}</p>
        </div>
        <div class="primaryBtn" @click="navigateToErgebnis">
          <p class="text-xl">{{ $t('electionInfo') }}</p>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Importiere den Vue Router
import { useAuthStore } from '@/stores/useAuth.js'; // Importiere den Auth-Store

// Router Setup
const router = useRouter();

// Pinia Stores
const authStore = useAuthStore(); // Zugriff auf den Auth-Store

// Reaktive Referenz
const usernameRef = ref(null); // Referenz für den Benutzernamen

// Aktion beim Mounten der Komponente
onMounted(() => {
  if (authStore.isAuthenticated) {
    console.log('Benutzername:', usernameRef.value?.textContent);
  }
});

// Navigations-Methoden
const navigateToElection = () => {
  router.push({ name: 'bundestagswahl-2025' });
};

const navigateToErgebnis = () => {
  router.push({ name: 'ergebnisse' });
};

const navigateToVerification = () => {
  router.push({ name: 'verifizierung' });
};

// Rückgabe von Werten und Funktionen an die Vorlage
const isAuthenticated = authStore.isAuthenticated;
const user = authStore.user;

</script>

<style scoped>
#home {
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 655px;
  margin:0 auto;
}

.welcome-container {
  color: black;
  z-index: 1;
}
.welcome-container h1,.welcome-container h2,.welcome-container p{
  padding:15px;
}

</style>

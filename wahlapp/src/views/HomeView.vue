<template>
  <div id="home">
    <!-- Willkommensnachricht -->
    <main>
      <div class="welcome-container">
        <h1 class="text-3xl font-bold p-2">{{ $t('welcome') }}</h1>
        <h2 class="text-3xl">{{ $t('username') }}</h2>
        <div class="primaryBtn" @click="navigateToElection">
          <p class="text-xl">{{ $t('currentElection') }}</p>
        </div>
        <div class="primaryBtn" @click="navigateToElection">
          <p class="text-xl">{{ $t('electionInfo') }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';  // Importiere den Vue Router

export default {
  setup() {
    const { t, locale } = useI18n();
    const router = useRouter();  // Router-Instanz verwenden


    const toggleSettings = () => {
      alert("Einstellungen öffnen");
    };

    const navigateToElection = () => {
      // Navigiere zur Wahl-Seite
      router.push({ name: 'bundestagswahl-2025' });  // Navigiert zur Route
    };

    return {
      t,
      locale,
      toggleSettings,
      navigateToElection  // Methode zur Navigation hinzufügen
    };
  }
};
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

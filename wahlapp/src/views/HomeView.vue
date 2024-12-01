<template>
  <div id="home">
    <!-- Header mit Zahnradsymbol und Sprachumschaltung -->
    <header>
      <div class="header-content">
        <!-- Google Material Icons Zahnrad -->
        <button class="settings-btn" @click="toggleSettings">
          <span class="material-icons">settings</span> <!-- Google Material Settings Icon -->
        </button>

        <!-- Sprachumschaltung -->
        <div class="language-switch">
          <button @click="switchLanguage('de')" :class="{'active': locale === 'de'}">
            <img class="flag" src="@/assets/germany-flag.png" alt="German Flag" />
          </button>
          <button @click="switchLanguage('en')" :class="{'active': locale === 'en'}">
            <img class="flag" src="@/assets/uk-flag.png" alt="English Flag" />
          </button>
        </div>
      </div>
    </header>

    <!-- Willkommensnachricht -->
    <main>
      <div class="welcome-container">
        <h1>{{ $t('welcome') }}</h1>
        <h2>{{ $t('username') }}</h2>
        <div class="info-card" @click="navigateToElection">
          <p>{{ $t('electionInfo') }}</p>
        </div>
      </div>
    </main>

    <!-- Footer (optional) -->
    <footer>
      <nav>
        <ul>
          <li><a href="#">{{ $t('impressum') }}</a></li>
          <li><a href="#">{{ $t('datenschutz') }}</a></li>
          <li><a href="#">{{ $t('contact') }}</a></li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';  // Importiere den Vue Router

export default {
  setup() {
    const { t, locale } = useI18n();
    const router = useRouter();  // Router-Instanz verwenden

    const switchLanguage = (language) => {
      locale.value = language;  // Wechselt die Sprache
    };

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
      switchLanguage,
      toggleSettings,
      navigateToElection  // Methode zur Navigation hinzufügen
    };
  }
};
</script>

<style scoped>
#home {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top:20px;
}

header {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 100;
}

.settings-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position:absolute;
  top:60px;
  left:20px;
  transform:translateY(-50%);
}

.material-icons {
  font-size: 30px; /* Größe des Icons */
}

.language-switch {
  position:absolute;
  top:60px;
  right:20px;
  display: flex;
  justify-content: space-between;
  transform:translateY(-50%);
}

.language-switch button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.language-switch .flag {
  width: 40px;
  height: 40px;
  border-radius:50%;
}

.language-switch .active .flag {
  transform: scale(1.2); /* Vergrößert die aktive Flagge */
}

.welcome-container {
  color: black;
  z-index: 1;
}

.welcome-container h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

.welcome-container h2 {
  font-size: 2rem;
  margin-top: 10px;
}

.info-card {
  background-color: rgba(80, 80, 80, 0.3); /* Semi-transparent */
  color: black;
  padding: 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  transition: ease-in-out .3s;
}

.info-card:hover {
  background-color: rgba(80, 80, 80, 0.6);
}

footer {
  margin-top: 20px;
}

footer nav ul {
  list-style-type: none;
  padding: 0;
}

footer nav ul li {
  display: inline;
  margin-right: 10px;
}

footer nav ul li a {
  text-decoration: none;
  color: #0073e6;
}

footer nav ul li a:hover {
  text-decoration: underline;
}

@media (min-width:1024px) {
    #home{
      width:960px;
      margin:0 auto;
    }
}
</style>

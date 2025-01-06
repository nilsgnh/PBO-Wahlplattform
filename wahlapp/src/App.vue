<script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { useAuthStore } from '@/stores/useAuth.js'; // Importiere den Auth-Store

  // Zustand für das Menü
  const isMenuOpen = ref(false);

  // Menü ein- oder ausklappen
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };

  // Funktion zum Schließen des Menüs, wenn außerhalb geklickt wird
  const closeMenu = (event) => {
    const menu = document.querySelector('.side-menu');
    const settingsButton = document.querySelector('.settings-btn');

    // Verhindern, dass ein Klick auf das Menü oder den Button das Menü schließt
    if (
      isMenuOpen.value &&
      menu &&
      !menu.contains(event.target) &&
      !settingsButton.contains(event.target)
    ) {
      isMenuOpen.value = false;
    }
  };

  // Event-Listener beim Mounten und Entfernen beim Unmounten
  onMounted(() => {
    document.addEventListener('click', closeMenu);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', closeMenu);
  });

  // Schließt Menü bei Klick auf einen Link
  const closeNav = () => {
    const hamburgCheckbox = document.getElementById("hamburg");
    if (hamburgCheckbox) {
      hamburgCheckbox.checked = false;
    }
  };

  // Sprachwechsel
  const { t, locale } = useI18n();

  const switchLanguage = (language) => {
    locale.value = language; // Sprache wechseln
  };

  // Zugriff auf den Auth-Store
  const authStore = useAuthStore();

  // Reaktive Eigenschaft für Verifizierungsstatus
  const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>



<template>
  <div>
    <!-- Header mit Sprachumschaltung -->
    <header>
      <button class="settings-btn" @click="toggleMenu">
        <span class="material-icons">settings</span>
      </button>
      <div class="header-content">
        <!-- Sprachumschaltung -->
        <div class="language-switch">
          <button @click="switchLanguage('de')" :class="{ active: locale === 'de' }">
            <img class="flag" src="@/assets/germany-flag.png" alt="German Flag" />
          </button>
          <button @click="switchLanguage('en')" :class="{ active: locale === 'en' }">
            <img class="flag" src="@/assets/uk-flag.png" alt="English Flag" />
          </button>
        </div>
      </div>
    </header>

    <!-- Seitliches Menü -->
    <aside class="side-menu" :class="{ open: isMenuOpen }">
      <div class="menu-header">
        <button class="close-btn" @click="toggleMenu">
          <span class="material-icons">close</span>
        </button>
      </div>
      <nav>
        <ul>
          <li class="primaryBtn">
            <RouterLink to="/impressum" @click="toggleMenu">{{ $t('impressum') }}</RouterLink>
          </li>
          <li class="primaryBtn">
            <RouterLink to="/datenschutz" @click="toggleMenu">{{ $t('datenschutz') }}</RouterLink>
          </li>
          <li class="primaryBtn">
            <RouterLink to="/contact" @click="toggleMenu">{{ $t('contact') }}</RouterLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Hauptnavigation -->
    <nav class="main-nav">
      <input type="checkbox" id="hamburg">
      <label for="hamburg" class="hamburg">
        <span class="line"></span>
        <span class="line"></span>
        <span class="menuBtn">Menü</span>
      </label>
      <div id="bg-move"></div>
      <div id="move">
        <ul>
          <li><RouterLink to="/" @click="closeNav">{{$t('dashboard')}}</RouterLink></li>

          <!-- Zeige "Aktuelle Wahl" nur, wenn der Benutzer verifiziert ist -->
          <li v-if="isAuthenticated">
            <RouterLink to="/bundestagswahl-2025" @click="closeNav">{{$t('curr_election')}}</RouterLink>
          </li>

          <li><RouterLink to="/ergebnisse" @click="closeNav">{{$t('results')}}</RouterLink></li>
          <li><RouterLink to="/verifizierung" @click="closeNav">{{$t('verification')}}</RouterLink></li>
        </ul>

      </div>
    </nav>

    <!-- Hauptinhalt -->
    <div class="content">
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>


<style scoped>

.language-switch {
  position:fixed;
  top:18px;
  right:18px;
  z-index: 1000;
}

.language-switch button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
}

.language-switch .flag {
  width: 25px;
  height: 25px;
  border-radius:50%;
  transition: ease-in-out .2s
}

.language-switch .active .flag {
  transform: scale(1.5); /* Vergrößert die aktive Flagge */
}

/* Zahnrad-Button */
.settings-btn {
  position: fixed;
  top:19px;
  left:19px;
  z-index: 1000;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: ease-in-out .3s;
  transform-origin: center;
  line-height:0;
}
.settings-btn:hover{
  transform: rotate(95deg);
}

.material-icons {
  font-size: 30px;
}

/* Seitliches Menü */
.side-menu {
  position: fixed;
  top: 0;
  left: -100%; /* Startposition außerhalb des Bildschirms */
  height: 100%;
  width: 90%; /* Mobile Ansicht */
  background-color: #f9f9f9;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transition: .3s ease-in-out;
  z-index: 1100;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.side-menu.open {
  left: 0;
}
.close-btn{
  border: none;
  font-size: 24px;
  line-height: 0;
  position: relative;
  left:calc(100% - 20px);
  transition:ease-in-out .3s;
  transform-origin: center;
}
.close-btn:hover{
  transform: rotate(180deg);
}

/* Menü-Header */
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.menu-header p {
  margin: 0;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

/* Menü-Navigation */
.side-menu nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-menu nav ul li {
  margin: 15px 0;
}

.side-menu nav ul li a {
  text-decoration: none;
  color: black;
  font-size: 18px;
}

/* Content */
.content {
  margin-top: 50px;
}




/* Menu */
.main-nav {
    width: 100%;
    height: 1px;
    position: fixed;
    bottom:0;
    z-index: 999;
}
input#hamburg {
    display: none;
}
label.hamburg {
    display: block;
    background:linear-gradient(135deg,#a6380f,#d24615);
    box-shadow: 0 0 20px -5px black;
    border-radius: 10px;
    width: 100px;
    height: 55px;
    position: fixed;
    left: 50%;
    bottom: 50px;
    transform: translate(-50%, 0);
    cursor: pointer;
    z-index: 600;
    transition: ease-in-out 0.5s;
    text-align: center;
}
#hamburg:checked+label.hamburg{
    width:150px;
}
.menuBtn{
    position:relative;
    top:10px;
    left:0;
    color:white;
    font-size: 1.4rem;
    font-weight:300;
    transition: ease-in-out 0.5s;
    letter-spacing: 2px;
}
#hamburg:checked+label.hamburg>.menuBtn{
    left:20px;
}

.line {
    position: absolute;
    left: 17px;
    height: 2px;
    width: 0px;
    background:white;
    border-radius: 2px;
    display: block;
    -webkit-transition:ease-in-out .5s;
    -o-transition:ease-in-out .5s;
    transition:ease-in-out .5s;
    -webkit-transform-origin: center;
    -ms-transform-origin: center;
    transform-origin: center;
}
.line:nth-child(1) {
    top: 22px;
}
.line:nth-child(2) {
    top: 32px;
}

#hamburg:checked+.hamburg .line:nth-child(1) {
    -webkit-transform: translateY(5px) rotate(-45deg);
    -ms-transform: translateY(5px) rotate(-45deg);
    transform: translateY(5px) rotate(-45deg);
    width:30px;
}

#hamburg:checked+.hamburg .line:nth-child(2) {
    -webkit-transform: translateY(-5px) rotate(45deg);
    -ms-transform: translateY(-5px) rotate(45deg);
    transform: translateY(-5px) rotate(45deg);
    width:30px;
}
#bg-move{
    position: absolute;
    width: 100%;
    height: 100vh;
    bottom:0;
    left:-105%;
    background-color:rgb(238, 238, 238);
    transition: ease-in-out 0.3s;
}
#move {
    position: absolute;
    width: 100%;
    height: auto;
    bottom: 0;
    left: -105%;
    text-align: center;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
    margin: 0;
    padding: 0 0 130px 0;
    z-index: 500;
}
.main-nav ul li{
    list-style: none;
}
.main-nav li {
    width: 100%
  }
.main-nav ul li a {
    display: block;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 1.2rem;
    padding: 20px;
    border-bottom: 1px #000000 dotted;
    color: #000000;
    text-decoration: none;
}
.main-nav ul li:first-of-type > a{
    border-top: 1px #000 dotted;
}
.main-nav a.active, .main-nav a:hover {
    background-color: #f0fff4;
    color: #000;
    -webkit-transition: .5s;
    -o-transition: .5s;
    transition: .5s;
}
#hamburg:checked~#move {
    left: 0;
}
#hamburg:checked~#bg-move {
    left: 0;
}
.mobil-menu {
    display: none;
}

/* Responsives Design */
@media (min-width: 540px) {
  .side-menu {
    width: 350px;
  }
}
@media (min-width: 840px){
  label.hamburg {
    display: none;
  }
  #bg-move{
    height: 0;
  }
  #move {
    position: fixed;
    top:0;
    left:0;
    background-color:rgb(238, 238, 238);
    height:70px;
    width: 100%;
    text-align: center;
    margin: 0;
    padding:0;
    box-shadow:0 0 5px darkgrey
  }
  .main-nav ul {
    background-color: none;
    float: none;
    margin: 0;
  }
  .main-nav ul>li {
    display: inline-block;
    padding: 23px 0px;
    width: auto;
    background:none;
    margin:0 0 0 0;
    border-right:solid 1px black;
  }
  .main-nav ul li:first-of-type > a{
    border-top: none;
    border-left:solid 1px black;
  }
  .main-nav ul li:last-child{
    border-right:solid 1px black;
  }
  .main-nav ul li a {
    display: inline;
    border-bottom: 0;
    font-size: 0.95rem;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 2px;
    font-weight: 400;
    padding: 26px 10px;
  }
  .main-nav ul>li:hover a{
    color: black ;
  }
}
</style>


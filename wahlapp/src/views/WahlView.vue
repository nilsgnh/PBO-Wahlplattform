<template>
  <div id="wahl">
    <!-- Hauptüberschrift für die Bundestagswahl -->
    <h1 class="text-3xl font-bold p-2">Bundestagswahl 2025</h1>
    <!-- Anzeige für nicht verifizierte Nutzer -->
    <div class="start-end-container">
      <!-- Hinweis zur Verifizierung -->
      <div class="text-xl">Sie müssen sich erst verifizieren, um wählen zu können. <br> Bitte loggen Sie sich ein.</div>
      <!-- Navigation zur Anmeldeseite -->
      <NavigationButton type="next">
        <template v-slot:buttonText>
          Zur Anmeldung
        </template>
      </NavigationButton>
    </div>
    <!-- Anzeige, wenn der Nutzer bereits gewählt hat -->
    <div class="start-end-container">
      <div class="text-xl">Sie haben bereits gewählt. <br> Vielen Dank für Ihre Teilnahme an der Wahl.</div>
      <br>
      <NavigationButton type="dashboard">
        <template v-slot:buttonText>
          Zurück zum Dashboard
        </template>
      </NavigationButton>
    </div>
    <!-- Anzeige für Nutzer, die bereit sind zu starten -->
    <div class="start-end-container">
      <p class="text-xl">Beginnen Sie mit dem Durchführen der Wahl durch Drücken auf Start:</p>
      <NavigationButton type="next">
        <template v-slot:buttonText>
          Start
        </template>
      </NavigationButton>
    </div>
    <!-- Schritt: Abgabe der Erststimme -->
    <div class="stimmdiv">
      <ErststimmeComponent />
      <div class="button-container">
        <div class="left-buttons">
          <NavigationButton type="back">
            <template v-slot:buttonText>
              Abbrechen
            </template>
          </NavigationButton>
        </div>
        <div class="right-buttons">
          <NavigationButton type="next">
            <template v-slot:buttonText>
              Weiter
            </template>
          </NavigationButton>
        </div>
      </div>
    </div>
    <!-- Schritt: Abgabe der Zweitstimme -->
    <div class="stimmdiv">
      <ZweitstimmeComponent />
      <div class="button-container">
        <div class="left-buttons">
          <NavigationButton type="back">
            <template v-slot:buttonText>
              Zurück
            </template>
          </NavigationButton>
        </div>
        <div class="right-buttons">
          <NavigationButton type="next">
            <template v-slot:buttonText>
              Weiter
            </template>
          </NavigationButton>
        </div>
      </div>
    </div>
    <!-- Schritt: Bestätigung der Wahl -->
    <div class="stimmdiv">
      <BestaetigungComponent />
      <div class="button-container">
        <div class="left-buttons">
          <NavigationButton type="back">
            <template v-slot:buttonText>
              Abbrechen
            </template>
          </NavigationButton>
          <NavigationButton type="back">
            <template v-slot:buttonText>
              Zurück
            </template>
          </NavigationButton>
        </div>
        <div class="right-buttons">
          <NavigationButton type="submit">
            <template v-slot:buttonText>
              Bestätigen
            </template>
          </NavigationButton>
        </div>
      </div>
    </div>
  </div>
  <!-- Abschlussanzeige nach der Wahl -->
  <div class="start-end-container">
    <p class="text-xl">Vielen Dank für Ihre Teilnahme an der Wahl.</p>
    <NavigationButton type="dashboard">
      <template v-slot:buttonText>
        Zurück zum Dashboard
      </template>
    </NavigationButton>
  </div>

  <!-- Fortschrittsanzeige für die Wahl -->
  <section id="wahlfortschritt">
    <div class="progress-wrapper">
      <div class="progress-bar">
        <div class="progress-fill" style="width: 50%;"></div>
      </div>
      <span class="progress-text">Schritt 2 von 4</span>
    </div>
  </section>

  <br>
</template>

<script setup>
// Importieren der benötigten Komponenten
import ErststimmeComponent from "@/components/ErststimmeComponent.vue";
import ZweitstimmeComponent from "@/components/ZweitstimmeComponent.vue";
import BestaetigungComponent from "@/components/BestaetigungComponent.vue";
import NavigationButton from "@/components/NavigationButton.vue";
</script>

<style scoped>
/* Styling bleibt gleich wie im Original */
/* Zentrale Überschrift */
h1 {
  text-align: center;
  padding-bottom: 10px;
}
#wahl {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}
.start-end-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding-top: 20px;
  padding-bottom: 50px;
  max-height: 300px;
}
p {
  font-size: 20px;
  margin-bottom: 20px;
}
.progress-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin-left: 10px;
  margin-right: 10px;
}
.progress-bar {
  width: 100%;
  height: 30px;
  background-color: #fafbfd;
  border: 1px solid #333;
  overflow: hidden;
  position: relative;
}
.progress-fill {
  height: 100%;
  background-color: #d1fae5;
  width: 0;
  transition: width 0.5s ease;
}
.progress-text {
  position: absolute;
  bottom: -25px;
  left: 0;
  font-size: 14px;
  color: #333;
}
.stimmdiv {
  padding-top: 10px;
  padding-bottom: 10px;
  max-width: 1000px;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  gap: 5px;
}
.left-buttons {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  gap: 5px;
}
.right-buttons {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
@media (max-width: 540px) {
  .button-container {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .left-buttons,
  .right-buttons {
    justify-content: center;
    width: 100%;
  }
}
</style>

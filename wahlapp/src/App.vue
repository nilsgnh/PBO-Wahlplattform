<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div>
    <nav class="flex flex-col">
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/bundestagswahl-2025">Aktuelle Wahl</RouterLink>
        <RouterLink to="/Ergebnisse">Ergebnisse</RouterLink>
        <RouterLink to="/Verifizierung">Verifizierung</RouterLink>
    </nav>
    <div class="content">
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

aside {
  flex: 0 0 200px;
  padding: 1rem;
  border-right: 1px solid grey;
  background-color: #f9f9f9;
}

nav {
  flex: 1;
  order: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  border-bottom: 1px solid grey;
}

.content{
  min-height: 20em;
  order: 2;
  flex: 3 3 80%;
}

nav a {
  text-decoration: none;
  color: black;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a.router-link-exact-active {
  color: darkgreen;
}

nav a:hover {
  background-color: #e0e0e0;
}

main {
  flex: 1;
  padding: 0;
}

aside {
  flex: 0;
  width: 100%;
  border-right: none;
  border-bottom: 1px solid grey;
}

nav {
  flex-direction: row;
  justify-content: center;
}

nav a {
  padding: 0.5rem 1rem;
}
</style>

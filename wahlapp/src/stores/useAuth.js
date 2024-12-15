import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    isAuthenticated: false,
    showModal: false,
  }),
  actions: {
    async login() {
      this.showModal = true;
    },
    async confirmLogin() {
      // Öffne die BundID-Seite in einem neuen Fenster
      window.open('https://id.bund.de/de/welcome');

      // Setze isAuthenticated auf true, nachdem der Benutzer die Seite besucht hat
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');

      this.user = { name: 'Mock User' };
      this.showModal = false;
    },
    cancelLogin() {
      this.showModal = false;
    }
  },
});

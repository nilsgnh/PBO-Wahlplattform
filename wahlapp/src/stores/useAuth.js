import { defineStore } from 'pinia';

// Define a new store using Pinia for managing verification state
export const useAuthStore = defineStore({
  id: 'auth', // Unique identifier for the store
  state: () => ({
    user: null, // Holds user information, initially null
    isAuthenticated: false, // Tracks if the user is authenticated
    showModal: false, // Controls the visibility of the login modal
  }),
  actions: {
    // Action to initiate the login process
    async login() {
      this.showModal = true; // Show the login modal
    },
    // Action to confirm login and authenticate the user
    async confirmLogin() {
      // Open the BundID page in a new window
      window.open('https://id.bund.de/de/welcome');

      // Set isAuthenticated to true after visiting the page
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true'); // Persist authentication status

      // Set user information
      this.user = { name: 'Max Mustermann' }; // set mocked name
      this.showModal = false; // Hide the login modal
    },
    // Action to cancel the login process
    cancelLogin() {
      this.showModal = false; // Hide the login modal
    }
  },
});

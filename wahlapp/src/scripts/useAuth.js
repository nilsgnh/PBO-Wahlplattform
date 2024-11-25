import { ref, onMounted } from 'vue';

export function useAuth() {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const showModal = ref(false);

  onMounted(() => {
    // Check localStorage for existing authentication
    if (localStorage.getItem('isAuthenticated') === 'true') {
      user.value = { name: 'Mock User' }; // Mock user data
      isAuthenticated.value = true;
    }
  });

  function login() {
    showModal.value = true;
  }

  function confirmLogin() {
    // Simulate redirect to BundId.de
    window.open('https://id.bund.de/de/welcome');
    user.value = { name: 'Mock User' }; // Mock user data
    isAuthenticated.value = true;
    localStorage.setItem('isAuthenticated', 'true');
    showModal.value = false;
  }

  function cancelLogin() {
    showModal.value = false;
  }

  return {
    user,
    isAuthenticated,
    showModal,
    login,
    confirmLogin,
    cancelLogin,
  };
}

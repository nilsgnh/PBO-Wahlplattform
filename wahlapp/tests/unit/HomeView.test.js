/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import { createTestingPinia } from '@pinia/testing'; // Mocking für Pinia
import { useAuthStore } from '@/stores/useAuth'; // Auth-Store für Tests
import i18n from '@/config/i18n'; // Importiere die echte i18n-Instanz
import { createRouter, createWebHistory } from 'vue-router'; // Importiere den Router

// Erstelle einen Mock-Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', // Dummy-Route für die HomeView
      name: 'home',
      component: HomeView,
    },
  ],
});

describe('HomeView.vue', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(HomeView, {
      global: {
        plugins: [createTestingPinia(), i18n, router], // Pinia, I18n und Router einbinden
      },
    });
    await router.isReady(); // Warte, bis der Router bereit ist
  });

  // Test 1: Willkommensnachricht wird immer angezeigt
  it('renders welcome message', () => {
    expect(wrapper.text()).toContain('Willkommen'); // Prüfen, ob die Willkommensnachricht gerendert wird
  });

  // Test 2 wurde entfernt.

  // Test 3: Verifizierungsbutton wird nur angezeigt, wenn der Benutzer nicht authentifiziert ist
  it('shows verify button when not authenticated', async () => {
    const authStore = useAuthStore(); // Zugriff auf den Auth-Store
    authStore.isAuthenticated = false; // Benutzer als nicht authentifiziert markieren

    await wrapper.vm.$nextTick(); // Warten, bis der DOM aktualisiert ist

    const verifyButton = wrapper.find('.primaryBtn');
    expect(verifyButton.exists()).toBe(true); // Verifizierungsbutton sollte angezeigt werden
    expect(verifyButton.text()).toContain('Bitte verifzieren Sie sich'); // Text des Buttons überprüfen
  });
});

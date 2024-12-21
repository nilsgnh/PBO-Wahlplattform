/**
 * @vitest-environment happy-dom
 */

import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '@/stores/useAuth.js';
import VerifizierungView from '@/views/VerifizierungView.vue';

describe('VerifizierungView.vue', () => {
  let authStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    authStore = useAuthStore();
    vi.spyOn(authStore, 'login');
    vi.spyOn(authStore, 'cancelLogin');
    vi.spyOn(authStore, 'confirmLogin');
 });

  it('displays authenticated view when user is authenticated', () => {
    authStore.isAuthenticated = true;
    authStore.user = { name: 'Test User' };
    const wrapper = mount(VerifizierungView);
    expect(wrapper.find('.centered-header').exists()).toBe(true);
    expect(wrapper.text()).toContain('Sie sind erfolgreich verifiziert, Test User');
  });

  it('displays login view when user is not authenticated', () => {
    authStore.isAuthenticated = false;
    const wrapper = mount(VerifizierungView);
    expect(wrapper.find('.background').exists()).toBe(true);
    expect(wrapper.text()).toContain('Mit BundID anmelden oder registrieren');
  });

  it('shows modal when showModal is true', () => {
    authStore.showModal = true;
    const wrapper = mount(VerifizierungView);
    expect(wrapper.find('.modal-overlay').exists()).toBe(true);
  });

  it('calls login method on login button click', async () => {
    authStore.isAuthenticated = false;
    const wrapper = mount(VerifizierungView);
    const loginButton = wrapper.find('.login-button');
    expect(loginButton.exists()).toBe(true);
    await loginButton.trigger('click');
    expect(authStore.login).toHaveBeenCalled();
  });

  it('calls cancelLogin method on cancel button click', async () => {
    authStore.showModal = true;
    const wrapper = mount(VerifizierungView);
    const cancelButton = wrapper.find('.secondaryBtn');
    await cancelButton.trigger('click');
    expect(authStore.cancelLogin).toHaveBeenCalled();
  });

  it('calls confirmLogin method on confirm button click', async () => {
    authStore.showModal = true;
    const wrapper = mount(VerifizierungView);
    const confirmButton = wrapper.find('.primaryBtn');
    await confirmButton.trigger('click');
    expect(authStore.confirmLogin).toHaveBeenCalled();
  });
});

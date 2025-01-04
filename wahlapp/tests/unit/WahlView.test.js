import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WahlView from '@/views/WahlView.vue';
import NavigationButton from '@/components/NavigationButton.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '@/stores/useAuth';
import { useStatesStore } from '@/stores/statesStore';
import { useWahlStore } from '@/stores/wahlStore';
import {createRouter, createWebHistory} from 'vue-router';
import ParteiboxComponent from "@/components/ParteiboxComponent.vue";


describe('WahlView', () => {
  let wrapper;


  beforeEach(() => {
    setActivePinia(createPinia());
    const authStore = useAuthStore();
    const statesStore = useStatesStore();
    const wahlStore = useWahlStore();

    authStore.isAuthenticated = false;
    statesStore.gewaehlt = false;
    wahlStore.checkboxAgreed = false;

    const router = createRouter({
      history: createWebHistory(),
      routes: [],
    });

    wrapper = mount(WahlView, {
      global: {
        components: { NavigationButton },
        plugins: [router],
      },
    });
  });

  it('renders the start screen for unauthenticated users', () => {
    const startText = wrapper.find('.start-end-container .text-xl').text();
    expect(startText).toContain('Sie müssen sich erst verifizieren, um wählen zu können.');
  });


  it('renders "already voted" screen if user has voted', async () => {
    const statesStore = useStatesStore();
    const authStore = useAuthStore();
    authStore.isAuthenticated = true;
    statesStore.gewaehlt = true;
    await wrapper.vm.$nextTick();

    const votedText = wrapper.find('.start-end-container .text-xl').text();
    expect(votedText).toContain('Sie haben bereits gewählt.');
  });

  it('renders the "start voting" screen for authenticated users', async () => {
    const authStore = useAuthStore();
    authStore.isAuthenticated = true;
    await wrapper.vm.$nextTick();

    const startText = wrapper.find('.start-end-container .text-xl').text();
    expect(startText).toContain('Beginnen Sie mit dem Durchführen der Wahl durch Drücken auf Start:');
  });

  it('starts the voting process when "Start" is clicked', async () => {
    const authStore = useAuthStore();
    authStore.isAuthenticated = true;
    await wrapper.vm.$nextTick();

    const startButton = wrapper.findComponent(NavigationButton);
    await startButton.find('button').trigger('click');
    expect(wrapper.vm.erststimme).toBe(true);
    expect(wrapper.vm.start).toBe(false);
    expect(wrapper.vm.fortschritt).toBe(1);
  });

  it('navigates between voting steps correctly', async () => {
    const authStore = useAuthStore();
    authStore.isAuthenticated = true;
    wrapper.vm.getStarted(); // Start voting
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.erststimme).toBe(true);
    expect(wrapper.vm.fortschritt).toBe(1);

    wrapper.vm.getErststimme(); // Move to zweitstimme
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.zweitstimme).toBe(true);
    expect(wrapper.vm.fortschritt).toBe(2);

    wrapper.vm.gettoBestaetigung(); // Move to bestaetigung
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.bestaetigung).toBe(true);
    expect(wrapper.vm.fortschritt).toBe(3);
  });

  it('displays the progress bar correctly', async () => {
    const authStore = useAuthStore();
    authStore.isAuthenticated = true;
    wrapper.vm.getStarted();
    await wrapper.vm.$nextTick();

    const progressBar = wrapper.find('.progress-fill');
    expect(progressBar.attributes('style')).toContain('width: 25%;');

    wrapper.vm.getErststimme();
    await wrapper.vm.$nextTick();
    expect(progressBar.attributes('style')).toContain('width: 50%;');

    wrapper.vm.gettoBestaetigung();
    await wrapper.vm.$nextTick();
    expect(progressBar.attributes('style')).toContain('width: 75%;');
  });

  it('resets to start when "Abbrechen" is confirmed', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    wrapper.vm.gettoStart();
    await wrapper.vm.$nextTick();

    expect(confirmSpy).toHaveBeenCalledWith(
      'Sind Sie sicher, dass Sie die Wahl abbrechen möchten? Alle bisher getroffenen Auswahlen gehen verloren.'
    );
    expect(wrapper.vm.erststimme).toBe(false);
    expect(wrapper.vm.start).toBe(true);
    expect(wrapper.vm.fortschritt).toBe(0);
  });

  it('prevents submission when checkbox is not agreed', async () => {
    // Setze die notwendigen Werte für den Test
    wrapper.vm.bestaetigung = true; // Stelle sicher, dass der Button angezeigt wird

    const wahlStore = useWahlStore();
    wahlStore.checkboxAgreed = false;  // Setze checkboxAgreed auf false

    // Triggern, dass der View neu gerendert wird
    await wrapper.vm.$nextTick();

    // Finde den NavigationButton mit dem Prop 'type' = 'submit'
    const submitButton = wrapper.findAllComponents(NavigationButton).find(component => {
      return component.props('type') === 'submit';
    });

    // Überprüfe, ob der Button existiert
    expect(submitButton.exists()).toBe(true);

    // Überprüfe, ob die Prop 'isDisabled' korrekt auf true gesetzt ist
    expect(submitButton.props().isDisabled).toBe(true);

    // Überprüfe, ob das disabled-Attribut des Button-Elements gesetzt ist
    const buttonElement = submitButton.find('button');
    expect(buttonElement.attributes('disabled')).toBeDefined();  // Button sollte disabled sein
  });



});

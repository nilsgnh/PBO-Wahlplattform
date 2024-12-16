/**
 * @vitest-environment happy-dom
 */

import { mount } from '@vue/test-utils';
import StimmeComponent from '@/components/StimmeComponent.vue'; // Deine Wahl-Komponente
import { describe, it, expect } from 'vitest'; // Für Mocks und Spies
import { createPinia } from 'pinia'; // Pinia für Store-Integration
import { useWahlStore } from '@/stores/wahlStore'; // Importiere deinen Store

// npx vitest
describe('StimmeComponent', () => {
  // Test, ob die Wahlüberschrift korrekt gerendert wird
  it('should render the title correctly', () => {
    const wrapper = mount(StimmeComponent, {
      global: {
        plugins: [createPinia()],
      },
    });
    expect(wrapper.find('p.font-bold.text-2xl').text()).toBe('Erststimme'); // Teste den Text der Stimme
    expect(wrapper.find('p.text-base.pb-3').text()).toContain('Sie haben eine Stimme'); // Teste den erläuternden Text
  });

  // Test, ob die Liste der Parteien korrekt angezeigt wird
  it('should render a list of parties based on the selected voice type', async () => {
    const store = useWahlStore();
    const wrapper = mount(StimmeComponent, {
      global: {
        plugins: [createPinia()],
      },
      props: {
        stimme: 'Zweitstimme',
      },
    });

    await store.$nextTick(); // Sicherstellen, dass der Store geladen wurde
    expect(wrapper.findAllComponents({ name: 'ParteiboxComponent' }).length).toBe(store.parteien.length);
  });

  // Test, ob die Auswahl für Erststimme korrekt funktioniert
  it('should toggle party selection for Erststimme correctly', async () => {
    const store = useWahlStore();
    const wrapper = mount(StimmeComponent, {
      global: {
        plugins: [createPinia()],
      },
      props: {
        stimme: 'Erststimme',
      },
    });

    const parteibox = wrapper.findAllComponents({ name: 'ParteiboxComponent' })[0];
    await parteibox.vm.$emit('click', 1); // Simuliere das Klick-Ereignis mit einer Partei-ID

    // Überprüfe, ob der Store korrekt aktualisiert wurde
    expect(store.selectedErststimme).toBe(1);

    // Überprüfe, ob die Anzeige aktualisiert wurde
    expect(parteibox.classes()).toContain('selected'); // Stelle sicher, dass die Box für die ausgewählte Partei eine "selected"-Klasse hat
  });

  // Test, ob die Auswahl für Zweitstimme korrekt funktioniert
  it('should toggle party selection for Zweitstimme correctly', async () => {
    const store = useWahlStore();
    const wrapper = mount(StimmeComponent, {
      global: {
        plugins: [createPinia()],
      },
      props: {
        stimme: 'Zweitstimme',
      },
    });

    const parteibox = wrapper.findAllComponents({ name: 'ParteiboxComponent' })[1];
    await parteibox.vm.$emit('click', 2); // Simuliere das Klick-Ereignis mit einer Partei-ID

    // Überprüfe, ob der Store korrekt aktualisiert wurde
    expect(store.selectedZweitstimme).toBe(2);
  });

  // Test, ob die Boxen korrekt deaktiviert werden, wenn eine Auswahl getroffen wurde
  it('should disable unselected parties when one is selected', async () => {
    const store = useWahlStore();
    const wrapper = mount(StimmeComponent, {
      global: {
        plugins: [createPinia()],
      },
      props: {
        stimme: 'Zweitstimme',
      },
    });

    const parteibox = wrapper.findAllComponents({ name: 'ParteiboxComponent' })[0];
    await parteibox.vm.$emit('click', 1); // Simuliere die Auswahl einer Partei

    // Überprüfe, ob alle anderen Parteien deaktiviert sind
    const unselectedBoxes = wrapper.findAllComponents({ name: 'ParteiboxComponent' }).filter(
      (box) => box.props().selected !== true
    );

    unselectedBoxes.forEach((box) => {
      expect(box.props().disabled).toBe(true);
    });
  });

  // Test, ob die richtige Klasse auf der Box angezeigt wird, wenn sie ausgewählt ist
  it('should apply the correct "selected" class to the selected party', async () => {
    const store = useWahlStore();
    const wrapper = mount(StimmeComponent, {
      global: {
        plugins: [createPinia()],
      },
      props: {
        stimme: 'Erststimme',
      },
    });

    const parteibox = wrapper.findAllComponents({ name: 'ParteiboxComponent' })[0];
    await parteibox.vm.$emit('click', 1); // Simuliere die Auswahl einer Partei

    // Überprüfe, ob die "selected"-Klasse korrekt angewendet wurde
    expect(parteibox.classes()).toContain('selected');
  });

  // Test, ob der Store den Wert korrekt setzt, wenn eine Partei ausgewählt wird
  it('should correctly set the store value when a party is selected', async () => {
    const store = useWahlStore();
    const wrapper = mount(StimmeComponent, {
      global: {
        plugins: [createPinia()],
      },
      props: {
        stimme: 'Zweitstimme',
      },
    });

    const parteibox = wrapper.findAllComponents({ name: 'ParteiboxComponent' })[1];
    await parteibox.vm.$emit('click', 2); // Simuliere die Auswahl einer Partei

    // Überprüfe, ob der Store korrekt aktualisiert wurde
    expect(store.selectedZweitstimme).toBe(2);
  });
});

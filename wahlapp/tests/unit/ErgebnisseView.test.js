/**
 * Dieser Test überprüft die Funktionalität der Vue-Komponente `ErgebnisseView.vue`.
 * Die Hauptziele sind:
 * 1. Sicherstellen, dass beim Laden das erste Diagramm angezeigt wird.
 * 2. Die Navigation über die rechten und linken Buttons zwischen den Diagrammen zu testen.
 * 3. Verifizieren, dass die richtigen Diagrammkomponenten und Inhalte angezeigt werden.
 */

import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, beforeEach, expect } from 'vitest';
import ErgebnisseView from '@/views/ErgebnisseView.vue'; // Komponente
import BarChart from '@/components/BarChart.vue'; // Balkendiagramm-Komponente
import PieChart from '@/components/PieChart.vue'; // Kreisdiagramm-Komponente

describe('ErgebnisseView.vue', () => {
  // Initialisiere Pinia vor jedem Test
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('zeigt das erste Diagramm standardmäßig an', () => {
    // Mountet die Komponente
    const wrapper = mount(ErgebnisseView, {
      global: {
        plugins: [createPinia()], // Pinia einbinden
      },
    });

    // Prüfe, ob das BarChart angezeigt wird
    expect(wrapper.findComponent(BarChart).exists()).toBe(true);

    // Prüfe, ob das PieChart nicht angezeigt wird
    expect(wrapper.findComponent(PieChart).exists()).toBe(false);

    // Prüfe den angezeigten Text
    expect(wrapper.text()).toContain('Wahlergebnisse 2021');
  });

  it('navigiert mit dem rechten Button zum nächsten Diagramm', async () => {
    // Mountet die Komponente
    const wrapper = mount(ErgebnisseView, {
      global: {
        plugins: [createPinia()],
      },
    });

    // Finde den rechten Button
    const rightButton = wrapper.find('.button-area.right button');

    // Simuliere einen Klick auf den rechten Button
    await rightButton.trigger('click');

    // Prüfe, ob das PieChart angezeigt wird
    expect(wrapper.findComponent(PieChart).exists()).toBe(true);

    // Prüfe, ob das BarChart nicht mehr angezeigt wird
    expect(wrapper.findComponent(BarChart).exists()).toBe(false);

    // Prüfe, ob der Text noch korrekt angezeigt wird
    expect(wrapper.text()).toContain('Wahlergebnisse 2021');

    // Navigiere weiter zum dritten Diagramm
    await rightButton.trigger('click');

    // Prüfe, ob das BarChart für "Gewinne und Verluste" angezeigt wird
    expect(wrapper.findComponent(BarChart).props('chartType')).toBe('gewinneUndVerluste');
    expect(wrapper.text()).toContain('Gewinne und Verluste');
  });

  it('navigiert mit dem linken Button zum vorherigen Diagramm', async () => {
    // Mountet die Komponente
    const wrapper = mount(ErgebnisseView, {
      global: {
        plugins: [createPinia()],
      },
    });

    // Finde den linken Button
    const leftButton = wrapper.find('.button-area.left button');

    // Navigiere zwei Schritte nach rechts
    await wrapper.vm.handleNavigation('next');
    await wrapper.vm.handleNavigation('next');

    // Navigiere dann einen Schritt zurück
    await leftButton.trigger('click');

    // Prüfe, ob das PieChart angezeigt wird
    expect(wrapper.findComponent(PieChart).exists()).toBe(true);

    // Prüfe, ob das BarChart nicht angezeigt wird
    expect(wrapper.findComponent(BarChart).exists()).toBe(false);

    // Prüfe, ob der Text korrekt ist
    expect(wrapper.text()).toContain('Wahlergebnisse 2021');
  });
});

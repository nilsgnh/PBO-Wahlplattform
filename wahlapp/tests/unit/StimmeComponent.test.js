import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWahlStore } from '@/stores/wahlStore';
import StimmeComponent from '@/components/StimmeComponent.vue';
import ParteiboxComponent from '@/components/ParteiboxComponent.vue';

describe('StimmeComponent', () => {
  beforeEach(() => {
    // Pinia initialisieren
    setActivePinia(createPinia());
  });

  it('renders the correct title and info for Erststimme', () => {
    const wrapper = mount(StimmeComponent, {
      props: {
        stimme: 'Erststimme',
        info: ' für die Direktwahl',
      },
    });
    expect(wrapper.text()).toContain('Erststimme');
    expect(wrapper.text()).toContain('Sie haben eine Stimme für die Direktwahl.');
  });

  it('renders the correct title and info for Zweitstimme', () => {
    const wrapper = mount(StimmeComponent, {
      props: {
        stimme: 'Zweitstimme',
        info: ' für die Listenwahl',
      },
    });
    expect(wrapper.text()).toContain('Zweitstimme');
    expect(wrapper.text()).toContain('Sie haben eine Stimme für die Listenwahl.');
  });

  it('displays the correct items for Erststimme from the store', () => {
    const store = useWahlStore();
    store.listenplaetze = [
      { id: 1, name: 'Kandidat A', text: 'Direktwahl', num: 1 },
      { id: 2, name: 'Kandidat B', text: 'Direktwahl', num: 2 },
    ];

    const wrapper = mount(StimmeComponent, {
      props: {
        stimme: 'Erststimme',
        info: '',
      },
    });

    const boxes = wrapper.findAllComponents(ParteiboxComponent);
    expect(boxes).toHaveLength(2);
    expect(boxes[0].props('partei')).toBe('Kandidat A');
    expect(boxes[1].props('partei')).toBe('Kandidat B');
  });

  it('displays the correct items for Zweitstimme from the store', () => {
    const store = useWahlStore();
    store.parteien = [
      { id: 1, name: 'Partei A', text: 'Listenwahl', num: 1 },
      { id: 2, name: 'Partei B', text: 'Listenwahl', num: 2 },
    ];

    const wrapper = mount(StimmeComponent, {
      props: {
        stimme: 'Zweitstimme',
        info: '',
      },
    });

    const boxes = wrapper.findAllComponents(ParteiboxComponent);
    expect(boxes).toHaveLength(2);
    expect(boxes[0].props('partei')).toBe('Partei A');
    expect(boxes[1].props('partei')).toBe('Partei B');
  });

  it('handles box clicks and updates the store for Erststimme', async () => {
    const store = useWahlStore();

    const wrapper = mount(StimmeComponent, {
      props: {
        stimme: 'Erststimme',
        info: ' für die Wahl eines oder einer Wahlkreisabgeordneten',
      },
    });

    const box = wrapper.findAllComponents(ParteiboxComponent).find(component => {
      return component.props('num') === 1;
    });
    const clickEvent = new Event('click');
    box.element.dispatchEvent(clickEvent);
    await wrapper.vm.$nextTick();

    expect(store.selectedErststimme).toBe(1);
    expect(wrapper.vm.selectedPartei).toBe(1);
  });

  it('handles box clicks and updates the store for Zweitstimme', async () => {
    const store = useWahlStore();

    const wrapper = mount(StimmeComponent, {
      props: {
        stimme: 'Zweitstimme',
        info: '',
      },
    });

    const box = wrapper.findAllComponents(ParteiboxComponent).find(component => {
      return component.props('num') === 2;
    });
    const clickEvent = new Event('click');
    box.element.dispatchEvent(clickEvent);
    await wrapper.vm.$nextTick();

    expect(store.selectedZweitstimme).toBe(2);
    expect(wrapper.vm.selectedPartei).toBe(2);
  });

  it('resets the selection when the same box is clicked twice', async () => {
    const store = useWahlStore();

    const wrapper = mount(StimmeComponent, {
      props: {
        stimme: 'Zweitstimme',
        info: '',
      },
    });

    const box = wrapper.findAllComponents(ParteiboxComponent).find(component => {
      return component.props('num') === 3;
    });

    const clickEvent = new Event('click');
    box.element.dispatchEvent(clickEvent);
    await wrapper.vm.$nextTick();
    expect(store.selectedZweitstimme).toBe(3);

    const newclickEvent = new Event('click');
    box.element.dispatchEvent(newclickEvent);
    await wrapper.vm.$nextTick();
    expect(store.selectedZweitstimme).toBe(null);
    expect(wrapper.vm.selectedPartei).toBe(null);
  });
});

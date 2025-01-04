/**
 * @vitest-environment happy-dom
 */

import { mount } from '@vue/test-utils';
import ButtonSlide from '@/components/ButtonSlide.vue';
import { vi } from 'vitest'; // Importiere vi für Mocks

describe('ButtonSlide.vue', () => {
  it('should render the left button when buttonType is "left"', async () => {
    const wrapper = mount(ButtonSlide, {
      props: {
        buttonType: 'left',
      },
    });

    await wrapper.vm.$nextTick(); // Warten auf DOM-Aktualisierung

    expect(wrapper.find('.left').exists()).toBe(true);
    expect(wrapper.find('.right').exists()).toBe(false);
  });

  it('should render the right button when buttonType is "right"', async () => {
    const wrapper = mount(ButtonSlide, {
      props: {
        buttonType: 'right',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.right').exists()).toBe(true);
    expect(wrapper.find('.left').exists()).toBe(false);
  });

  it('should emit "navigate" event with "previous" direction when the left button is clicked', async () => {
    const wrapper = mount(ButtonSlide, {
      props: {
        buttonType: 'left',
      },
    });

    const spy = vi.fn();
    // Überwache das Emit-Event direkt auf dem Wrapper
    wrapper.emitted('navigate'); // Stellt sicher, dass das Event korrekt registriert wird

    // Klicke den linken Button
    await wrapper.find('.left').trigger('click');

    // Überprüfen, ob das 'navigate'-Event mit 'previous' ausgelöst wurde
    expect(wrapper.emitted().navigate[0]).toEqual(['previous']);
  });

  it('should emit "navigate" event with "next" direction when the right button is clicked', async () => {
    const wrapper = mount(ButtonSlide, {
      props: {
        buttonType: 'right',
      },
    });

    const spy = vi.fn();
    // Überwache das Emit-Event direkt auf dem Wrapper
    wrapper.emitted('navigate'); // Stellt sicher, dass das Event korrekt registriert wird

    // Klicke den rechten Button
    await wrapper.find('.right').trigger('click');

    // Überprüfen, ob das 'navigate'-Event mit 'next' ausgelöst wurde
    expect(wrapper.emitted().navigate[0]).toEqual(['next']);
  });
});

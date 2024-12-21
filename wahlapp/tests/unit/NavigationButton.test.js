import { mount } from '@vue/test-utils';
import NavigationButton from '@/components/NavigationButton.vue'; // Deine Wahl-Komponente
import { describe, it, expect, vi } from 'vitest'; // Für Mocks und Spies

// npx vitest
describe('NavigationButton', value => {
  // Test, ob der Button korrekt gerendert wird
  it('should render the button element', () => {
    const wrapper = mount(NavigationButton);
    expect(wrapper.html()).toContain('button');
  });

  // Test, ob der Button mit einem bestimmten Typ korrekt gerendert wird
  it('should render with the correct classes for the "submit" type', () => {
    const wrapper = mount(NavigationButton, {
      props: {
        type: 'submit',
      },
    });
    expect(wrapper.classes()).toContain('submit-button');
    expect(wrapper.classes()).toContain('h-11');
  });

  it('should render with the correct classes for the "back" type', () => {
    const wrapper = mount(NavigationButton, {
      props: {
        type: 'back',
      },
    });
    expect(wrapper.classes()).toContain('bg-gray-200');
    expect(wrapper.classes()).toContain('text-gray-800');
    expect(wrapper.classes()).toContain('h-11');
  });

  it('should render with the correct classes for the "dashboard" type', () => {
    const wrapper = mount(NavigationButton, {
      props: {
        type: 'dashboard',
      },
    });
    expect(wrapper.classes()).toContain('bg-white');
    expect(wrapper.classes()).toContain('h-16');
  });

  // Test, ob die Button-Klasse für den Hover-Zustand korrekt ist
  it('should have correct hover class for the "back" type', () => {
    const wrapper = mount(NavigationButton, {
      props: {
        type: 'back',
      },
    });
    expect(wrapper.classes()).toContain('hover:bg-gray-300');
  });

  it('should have correct hover class for other types', () => {
    const wrapper = mount(NavigationButton, {
      props: {
        type: 'submit',
      },
    });
    expect(wrapper.classes()).toContain('hover:bg-gray-200');
  });

  // Test, ob der Button deaktiviert ist, wenn isDisabled auf true gesetzt wird
  it('should be disabled when isDisabled prop is true', () => {
    const wrapper = mount(NavigationButton, {
      props: {
        type: 'submit',
        isDisabled: true,
      },
    });
    expect(wrapper.attributes('disabled')).toBe('');
    expect(wrapper.classes()).toContain('disabled');
  });

  it('should emit click event when clicked and is not disabled', async () => {
    const spy = vi.fn();
    const wrapper = mount(NavigationButton, {
      props: {
        isDisabled: false,
      },
      attrs: {
        onClick: spy,
      },
    });

    const button = wrapper.find('button');
    const clickEvent = new Event('click');
    button.element.dispatchEvent(clickEvent);
    await wrapper.vm.$nextTick();
    expect(spy).toHaveBeenCalled();
  });



  // Test, ob der Button keine Aktion auslöst, wenn er deaktiviert ist
  it('should not emit click event when clicked and is disabled', async () => {
    const wrapper = mount(NavigationButton, {
      props: {
        type: 'submit',
        isDisabled: true,
      },
    });
    const spy = vi.fn();

    await wrapper.find('button').trigger('click');
    expect(spy).not.toHaveBeenCalled();
  });

  // Test, ob der Button korrekt den Slot-Inhalt anzeigt
  it('should render the button text from slot', () => {
    const wrapper = mount(NavigationButton, {
      props: {
        type: 'submit',
      },
      slots: {
        buttonText: 'Submit Form',
      },
    });
    expect(wrapper.text()).toContain('Submit Form');
  });
});

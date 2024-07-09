// src/test/Card.spec.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Card from '@/components/card.vue';

describe('Card.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'Test Title';
    const wrapper = mount(Card, {
      props: { title },
    });
    expect(wrapper.find('.card-title').text()).toBe(title);
  });

  it('toggles card body visibility when button is clicked', async () => {
    const wrapper = mount(Card);
    expect(wrapper.find('.card-body').isVisible()).toBe(true);
    await wrapper.find('.btn-tool').trigger('click');
    expect(wrapper.find('.card-body').isVisible()).toBe(false);
  });

  it('closes the card when close button is clicked', async () => {
    const wrapper = mount(Card);
    await wrapper.find('.card-tools .btn-tool:last-child').trigger('click');
    expect(wrapper.find('.card').exists()).toBe(false);
  });
});

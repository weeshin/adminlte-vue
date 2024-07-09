// src/tests/setup.ts
import { config } from '@vue/test-utils';
import { vi } from 'vitest';

// Mock i18n
vi.mock('vue-i18n', () => ({
  createI18n: () => ({
    global: {
      t: (key: string) => key,
    },
  }),
}));

// Add any other global mocks or configurations here

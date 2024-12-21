import { vi } from 'vitest';

// Mock für window und history
vi.stubGlobal('windows', {
  ...globalThis,
  location: {
    ...globalThis.location,
    pathname: '/',
  },
  history: {
    pushState: vi.fn(),
    replaceState: vi.fn(),
    state: null
  },
});


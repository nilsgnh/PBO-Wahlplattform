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

vi.stubGlobal('scrollTo', vi.fn());

// Mock für HTMLCanvasElement.prototype.getContext
HTMLCanvasElement.prototype.getContext = vi.fn(() => {
  return {
    // Mocked Methoden und Eigenschaften für den Canvas-Kontext
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    getImageData: vi.fn(() => ({ data: [] })),
    putImageData: vi.fn(),
    createImageData: vi.fn(() => []),
    setTransform: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    fillText: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    measureText: vi.fn(() => ({ width: 0 })),
    transform: vi.fn(),
    rect: vi.fn(),
    clip: vi.fn(),
  };
});

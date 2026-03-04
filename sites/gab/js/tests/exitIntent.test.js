/**
 * @jest-environment jsdom
 */

describe('Exit Intent Popup', () => {
  let listeners = [];
  const originalAdd = document.addEventListener;
  const originalRemove = document.removeEventListener;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <div id="exitIntentModal" class="modal-overlay">
        <div class="modal-container">
          <button class="modal-close">X</button>
        </div>
      </div>
      <div id="leadMagnetModal" class="modal-overlay">
        <div class="modal-container">
          <button class="modal-close">X</button>
        </div>
      </div>
    `;

    // Reset Modules
    jest.resetModules();

    // Mock localStorage
    const store = {};
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => store[key] || null);
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
      store[key] = value.toString();
    });

    // Mock Time
    jest.useFakeTimers();

    // Spy on addEventListener to track listeners so we can remove them
    listeners = [];
    jest.spyOn(document, 'addEventListener').mockImplementation((event, fn, options) => {
      listeners.push({ event, fn, options });
      originalAdd.call(document, event, fn, options);
    });
  });

  afterEach(() => {
    // Clean up listeners
    listeners.forEach(({ event, fn, options }) => {
      originalRemove.call(document, event, fn, options);
    });
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  test('should show exit intent modal when mouse leaves viewport after 15s', () => {
    require('../main.js');
    jest.advanceTimersByTime(16000);

    const event = new MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
      clientY: -1,
      relatedTarget: null
    });
    Object.defineProperty(event, 'clientY', { value: -1 });

    document.dispatchEvent(event);

    const modal = document.getElementById('exitIntentModal');
    expect(modal.classList.contains('active')).toBe(true);
  });

  test('should NOT show modal if less than 15s passed', () => {
    require('../main.js');
    jest.advanceTimersByTime(10000);

    const event = new MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
      clientY: -1,
      relatedTarget: null
    });
    Object.defineProperty(event, 'clientY', { value: -1 });

    document.dispatchEvent(event);

    const modal = document.getElementById('exitIntentModal');
    expect(modal.classList.contains('active')).toBe(false);
  });

  test('should NOT show modal if mouse is not at top of viewport', () => {
    require('../main.js');
    jest.advanceTimersByTime(16000);

    const event = new MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
      clientY: 100,
      relatedTarget: null
    });
    Object.defineProperty(event, 'clientY', { value: 100 });

    document.dispatchEvent(event);

    const modal = document.getElementById('exitIntentModal');
    expect(modal.classList.contains('active')).toBe(false);
  });

  test('should NOT show modal if user is already a customer', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'gab_customer') return '1';
      return null;
    });

    require('../main.js');
    jest.advanceTimersByTime(16000);

    const event = new MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
      clientY: -1,
      relatedTarget: null
    });
    Object.defineProperty(event, 'clientY', { value: -1 });

    document.dispatchEvent(event);

    const modal = document.getElementById('exitIntentModal');
    expect(modal.classList.contains('active')).toBe(false);
  });

  test('should NOT show modal if lead was already captured', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'gab_lead_captured') return '1';
      return null;
    });

    require('../main.js');
    jest.advanceTimersByTime(16000);

    const event = new MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
      clientY: -1,
      relatedTarget: null
    });
    Object.defineProperty(event, 'clientY', { value: -1 });

    document.dispatchEvent(event);

    const modal = document.getElementById('exitIntentModal');
    expect(modal.classList.contains('active')).toBe(false);
  });

  test('should NOT show modal if exit intent was previously dismissed', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'gab_exit_dismissed') return '1';
      return null;
    });

    require('../main.js');
    jest.advanceTimersByTime(16000);

    const event = new MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
      clientY: -1,
      relatedTarget: null
    });
    Object.defineProperty(event, 'clientY', { value: -1 });

    document.dispatchEvent(event);

    const modal = document.getElementById('exitIntentModal');
    expect(modal.classList.contains('active')).toBe(false);
  });

  test('should NOT show exit intent if lead popup has already been shown', () => {
    require('../main.js');
    jest.advanceTimersByTime(46000); // Trigger lead popup

    const leadModal = document.getElementById('leadMagnetModal');
    expect(leadModal.classList.contains('active')).toBe(true);

    // Close lead modal
    leadModal.querySelector('.modal-close').click();
    expect(leadModal.classList.contains('active')).toBe(false);

    // Trigger exit intent
    const event = new MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
      clientY: -1,
      relatedTarget: null
    });
    Object.defineProperty(event, 'clientY', { value: -1 });

    document.dispatchEvent(event);

    const exitModal = document.getElementById('exitIntentModal');
    expect(exitModal.classList.contains('active')).toBe(false);
  });

  test('should only trigger once (exitShown flag logic)', () => {
    require('../main.js');
    jest.advanceTimersByTime(16000);

    const event = new MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
      clientY: -1,
      relatedTarget: null
    });
    Object.defineProperty(event, 'clientY', { value: -1 });

    // First trigger
    document.dispatchEvent(event);
    const modal = document.getElementById('exitIntentModal');
    expect(modal.classList.contains('active')).toBe(true);

    // Manually remove active class (simulate user action or just checking internal flag)
    // without clicking close (so exitDismissed is NOT set)
    modal.classList.remove('active');

    // Second trigger
    document.dispatchEvent(event);

    // Should NOT open again because exitShown internal flag is true
    expect(modal.classList.contains('active')).toBe(false);
  });
});

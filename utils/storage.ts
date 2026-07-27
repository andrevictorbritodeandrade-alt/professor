// Safe wrapper around localStorage to prevent DOMExceptions / SecurityError in iframe environments

class MemoryStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

const memoryStorage = new MemoryStorage();

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[storage] getItem failed for "${key}", using memory fallback:`, e);
    }
    return memoryStorage.getItem(key);
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn(`[storage] setItem failed for "${key}", using memory fallback:`, e);
    }
    memoryStorage.setItem(key, value);
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn(`[storage] removeItem failed for "${key}", using memory fallback:`, e);
    }
    memoryStorage.removeItem(key);
  },

  clear: (): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.clear();
        return;
      }
    } catch (e) {
      console.warn(`[storage] clear failed, using memory fallback:`, e);
    }
    memoryStorage.clear();
  }
};

class SimpleCache {
  private store: Map<string, any>;

  constructor() {
    this.store = new Map();
  }

  set(key: string, value: any): void {
    this.store.set(key, value);
  }

  get(key: string): any {
    return this.store.get(key);
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  clear(): void {
    this.store.clear();
  }

  keys(): string[] {
    return Array.from(this.store.keys());
  }

  tx(): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of this.store.entries()) {
      result[key] = value;
    }
    return result;
  }
}

export const cache = new SimpleCache();

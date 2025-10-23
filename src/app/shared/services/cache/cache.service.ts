import { Injectable } from '@angular/core';

interface CacheItem<T> {
  data: T;
  expires: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheItem<any>>();

  constructor() { }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (item && Date.now() < item.expires) {
      return item.data as T;
    }

    if (item) {
      this.cache.delete(key);
    }

    return null;
  }

  set<T>(key: string, data: T, ttlMs: number = 5 * 60 * 1000): void {
    const expires = Date.now() + ttlMs;
    const item: CacheItem<T> = { data, expires };
    this.cache.set(key, item);
  }

  clear(): void {
    this.cache.clear();
  }
}

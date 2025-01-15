export abstract class LocalStorageServiceInterface {
  abstract check(name: string): boolean;
  abstract remove(name: string): void;
  abstract get(name: string): string | null;
  abstract getJson<T>(name: string): T | null;
  abstract set(name: string, value: string): void;
  abstract setJson<T>(name: string, value: T): void;
}
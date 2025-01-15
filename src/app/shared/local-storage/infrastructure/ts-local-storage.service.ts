import { Injectable } from "@angular/core";
import { LocalStorageServiceInterface } from "../domain/services/local-storage.interface";

@Injectable({
    providedIn: 'root'
})
export class TsLocalStorageService implements LocalStorageServiceInterface {

    check(name: string): boolean {
        return localStorage.getItem(name) !== null;
    }

    remove(name: string): void {
        localStorage.removeItem(name);
    }

    get(name: string): string | null {
        return localStorage.getItem(name);
    }

    getJson<T>(name: string): T | null {
		const item = localStorage.getItem(name);

		return item
			? JSON.parse(item) as T
			: null;
    }

    set(name: string, value: string): void {
        localStorage.setItem(name, value);
    }

    setJson<T>(name: string, value: T): void {
        this.set(name, JSON.stringify(value));
    }

}
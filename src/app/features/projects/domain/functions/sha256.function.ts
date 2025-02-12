import * as CryptoJS from 'crypto-js';

//Fonction pour crypter un string avec sha256
export function sha256(value: string): string {
	return value ? CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex) : '';
}
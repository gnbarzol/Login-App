import { Injectable, Inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as SecureStorage from 'secure-web-storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private secretKey = '02012324234047C7D125';

  constructor() { }

  secureStorage = new SecureStorage(localStorage, {
    hash: (key) => {
      key = CryptoJS.SHA256(key, this.secretKey);
      return key.toString();
    },
    encrypt: (data) => {
      data = CryptoJS.AES.encrypt(data, this.secretKey);
      return data.toString();
    },
    decrypt: (data) => {
      data = CryptoJS.AES.decrypt(data, this.secretKey);
      return data.toString(CryptoJS.enc.Utf8);
    }
  });
}

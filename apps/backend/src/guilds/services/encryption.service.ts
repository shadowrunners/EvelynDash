import { Injectable } from "@nestjs/common";
import Cryptr from "cryptr";

@Injectable()
export class EncryptionService {
    private readonly cryptr: Cryptr = new Cryptr(process.env.DECRYPTION_KEY, {
        pbkdf2Iterations: 15000,
		saltLength: 15,
    });

    public encrypt(str: string) {
        return this.cryptr.encrypt(str);
    }

    public decrypt(str: string) {
        return this.cryptr.decrypt(str);
    }
}
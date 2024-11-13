import CryptoJS from 'crypto-js';

export const encryptFile = async (file: File, password: string): Promise<{ encryptedData: string, fileName: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const binary = e.target?.result;
                const encrypted = CryptoJS.AES.encrypt(binary as string, password).toString();
                resolve({
                    encryptedData: encrypted,
                    fileName: file.name
                });
            } catch (error) {
                reject(error);
            }
        };
        reader.readAsDataURL(file);
    });
};

export const decryptFile = (encryptedData: string, password: string): string => {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        throw new Error('Incorrect password or corrupted file');
    }
};
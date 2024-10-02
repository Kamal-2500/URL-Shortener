export class UrlUtils {
    static isValid = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        }catch (error) {
            return false;
        }
    }
}
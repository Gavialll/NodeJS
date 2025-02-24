
export class UserValidator {
    static validate(user: any): string[] {
        const errors: string[] = [];

        // Перевірка name
        if (!user.name || typeof user.name !== 'string' || user.name.length < 2 || user.name.length > 100) {
            errors.push('Ім’я повинно бути рядком від 2 до 100 символів.');
        }

        // Перевірка age
        if (typeof user.age !== 'number' || !Number.isInteger(user.age) || user.age <= 0) {
            errors.push('Вік повинен бути позитивним цілим числом.');
        }

        // Перевірка wallet (якщо є)
        if (user.wallet && typeof user.wallet === 'object') {
            const walletErrors = this.validateWallet(user.wallet);
            errors.push(...walletErrors);
        }

        return errors;
    }

    private static validateWallet(wallet: any): string[] {
        const errors: string[] = [];

        if (typeof wallet.money !== 'number' || wallet.money < 0) {
            errors.push('Баланс гаманця повинен бути невід’ємним числом.');
        }

        return errors;
    }
}
export default function getCurrencySymbol(basePack) {
    if (!basePack || !basePack.currency) {
        throw new Error('Currency not provided or basePack is invalid');
    }

    return basePack.currency === 'EUR' ? '€' : '$';
}
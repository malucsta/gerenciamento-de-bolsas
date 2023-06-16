export interface BaseCombo {
    name: string;
}

export interface Combo extends BaseCombo {
    id: number;
    price: number
}

export function isValidCombo(combo: BaseCombo): boolean {
    const { name } = combo;

    return name != null;
}
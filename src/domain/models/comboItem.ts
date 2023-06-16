export interface BaseComboItem {
    idCombo: number,
    idProduct: number,
    quantity: number
}

export interface ComboItem extends BaseComboItem {
    id: number;
}

export function isValidComboItem(comboItem: BaseComboItem): boolean {
    const { quantity } = comboItem;

    return quantity > 0;
} 
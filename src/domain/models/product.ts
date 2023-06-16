export interface BaseProduct {
    name: string;
    price: number;
}

export interface Product extends BaseProduct {
    id: number;
}

export function isValidProduct(product: BaseProduct): boolean {
    const { name, price } = product;

    return name != null || price != null;
}
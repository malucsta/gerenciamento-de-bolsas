export interface BaseSubscription {
    name: string;
    idCombo: number;
}

export interface Subscription extends BaseSubscription {
    id: number;
}

export function isValidSubscription(subscription: BaseSubscription): boolean {
    const { name, idCombo } = subscription;

    //provisory
    //TODO: in order to update, one can be null. To create, none; 
    return name != null && idCombo != null;
} 
import { ServiceResponse } from '@src/domain/models/serviceResponse';
import { BaseSubscription, Subscription } from '@src/domain/models/subscription';
import { SubscriptionRepository } from '@src/persistence/repositories/subscriptionRepository';
export class SubscriptionService {

    private repository: SubscriptionRepository;

    constructor() {
        this.repository = new SubscriptionRepository();
    }


    public async findAllSubscriptions(): Promise<ServiceResponse<Subscription>> {

        const serviceResponse: ServiceResponse<Subscription> = {
            sucess: true,
        };

        try {
            serviceResponse.data = await this.repository.findAll();
            return serviceResponse;

        } catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }


        return serviceResponse;
    }


    public async findOne(id: number): Promise<ServiceResponse<Subscription>> {

        const serviceResponse: ServiceResponse<Subscription> = {
            sucess: true,
        };

        try {
            const existingProduct = await this.repository.findOne(id);
            const existingProductString = JSON.stringify(existingProduct)

            if (existingProductString == '{}' || existingProductString == '[]') {
                serviceResponse.sucess = false;
                serviceResponse.message = "This subscription doesn't exist"
            }
            else {
                serviceResponse.data = existingProduct
            }

            return serviceResponse;


        } catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }


        return serviceResponse;
    }


    public async createSubscription(subscriptionToCreate: BaseSubscription): Promise<ServiceResponse<Subscription>> {

        const { name, idCombo } = subscriptionToCreate;

        const serviceResponse: ServiceResponse<Subscription> = {
            sucess: true,
        };

        try {
            const existingProductName = await this.repository.findByComboId(idCombo);

            if (existingProductName != null) {
                serviceResponse.sucess = false;
                serviceResponse.message = 'This combo is already assigned to a subscription';
                return serviceResponse;
            }

            serviceResponse.data = await this.repository.create(name, idCombo);
            return serviceResponse;


        } catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }
        return serviceResponse;
    }


    public async updateSubscription(id: number, subscriptionToCreate: BaseSubscription): Promise<ServiceResponse<Subscription>> {

        const { name, idCombo } = subscriptionToCreate;

        const serviceResponse: ServiceResponse<Subscription> = {
            sucess: true,
        };


        try {
            const existingProduct = await this.repository.findOne(id);
            const existingProductString = JSON.stringify(existingProduct)

            if (existingProductString == '{}' || existingProductString == '[]') {
                serviceResponse.sucess = false;
                serviceResponse.message = "This subscription doesn't exist"
            }
            else {
                await this.repository.update(id, name, idCombo);
                serviceResponse.data = await this.repository.findOne(id);
            }

            return serviceResponse;

        } catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;
    }


    public async deleteSubscription(id: number): Promise<ServiceResponse<Subscription>> {

        const serviceResponse: ServiceResponse<Subscription> = {
            sucess: true,
        };

        try {

            await this.repository.delete(id);
            serviceResponse.message = 'Subscription deleted'

        } catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;
    }


    public async getDetails(id: number): Promise<ServiceResponse<Subscription>> {

        const serviceResponse: ServiceResponse<Subscription> = {
            sucess: true,
        };

        try {

            const existingSubscription = await this.repository.getDetails(id);
            const existingSubscriptionString = JSON.stringify(existingSubscription)

            if (existingSubscriptionString == '{}' || existingSubscriptionString == '[]') {
                serviceResponse.sucess = false;
                serviceResponse.message = "This subscription doesn't exist"
            }
            else {
                serviceResponse.data = existingSubscription
            }

            return serviceResponse;


        } catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }


        return serviceResponse;
    }
}
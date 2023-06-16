import { ServiceResponse } from '@src/domain/models/serviceResponse';
import { ComboItemRepository } from '@src/persistence/repositories/comboItemRepository';
import { BaseComboItem, ComboItem } from '@src/domain/models/comboItem';
import { ComboRepository } from '@src/persistence/repositories/comboRepository';


export class ComboItemService {

    private comboItemRepository: ComboItemRepository;
    private comboRepository: ComboRepository;

    constructor() {
        this.comboItemRepository = new ComboItemRepository();
        this.comboRepository = new ComboRepository();
    }

    public async findAllComboItems(): Promise<ServiceResponse<ComboItem>> {

        const serviceResponse: ServiceResponse<ComboItem> = {
            sucess: true,
        };

        try {
            serviceResponse.data = await this.comboItemRepository.findAll();
            return serviceResponse;
        }

        catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;
    }



    public async findOne(id: number): Promise<ServiceResponse<ComboItem>> {

        const serviceResponse: ServiceResponse<ComboItem> = {
            sucess: true,
        };

        try {
            const existingComboItem = await this.comboItemRepository.findOne(id);
            const existingComboItemString = JSON.stringify(existingComboItem)

            if (existingComboItemString == '{}' || existingComboItemString == '[]') {
                serviceResponse.sucess = false;
                serviceResponse.message = "This combo item doesn't exist"
            }
            else {
                serviceResponse.data = existingComboItem
            }

            return serviceResponse;
        }

        catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;
    }



    public async createComboItem(comboItemToCreate: BaseComboItem): Promise<ServiceResponse<ComboItem>> {

        const { idCombo, idProduct, quantity } = comboItemToCreate;

        const serviceResponse: ServiceResponse<ComboItem> = {
            sucess: true,
        };

        try {
            serviceResponse.data = await this.comboItemRepository.create(idCombo, idProduct, quantity);
            await this.comboRepository.updateComboPrice(idCombo)
            return serviceResponse;
        }

        catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;

    }


    public async updateComboItem(id: number, comboItemToUpdate: BaseComboItem): Promise<ServiceResponse<ComboItem>> {

        const { quantity } = comboItemToUpdate;

        const serviceResponse: ServiceResponse<ComboItem> = {
            sucess: true,
        };

        try {

            const existingComboItem = await this.comboItemRepository.findOne(id);
            const existingComboItemString = JSON.stringify(existingComboItem)

            if (existingComboItemString == '{}' || existingComboItemString == '[]') {
                serviceResponse.sucess = false;
                serviceResponse.message = "This combo doesn't exist"
            }
            else {

                await this.comboItemRepository.updateQuantity(id, quantity);

                const comboId: number = await this.comboItemRepository.getComboId(id);
                await this.comboRepository.updateComboPrice(comboId);

                const updatedCombo = await this.comboItemRepository.findOne(id);
                serviceResponse.data = updatedCombo

            }

            return serviceResponse;
        }

        catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;

    }


    public async deleteComboItem(id: number): Promise<ServiceResponse<ComboItem>> {

        const serviceResponse: ServiceResponse<ComboItem> = {
            sucess: true,
        };

        try {
            const comboId = await this.comboItemRepository.getComboId(id);
            await this.comboItemRepository.delete(id);
            await this.comboRepository.updateComboPrice(comboId);
            serviceResponse.message = 'Combo item deleted'
        }

        catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;

    }
}
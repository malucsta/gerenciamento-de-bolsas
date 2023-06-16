import { BaseCombo, Combo } from '@src/domain/models/combo';
import { ServiceResponse } from '@src/domain/models/serviceResponse';
import { ComboRepository } from '@src/persistence/repositories/comboRepository';


export class ComboService {

    private repository: ComboRepository;

    constructor() {
        this.repository = new ComboRepository();
    }

    public async findAllProducts(): Promise<ServiceResponse<Combo>> {

        const serviceResponse: ServiceResponse<Combo> = {
            sucess: true,
        };

        try {
            serviceResponse.data = await this.repository.findAll();
            return serviceResponse;
        }

        catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;
    }



    public async findOne(id: number): Promise<ServiceResponse<Combo>> {

        const serviceResponse: ServiceResponse<Combo> = {
            sucess: true,
        };

        try {
            const existingCombo = await this.repository.findOne(id);
            const existingComboString = JSON.stringify(existingCombo)

            if (existingComboString == '{}' || existingComboString == '[]') {
                serviceResponse.sucess = false;
                serviceResponse.message = "This combo doesn't exist"
            }
            else {
                serviceResponse.data = existingCombo
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



    public async createCombo(comboToCreate: BaseCombo): Promise<ServiceResponse<Combo>> {

        const { name } = comboToCreate;

        const serviceResponse: ServiceResponse<Combo> = {
            sucess: true,
        };

        try {
            serviceResponse.data = await this.repository.create(name);
            return serviceResponse;
        }

        catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;

    }


    public async updateCombo(id: number, comboToUpdate: BaseCombo): Promise<ServiceResponse<Combo>> {

        const { name } = comboToUpdate;

        const serviceResponse: ServiceResponse<Combo> = {
            sucess: true,
        };

        try {

            const existingCombo = await this.repository.findOne(id);
            const existingComboString = JSON.stringify(existingCombo)

            if (existingComboString == '{}' || existingComboString == '[]') {
                serviceResponse.sucess = false;
                serviceResponse.message = "This combo doesn't exist"
            }
            else {

                await this.repository.update(id, name);
                const updatedCombo = await this.repository.findOne(id);
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


    public async deleteCombo(id: number): Promise<ServiceResponse<Combo>> {

        const serviceResponse: ServiceResponse<Combo> = {
            sucess: true,
        };

        try {
            await this.repository.delete(id);
            serviceResponse.message = 'Combo deleted'
        }

        catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;

    }
}
import { BaseProduct, Product } from '@src/domain/models/product';
import { ServiceResponse } from '../../domain/models/serviceResponse';
import { ProductRepository } from '../../persistence/repositories/productRepository';

export class ProductService {

    private repository: ProductRepository;

    constructor() {
        this.repository = new ProductRepository();
    }

    public async findAllProducts(): Promise<ServiceResponse<Product>> {

        const serviceResponse: ServiceResponse<Product> = {
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



    public async findOne(id: number): Promise<ServiceResponse<Product>> {

        const serviceResponse: ServiceResponse<Product> = {
            sucess: true,
        };

        try {
            const existingProduct = await this.repository.findOne(id);
            const existingProductString = JSON.stringify(existingProduct)

            if (existingProductString == '{}' || existingProductString == '[]') {
                serviceResponse.sucess = false;
                serviceResponse.message = "This product doesn't exist"
            }
            else {
                serviceResponse.data = existingProduct
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



    public async createProduct(productToCreate: BaseProduct): Promise<ServiceResponse<Product>> {

        const { name, price } = productToCreate;

        const serviceResponse: ServiceResponse<Product> = {
            sucess: true,
        };

        try {
            serviceResponse.data = await this.repository.create(name, price);

            return serviceResponse;
        }

        catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;

    }


    public async updateProduct(id: number, productToUpdate: BaseProduct): Promise<ServiceResponse<Product>> {

        const { name, price } = productToUpdate;

        const serviceResponse: ServiceResponse<Product> = {
            sucess: true,
        };

        try {

            const existingProduct = await this.repository.findOne(id);
            const existingProductString = JSON.stringify(existingProduct)

            if (existingProductString == '{}' || existingProductString == '[]') {
                serviceResponse.sucess = false;
                serviceResponse.message = "This product doesn't exist"
            }
            else {

                await this.repository.update(id, name, price);
                serviceResponse.data = await this.repository.findOne(id);
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


    public async deleteProduct(id: number): Promise<ServiceResponse<Product>> {

        const serviceResponse: ServiceResponse<Product> = {
            sucess: true,
        };

        try {
            await this.repository.delete(id);
            serviceResponse.message = 'Product deleted'
        }

        catch (error) {
            serviceResponse.sucess = false;
            serviceResponse.message = 'Unknown Error'
            if (error instanceof Error) serviceResponse.message = error.message
        }

        return serviceResponse;

    }
}
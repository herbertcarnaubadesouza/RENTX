import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
    car_id: string;
    specifications_id: string[];
}


@injectable()
class CreateCarSpecificationUseCase{

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository
    ){}

    async execute({car_id, specifications_id} : IRequest) : Promise<Car>{

        const carsExists = await this.carsRepository.findById(car_id);


        if(!carsExists){
            throw new AppError("Car does no exists");
        }

        const specifications = await this.specificationsRepository.findByIds(
            specifications_id
        );


        carsExists.specifications = specifications;

        await this.carsRepository.create(carsExists);

        return carsExists;
    }
}



export {CreateCarSpecificationUseCase}
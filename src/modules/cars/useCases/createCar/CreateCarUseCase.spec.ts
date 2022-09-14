import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    })

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            licence_plate: "ABC -1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });


        expect(car).toHaveProperty("id");
    })

    it("Should not be able to create a car with exists licence plate", async () => {
        
        await createCarUseCase.execute({
            name: "Car1",
            description: "Description Car",
            daily_rate: 100,
            licence_plate: "ABC -1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });
        
        await expect(createCarUseCase.execute({
                name: "Car2",
                description: "Description Car",
                daily_rate: 100,
                licence_plate: "ABC -1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            })
        ).rejects.toEqual(new AppError("Car already exists!"));
    })

    it("Should be able to create a car with available true by default", async () => {

        const car = await createCarUseCase.execute({
            name: "Car Available",
            description: "Description Car",
            daily_rate: 100,
            licence_plate: "ABCD -1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        expect(car.available).toBe(true);

    })
})
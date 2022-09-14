
import dayjs from "dayjs";

import { AppError } from "@errors/AppError";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DaysjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";



let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory : RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsProvider: DayjsDateProvider;


describe("Create Rental", () => {

    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayJsProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsProvider,
            carsRepositoryInMemory);
    });



    it("should be able to create a new rental", async () => {


        const car = await carsRepositoryInMemory.create({
            brand: "brand",
            category_id: "1234",
            daily_rate: 100,
            description: "Car Test",
            fine_amount: 40,
            licence_plate: "test",
            name: "Test",            
        })


        const rental = await createRentalUseCase.execute({ 
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });        

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");

    }) ;


    it("should not be able to create a new rental if there is another open to the same user", async () => {

        await rentalsRepositoryInMemory.create({
            car_id: "1111",
            expected_return_date: dayAdd24Hours,
            user_id: "12345"
        })
        
        await expect(createRentalUseCase.execute({ 
                user_id: "12345",
                car_id: "12345",
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("There is a rental in progress for user!"));
     
    });


    it("should not be able to create a new rental if there is another open to the same car", async () => {

        await rentalsRepositoryInMemory.create({
            car_id: "test",
            user_id: "12345",
            expected_return_date: dayAdd24Hours,
        });
        
        await expect(createRentalUseCase.execute({ 
              user_id: "12345",
              car_id: "test",
              expected_return_date: dayAdd24Hours
          })
        ).rejects.toEqual(new AppError("Car is unavailable"));
       
  
    });

    it("should not be able to create a new rental with invalid return time", async () => {

        
        await expect(createRentalUseCase.execute({ 
              user_id: "12345",
              car_id: "test",
              expected_return_date: dayjs().toDate()
          })
         
        ).rejects.toEqual(new AppError("Invalid return time!"));
       
  
    });

});
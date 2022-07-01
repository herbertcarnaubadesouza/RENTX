
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

        const rental = await createRentalUseCase.execute({ 
            user_id: "12345",
            car_id: "12345",
            expected_return_date: dayAdd24Hours
        });        

        expect(rental).toHaveProperty("id");

    }) ;


    it("should not be able to create a new rental if there is another open to the same user", async () => {

        
      expect(async () => {
        await createRentalUseCase.execute({ 
            user_id: "12345",
            car_id: "12345",
            expected_return_date: dayAdd24Hours
        });
        
        await createRentalUseCase.execute({ 
            user_id: "12345",
            car_id: "12345",
            expected_return_date: dayAdd24Hours
        });
      }).rejects.toBeInstanceOf(AppError);
     

    }) ;


    it("should not be able to create a new rental if there is another open to the same car", async () => {

        
        expect(async () => {
          await createRentalUseCase.execute({ 
              user_id: "123",
              car_id: "test",
              expected_return_date: dayAdd24Hours
          });
          
          await createRentalUseCase.execute({ 
              user_id: "321",
              car_id: "test",
              expected_return_date: dayAdd24Hours
          });
        }).rejects.toBeInstanceOf(AppError);
       
  
    });

    it("should not be able to create a new rental with invalid return time", async () => {

        
        expect(async () => {
          await createRentalUseCase.execute({ 
              user_id: "123",
              car_id: "test",
              expected_return_date: dayjs().toDate()
          });
         
        }).rejects.toBeInstanceOf(AppError);
       
  
    });

});
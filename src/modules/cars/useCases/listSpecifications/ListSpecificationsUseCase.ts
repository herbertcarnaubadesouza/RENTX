import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ListSpecificationsUseCase {

    constructor(
        @inject("SpecificationRepository")
        private SpecificationRepository: ISpecificationRepository) { }


    async execute(): Promise<Specification[]> {
        // #swagger.tags = ['List Users']
        const specifications = await this.SpecificationRepository.list();

        return specifications;
    }
}


export { ListSpecificationsUseCase }
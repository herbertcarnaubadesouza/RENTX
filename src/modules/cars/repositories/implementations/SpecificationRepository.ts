import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";



class SpecificationRepository implements ISpecificationRepository {

    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {

        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    };


    async findByName(name: string): Promise<Specification | undefined> {

        const category = await this.repository.findOne({ name });

        return category;

    };

    async list(): Promise<Specification[]> {
        // #swagger.tags = ['List Users']
        const specifications = await this.repository.find();

        return specifications;
    }

}

export { SpecificationRepository }
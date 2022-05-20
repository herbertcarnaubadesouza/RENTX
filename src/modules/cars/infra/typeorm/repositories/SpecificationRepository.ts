import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../../../repositories/ISpecificationRepository";



class SpecificationRepository implements ISpecificationRepository {

    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {

        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);

        return specification;
    };


    async findByName(name: string): Promise<Specification | undefined> {

        const specification = await this.repository.findOne({ name });

        return specification;

    };

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();

        return specifications;
    }


    async findByIds(ids: string[]): Promise<Specification[]> {
        return await this.repository.findByIds(ids);
    }


}

export { SpecificationRepository }
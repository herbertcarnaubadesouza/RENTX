import fs from "fs";
import { parse as csvParse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {

    private categoriesRepository: ICategoriesRepository

    constructor(categoriesRepository: ICategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    loadCategories(file: Express.Multer.File | undefined): Promise<IImportCategory[]> {

        return new Promise((resolve, reject) => {
            const filePath = file?.path ? file.path : "";

            const categories: IImportCategory[] = [];

            const stream = fs.createReadStream(filePath);

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file?.path ? file.path : "");
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File | undefined): Promise<void> {

        const categories = await this.loadCategories(file);

        categories.map(async category => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description
                });
            }

        });
    }

}


export { ImportCategoryUseCase }
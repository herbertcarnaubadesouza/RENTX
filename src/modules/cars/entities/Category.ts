import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("categories")
class Category {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string | undefined;

    @Column()
    description: string | undefined;

    @CreateDateColumn()
    created_at: Date | undefined;

    constructor() {
        if (!this.id) {
            this.id = uuidv4()
        }
    }
}

export { Category };
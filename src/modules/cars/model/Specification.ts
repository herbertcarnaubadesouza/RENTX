import { v4 as uuidv4 } from "uuid";


class Specification {

    id?: string | undefined;

    name: string | undefined;

    description: string | undefined;

    created_at: Date | undefined;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }


}


export { Specification }


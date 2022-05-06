import fs from "fs";

export const deleteFile = async (filename: string) => {

    try {
        //verifica se o arquivo existe
        await fs.promises.stat(filename);
    } catch {
        return;
    }

    //remove o arquivo de acordo com o nome do arquivo
    await fs.promises.unlink(filename);

}
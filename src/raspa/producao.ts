import { PDFGenerator } from "../pdfgenerator/index";

export const producao: any = async (
    _event: any,
    _context: any,
): Promise<any> => {
   
    
    const response = await PDFGenerator.getPDF(_event);
    return response;
};
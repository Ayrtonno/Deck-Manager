//myMiddleware è una funziona asincrona che prende 3 parametri (req, req e next)
//async = non risolta immediatamente
import { Request, Response, NextFunction } from "express"
export const myMiddleware = async (req: Request , res: Response, next: NextFunction) => {
    const start = new Date();
    console.log("Called my middleware");
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    //await next() aspetta che la richiesta venga soddisfatta. Next sarebbe la prossima richiesta.
    const end = new Date();
    const elapsed = end.getTime() - start.getTime();
    res.append("X-ELAPSED-TIME", `${elapsed} ms`);
    //    console.log(elapsed);
    await next();
    console.log("Served request");
};


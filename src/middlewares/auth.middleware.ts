import { Request, Response, NextFunction } from "express";


export const authenticateApiKey = async (req: Request, res: Response, next: NextFunction) => {
  console.log("API key authenticated successfully");
  next();
};


import { Request, Response } from 'express';

export const healthCheck = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'This API Service is Running!!' });
};

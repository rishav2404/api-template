import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ status: 'SUCCESS', message: 'User created successfully' });
  } catch (err: any) {
    return res.status(400).json({ status: 'FAILURE', error: err.message });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ status: 'SUCCESS', message: 'User fetched successfully' });
  } catch (err: any) {
    return res.status(400).json({ status: 'FAILURE', error: err.message });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ status: 'SUCCESS', message: 'User updated successfully' });
  } catch (err: any) {
    return res.status(400).json({ status: 'FAILURE', error: err.message });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ status: 'SUCCESS', message: 'User deleted successfully' });
  } catch (err: any) {
    return res.status(400).json({ status: 'FAILURE', error: err.message });
  }
};


import { Request, Response } from 'express';
import { signupUser, loginUser, getUserProfile } from '../services/userService';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user = await signupUser(name, email, password);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('User ID from Token:', (req as any).userId); // Debugging

    const userId = (req as any).userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized access. No user ID found.' });
      return;
    }

    const user = await getUserProfile(userId);
    console.log('Fetched User:', user); // Debugging

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(500).json({ error: (error as Error).message });
  }
};

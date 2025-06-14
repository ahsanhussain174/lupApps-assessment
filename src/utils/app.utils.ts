import { Request, Response, NextFunction } from 'express';
import axios from "axios";

const { MONDAY_API_TOKEN, MODAY_URL } = process.env;

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); 
  };
};

export const postToMonday = async (query: string) => {
  if (!MONDAY_API_TOKEN || !MODAY_URL) {
    throw new Error("Missing MONDAY_API_TOKEN or MODAY_URL in environment variables");
  }

  return await axios.post(
    MODAY_URL,
    { query },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: MONDAY_API_TOKEN,
      },
    }
  );
};

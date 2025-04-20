import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
    response: string;
};
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>): void;
export {};

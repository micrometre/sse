import type { NextApiRequest, NextApiResponse } from "next";
import EventEmitter from "events";

export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const stream = new EventEmitter();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  let counter = 0;
  let count = 1;

  const interval = setInterval(() => {
    res.write(
      `data: ${JSON.stringify({
        message: 'hello',
        value: (count += 1),
      })}\n\n`
    );
  }, 1000);

  res.on('close', () => {
    console.log(`close ${count}`);
    clearInterval(interval);
    res.end();
  });

  res.socket?.on('close', () => {
    console.log(`close ${count}`);
    clearInterval(interval);
    res.end();
  });
}
import { z } from 'zod';

export const Translate = z.object({
  culture: z.string(),
  text: z.string(),
});

export type Translate = z.infer<typeof Translate>;

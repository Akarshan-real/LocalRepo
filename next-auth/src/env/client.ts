import { z } from "zod";

const getEnv = <T extends string>(...keys: T[]) => {
  const shape = {} as Record<T, z.ZodString>;

  keys.forEach((key) => {
    shape[key] = z.string().min(1);
  });

  return z.object(shape).parse(process.env);
};

export default getEnv(
);
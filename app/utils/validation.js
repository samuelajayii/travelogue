import { z } from "zod";

const postFormSchema = z.object({
  title: z.string().min(3).max(100),
  destination: z.string().min(3).max(20),
  date: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    "Invalid date format"
  ),
});

export default postFormSchema;

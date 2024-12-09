import { z } from "zod";

const postFormSchema = z.object({
  title: z.string().min(3).max(100),
  location: z.string().min(3).max(20),
  selectedDate: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    "Invalid date format"
  ),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.type.startsWith("image/"), "Uploaded file must be an image"),
  content: z.string().min(20, "Content is required")
});

export default postFormSchema;

// Utility to extract Zod validation errors into a flat field‑error map
// Returns true when the data passes validation, otherwise false and updates the form error state.
import type { ZodSchema } from "zod";

export async function validateForm<T>(
  schema: ZodSchema<T>,
  data: T,
  setFormErrors: (errors: Record<string, string>) => void
): Promise<boolean> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      if (err.path && err.path.length > 0) {
        fieldErrors[err.path[0] as string] = err.message;
      }
    });
    setFormErrors(fieldErrors);
    return false;
  }
  setFormErrors({});
  return true;
}

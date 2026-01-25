import z from "zod";
export const academicSemesterSchema = z.object({
  name: z.string({ error: "Name is required" }),
  year: z.string({ error: "Year is required" }),
  startMonth: z.string({ error: "Start Month is required" }),
  endMonth: z.string({ error: "End Month is required" }),
});

export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, "Name is required"),
});

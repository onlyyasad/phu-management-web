import z from "zod";
export const semesterRegistrationSchema = z.object({
  academicSemester: z.string({ error: "Academic Semester is required" }),
  status: z.string({ error: "Status is required" }),
  startDate: z.string({ error: "Start Date is required" }),
  endDate: z.string({ error: "End Date is required" }),
  minCredit: z.number({ error: "Min Credit is required" }),
  maxCredit: z.number({ error: "Max Credit is required" }),
});

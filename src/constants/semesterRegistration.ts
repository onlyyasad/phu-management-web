export const SemesterRegistrationStatus = [
  'UPCOMING',
  'ONGOING',
  'ENDED',
] as const;

export const semesterRegistrationStatusOptions = SemesterRegistrationStatus.map((status) => ({
  label: status.charAt(0) + status.slice(1).toLowerCase(),
  value: status,
}));
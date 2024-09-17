export type Scheine = {
  patientId: number;
  doctorId: number;
  templateId: number;
  scheineTypeId: number;
  attributes: Record<string, string | boolean>;
};

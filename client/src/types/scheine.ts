export type Scheine = {
  patientId: number;
  doctorId: number;
  templateId: number;
  scheinTypeId: number;
  attributes: Record<string, string>;
};

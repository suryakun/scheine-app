export type Scheine = {
  patientId: number;
  doctorId: number;
  typeId: number;
  attributes: Record<string, string | boolean>;
};

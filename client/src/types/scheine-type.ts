export type ScheineType = {
  id?: number;
  name: string;
  description?: string;
  attributeDefinitions: AttributeDefinition[];
};

export type AttributeDefinition = {
  key: string;
  label: string;
  type: string;
  desription: string;
};

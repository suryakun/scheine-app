import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedScheineTypes1686000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Clear existing data
    await queryRunner.query(`TRUNCATE TABLE attribute_definition CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE scheine_type CASCADE`);

    // Insert ScheinTypes
    await queryRunner.query(`
            INSERT INTO scheine_type (name, description) VALUES
            ('Musstersammlung', 'Type')
        `);

    // Insert AttributeDefinitions
    await queryRunner.query(`
            INSERT INTO attribute_definition (key, type, "scheineTypeId", label)
            VALUES
            ('Kostenträgerkennung', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Versicherten-Nr.', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Status', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Betriebsstätten-Nr.', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Arzt-Nr.', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Datum.', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Diagnose.', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Belegarzt- behandlung.', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Notfall.', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Unfall, Unfallfolgen', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Versorgungs- leiden (BVG)', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Nächsterreichbare, geeignete Krankenhäuser', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), ''),
            ('Vertragsarztstempel / Unterschrift des Arztes', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), '')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove all seeded data
    await queryRunner.query(`TRUNCATE TABLE attribute_definition CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE scheine_type CASCADE`);
  }
}

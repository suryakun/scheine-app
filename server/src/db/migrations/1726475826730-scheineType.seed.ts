import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SeedScheineTypes1686000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Clear existing data
    await queryRunner.query(`TRUNCATE TABLE template CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE attribute_definitions CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE scheine_type CASCADE`);

    // Insert ScheinTypes
    await queryRunner.query(`
            INSERT INTO scheine_type (name, description) VALUES
            ('Musstersammlung', 'Type')
        `);

    // Insert AttributeDefinitions
    await queryRunner.query(`
      INSERT INTO attribute_definitions (label, type, "scheineTypeId", key)
        VALUES
        ('Name, Vorname des Versicherten', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'name'),
        ('geb. am', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'birthday'),
        ('Krankenkasse bzw. Kostenträger', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'krankenkasse_kostentraeger'),
        ('Kostenträgerkennung', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'kostentraegerkennung'),
        ('Versicherten-Nr.', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'versicherten_nr'),
        ('Status', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'status'),
        ('Betriebsstätten-Nr.', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'betriebsstaetten_nr'),
        ('Arzt-Nr.', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'arzt_nr'),
        ('Datum', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'datum'),
        ('Diagnose', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'diagnose'),
        ('Belegarzt- behandlung', 'checkbox', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'belegarzt_behandlung'),
        ('Notfall', 'checkbox', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'notfall'),
        ('Unfall, Unfallfolgen', 'checkbox', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'unfall_unfallfolgen'),
        ('Versorgungs- leiden (BVG)', 'checkbox', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'versorgungs_leiden_bvg'),
        ('Nächsterreichbare, geeignete Krankenhäuser', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'naechstereichbare_krankenhaeuser'),
        ('Vertragsarztstempel / Unterschrift des Arztes', 'text', (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'), 'vertragsarztstempel_unterschrift_arzt');
      `);

    const templatePath = path.resolve(
      __dirname,
      '../../templates/Musstersammlung/default.handlebars',
    );
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    await queryRunner.query(
      `
      INSERT INTO template (name, "pdfTemplate", "scheineTypeId") VALUES
      ('default', $1, (SELECT id FROM scheine_type WHERE name = 'Musstersammlung'))
    `,
      [templateContent],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove all seeded data
    await queryRunner.query(`TRUNCATE TABLE template CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE attribute_definitions CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE scheine_type CASCADE`);
  }
}

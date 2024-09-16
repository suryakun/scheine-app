import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionLabel1726475826720 implements MigrationInterface {
    name = 'AddDescriptionLabel1726475826720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attribute_definitions" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attribute_definitions" DROP COLUMN "description"`);
    }

}

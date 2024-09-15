import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelationDefinition1726386964523 implements MigrationInterface {
    name = 'FixRelationDefinition1726386964523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attribute_definition" ADD "scheineAttributeId" integer`);
        await queryRunner.query(`ALTER TABLE "attribute_definition" ADD CONSTRAINT "UQ_d5c2929d39a72dc1c6427c29181" UNIQUE ("scheineAttributeId")`);
        await queryRunner.query(`ALTER TABLE "scheine_attribute" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "attribute_definition" ADD CONSTRAINT "FK_d5c2929d39a72dc1c6427c29181" FOREIGN KEY ("scheineAttributeId") REFERENCES "scheine_attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attribute_definition" DROP CONSTRAINT "FK_d5c2929d39a72dc1c6427c29181"`);
        await queryRunner.query(`ALTER TABLE "scheine_attribute" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "attribute_definition" DROP CONSTRAINT "UQ_d5c2929d39a72dc1c6427c29181"`);
        await queryRunner.query(`ALTER TABLE "attribute_definition" DROP COLUMN "scheineAttributeId"`);
    }

}

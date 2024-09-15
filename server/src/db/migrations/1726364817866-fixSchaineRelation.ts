import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSchaineRelation1726364817866 implements MigrationInterface {
    name = 'FixSchaineRelation1726364817866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scheine" DROP CONSTRAINT "FK_c905abd4044907861d06dc5b8be"`);
        await queryRunner.query(`ALTER TABLE "scheine" RENAME COLUMN "scheineTypeId" TO "typeId"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "first_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "last_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scheine" ADD CONSTRAINT "FK_780060cc43b07c0a238b3e4574f" FOREIGN KEY ("typeId") REFERENCES "scheine_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scheine" DROP CONSTRAINT "FK_780060cc43b07c0a238b3e4574f"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scheine" RENAME COLUMN "typeId" TO "scheineTypeId"`);
        await queryRunner.query(`ALTER TABLE "scheine" ADD CONSTRAINT "FK_c905abd4044907861d06dc5b8be" FOREIGN KEY ("scheineTypeId") REFERENCES "scheine_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

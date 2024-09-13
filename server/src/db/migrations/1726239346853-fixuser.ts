import { MigrationInterface, QueryRunner } from "typeorm";

export class Fixuser1726239346853 implements MigrationInterface {
    name = 'Fixuser1726239346853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "insurance" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "insurance"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(255) NOT NULL`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDoctorNumber1726628195966 implements MigrationInterface {
    name = 'AddDoctorNumber1726628195966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor" ADD "doctor_number" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "doctor_number"`);
    }

}

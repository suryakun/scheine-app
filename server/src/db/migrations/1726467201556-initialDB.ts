import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDB1726467201556 implements MigrationInterface {
    name = 'InitialDB1726467201556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doctor" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "specialization" character varying(255) NOT NULL, CONSTRAINT "UQ_bf6303ac911efaab681dc911f54" UNIQUE ("email"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute_definition" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "key" character varying NOT NULL, "label" character varying NOT NULL, "type" character varying NOT NULL, "scheineTypeId" integer, CONSTRAINT "PK_61646231ed67b6bbac84af684e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_99855c3478a04a9a988070fcc2" ON "attribute_definition" ("scheineTypeId", "key") `);
        await queryRunner.query(`CREATE TABLE "scheine_type" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_39e6b69ede740b7b071ef685b4b" UNIQUE ("name"), CONSTRAINT "PK_f13030762f9447c7ac58d54f802" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "template" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "pdfTemplate" text NOT NULL, "scheineTypeId" integer, CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "scheine" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "attributes" text NOT NULL, "pdfUrl" text, "patientId" integer, "doctorId" integer, "templateId" integer, "typeId" integer, CONSTRAINT "PK_a6d08effa21fa1d7e3c3f8fd037" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7e24f18ea8ad27dc71124afcac" ON "scheine" ("patientId", "doctorId", "templateId") `);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "insurance" character varying(255) NOT NULL, "birthday" date NOT NULL, "address" character varying(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attribute_definition" ADD CONSTRAINT "FK_f1bb774571793a6c5843af86c59" FOREIGN KEY ("scheineTypeId") REFERENCES "scheine_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "template" ADD CONSTRAINT "FK_46a4cf01f32abd505d2ce95fafc" FOREIGN KEY ("scheineTypeId") REFERENCES "scheine_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scheine" ADD CONSTRAINT "FK_c8ae33ea816b4a8882dce4f1507" FOREIGN KEY ("patientId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scheine" ADD CONSTRAINT "FK_80cf22ed8e593e2d912008d8ba4" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scheine" ADD CONSTRAINT "FK_947380f1733454d4fd1bf5cda8f" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scheine" ADD CONSTRAINT "FK_780060cc43b07c0a238b3e4574f" FOREIGN KEY ("typeId") REFERENCES "scheine_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scheine" DROP CONSTRAINT "FK_780060cc43b07c0a238b3e4574f"`);
        await queryRunner.query(`ALTER TABLE "scheine" DROP CONSTRAINT "FK_947380f1733454d4fd1bf5cda8f"`);
        await queryRunner.query(`ALTER TABLE "scheine" DROP CONSTRAINT "FK_80cf22ed8e593e2d912008d8ba4"`);
        await queryRunner.query(`ALTER TABLE "scheine" DROP CONSTRAINT "FK_c8ae33ea816b4a8882dce4f1507"`);
        await queryRunner.query(`ALTER TABLE "template" DROP CONSTRAINT "FK_46a4cf01f32abd505d2ce95fafc"`);
        await queryRunner.query(`ALTER TABLE "attribute_definition" DROP CONSTRAINT "FK_f1bb774571793a6c5843af86c59"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e24f18ea8ad27dc71124afcac"`);
        await queryRunner.query(`DROP TABLE "scheine"`);
        await queryRunner.query(`DROP TABLE "template"`);
        await queryRunner.query(`DROP TABLE "scheine_type"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99855c3478a04a9a988070fcc2"`);
        await queryRunner.query(`DROP TABLE "attribute_definition"`);
        await queryRunner.query(`DROP TABLE "doctor"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Relations1726070425137 implements MigrationInterface {
    name = 'Relations1726070425137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "birthday" date NOT NULL, "address" character varying(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctor" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "specialization" character varying(255) NOT NULL, CONSTRAINT "UQ_bf6303ac911efaab681dc911f54" UNIQUE ("email"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schein" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "pdfUrl" text, "patientId" integer, "doctorId" integer, "templateId" integer, CONSTRAINT "PK_cfb5084a1c9f8ee3bdcb2ced519" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schein_attribute" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "value" text NOT NULL, "scheinId" integer, CONSTRAINT "PK_f464f1872ff778a38a6e4b8b571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute_definition" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "key" character varying NOT NULL, "label" character varying NOT NULL, "type" character varying NOT NULL, "options" text, "scheineTypeId" integer, CONSTRAINT "PK_61646231ed67b6bbac84af684e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "scheine_type" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_39e6b69ede740b7b071ef685b4b" UNIQUE ("name"), CONSTRAINT "PK_f13030762f9447c7ac58d54f802" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "template" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "pdfTemplate" text NOT NULL, "scheineTypeId" integer, CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schein" ADD CONSTRAINT "FK_ecc9e2fcd75c4fd1556ffec72d5" FOREIGN KEY ("patientId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schein" ADD CONSTRAINT "FK_c84a8c92a573e1bd48bdfcf4d6f" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schein" ADD CONSTRAINT "FK_abe5501a66bc3e75d5ed34a3bb0" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schein_attribute" ADD CONSTRAINT "FK_1349d885332641087361afb3907" FOREIGN KEY ("scheinId") REFERENCES "schein"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attribute_definition" ADD CONSTRAINT "FK_f1bb774571793a6c5843af86c59" FOREIGN KEY ("scheineTypeId") REFERENCES "scheine_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "template" ADD CONSTRAINT "FK_46a4cf01f32abd505d2ce95fafc" FOREIGN KEY ("scheineTypeId") REFERENCES "scheine_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" DROP CONSTRAINT "FK_46a4cf01f32abd505d2ce95fafc"`);
        await queryRunner.query(`ALTER TABLE "attribute_definition" DROP CONSTRAINT "FK_f1bb774571793a6c5843af86c59"`);
        await queryRunner.query(`ALTER TABLE "schein_attribute" DROP CONSTRAINT "FK_1349d885332641087361afb3907"`);
        await queryRunner.query(`ALTER TABLE "schein" DROP CONSTRAINT "FK_abe5501a66bc3e75d5ed34a3bb0"`);
        await queryRunner.query(`ALTER TABLE "schein" DROP CONSTRAINT "FK_c84a8c92a573e1bd48bdfcf4d6f"`);
        await queryRunner.query(`ALTER TABLE "schein" DROP CONSTRAINT "FK_ecc9e2fcd75c4fd1556ffec72d5"`);
        await queryRunner.query(`DROP TABLE "template"`);
        await queryRunner.query(`DROP TABLE "scheine_type"`);
        await queryRunner.query(`DROP TABLE "attribute_definition"`);
        await queryRunner.query(`DROP TABLE "schein_attribute"`);
        await queryRunner.query(`DROP TABLE "schein"`);
        await queryRunner.query(`DROP TABLE "doctor"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import { templateService } from './templateService';
import { CreateScheineDto } from '../types/scheine.dto';

export const pdfService = {
  async generatePdf(scheine: CreateScheineDto): Promise<Buffer> {
    const template = await templateService.getTemplateBySchieneTypeId(scheine.typeId);

    if (!template) {
      throw new Error('Template not found');
    }

    const compiledTemplate = Handlebars.compile(template.pdfTemplate);
    const renderedHtml = compiledTemplate(scheine.attributes);

    const browser = await puppeteer.launch({
      headless: 'shell',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      timeout: 300000, // Increase timeout to 60 seconds
    });
    const page = await browser.newPage();
    await page.setContent(renderedHtml, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    return Buffer.from(pdf);
  },
};

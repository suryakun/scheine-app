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
      executablePath: '/usr/bin/google-chrome',
      defaultViewport: null,
      ignoreDefaultArgs: ['--enable-automation'],
      args: [
        '--disable-infobars',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
      ],
      timeout: 30_000, // 30 seconds
      protocolTimeout: 60_000, // 60 seconds
    });

    const page = await browser.newPage();
    await page.setContent(renderedHtml, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    return Buffer.from(pdf);
  },
};
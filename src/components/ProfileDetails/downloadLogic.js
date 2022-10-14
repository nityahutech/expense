import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";

const RATE = 2.83464566929;

const PAGE_WIDTH = 297 * RATE;
const PAGE_HEIGHT = 419 * RATE;

const CONTENT_WIDTH = 297 * RATE;
const CONTENT_HEIGHT = 419 * RATE;
const PAGE_MARGINS = [5 * RATE, 30 * RATE];
const FONT_SIZE = 14 * RATE;

export async function createPdfFromHtml(element) {
  console.log("element:: ", element.innerHTML);
  const pdfProps = await createPdfProps(element);
  createPdf(pdfProps);
}

async function createPdfProps(element) {
  const options = {
    scale: 2,
  };
  const canvas = await html2canvas(element, options);
  const dataUrl = canvas.toDataURL();

  const pdfProps = {
    dataUrl,
    pageSize: {
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
    },
    pageOrientation: "PORTRAIT",
    contentSize: {
      width: CONTENT_WIDTH,
      height: CONTENT_HEIGHT,
    },
    pageMargins: PAGE_MARGINS,
    fontSize: FONT_SIZE,
  };

  return pdfProps;
}

function createPdf(pdfProps) {
  const { dataUrl, contentSize, pageMargins, fontSize } = pdfProps;
  const pageSize = pdfProps.pageSize;
  const pageOrientation = pdfProps.pageOrientation;

  const documentDefinitions = {
    pageSize,
    pageOrientation,
    content: {
      image: dataUrl,
      ...contentSize,
    },
    pageMargins,
    fontSize,
  };

  pdfMake.createPdf(documentDefinitions).download();
}

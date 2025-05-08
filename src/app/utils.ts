import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Utility: Convert number to words (Indian currency format)
export function numberToWords(n: number): string {
    const a = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
        "Seventeen", "Eighteen", "Nineteen",
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const numToWords = (num: number): string => {
        if ((num = Math.floor(num)) === 0) return "Zero";
        let str = "";

        const crore = Math.floor(num / 10000000);
        num %= 10000000;
        if (crore) str += numToWords(crore) + " Crore ";

        const lakh = Math.floor(num / 100000);
        num %= 100000;
        if (lakh) str += numToWords(lakh) + " Lakh ";

        const thousand = Math.floor(num / 1000);
        num %= 1000;
        if (thousand) str += numToWords(thousand) + " Thousand ";

        const hundred = Math.floor(num / 100);
        num %= 100;
        if (hundred) str += numToWords(hundred) + " Hundred ";

        if (num > 0) {
            if (str !== "") str += "and ";
            str += num < 20 ? a[num] : b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
        }

        return str.trim();
    };

    return numToWords(n) + " Rupees Only";
}


export const handleExportToPDF = async (element: HTMLDivElement | null) => {
    if (!element) return;

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
};

export const printInvoice = (element: HTMLDivElement | null) => {
    if (!element) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice PDF</title>
          <style>
            ${document.querySelector("style")?.innerHTML || ""}
          </style>
        </head>
        <body>
          ${element.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load before printing
    printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
    };
};

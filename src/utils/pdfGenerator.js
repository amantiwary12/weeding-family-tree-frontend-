// 📄 src/utils/pdfGenerator.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (element, fileName, backgroundColor = '#ffffff') => {
  if (!element) {
    alert('Element not found for download');
    return false;
  }

  // Hide delete buttons
  const deleteButtons = element.querySelectorAll('button');
  deleteButtons.forEach(button => {
    if (button.textContent.includes('Delete') || button.textContent.includes('🗑️')) {
      button.style.display = 'none';
    }
  });

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: backgroundColor,
    });

    // Restore delete buttons
    deleteButtons.forEach(button => {
      if (button.textContent.includes('Delete') || button.textContent.includes('🗑️')) {
        button.style.display = '';
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
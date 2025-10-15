// 📄 src/components/DownloadPDFButton.jsx
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function DownloadPDFButton({ targetId, fileName }) {
  const handleDownload = async () => {
    const element = document.getElementById(targetId);
    if (!element) return alert("Tree not found");

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);
    pdf.save(fileName);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-md shadow"
    >
      Download
    </button>
  );
}

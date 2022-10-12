const generatePDF = (data, name) => {
    window.jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF();
    data.forEach((element, index) => {
        doc.text(element, 10, 10 * (index+1));
    });

    doc.save(name);
};

export { generatePDF };
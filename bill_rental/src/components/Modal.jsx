import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Modal.css';

const Modal = ({ content, onClose }) => {
  const [othersExplanation, setOthersExplanation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // SECTION 1: Rent + Electricity
  const [sectionOne, setSectionOne] = useState({
    rent: 0,
    electricity: 0,   // This will store calculated electricity bill
  });

  // Electricity calculation fields
  const [electricityInputs, setElectricityInputs] = useState({
    current: 0,
    previous: 0,
    rate: 0,
  });

  // SECTION 2: Water + Others
  const [sectionTwo, setSectionTwo] = useState({
    water: 0,
    others: 0,
  });

  // Handle Section 1 normal inputs (rent only)
  const handleSectionOneChange = (e) => {
    const { name, value } = e.target;
    setSectionOne((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  // Handle Section 2 inputs
  const handleSectionTwoChange = (e) => {
    const { name, value } = e.target;
    setSectionTwo((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  // Handle electricity inputs
  const handleElectricityInput = (e) => {
    const { name, value } = e.target;
    setElectricityInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  // Auto-calculate electricity bill whenever inputs change
  useEffect(() => {
    const { current, previous, rate } = electricityInputs;
    const units = Math.max(current - previous, 0); // avoid negative
    const bill = units * rate;

     // Reset error first
    setErrorMessage("");

    setSectionOne((prev) => ({
      ...prev,
      electricity: bill,
    }));
  }, [electricityInputs]);

  // Total calculation
  const calculateTotal = () => {
    const sectionOneTotal = Object.values(sectionOne).reduce((a, b) => a + b, 0);
    const sectionTwoTotal = Object.values(sectionTwo).reduce((a, b) => a + b, 0);
    return sectionOneTotal + sectionTwoTotal;
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Bill Summary', 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
// Electricity calculation values
  const curr = electricityInputs.current;
  const prev = electricityInputs.previous;
  const r = electricityInputs.rate;

  const units = Math.max(curr - prev, 0);
  const total = sectionOne.electricity;

  // Table
  doc.autoTable({
    startY: 40,
    head: [['Description', 'Amount']],
    body: [
      ['Rent', sectionOne.rent],
      ['Electricity', sectionOne.electricity],
      ['Water', sectionTwo.water],
      ['Others', sectionTwo.others],
      ['Total', calculateTotal()],
    ],
  });

  // Position after table
  let finalY = doc.lastAutoTable.finalY + 10;

  // EXACT text block requested
  const electricityText =[
  "Electricity Bill Calculation",
  "-------------------------------------",
  "",
  `Previous Reading : ${prev}`,
  `Current Reading  : ${curr}`,
  "",
  "Total Units = Current - Previous",
  `            = ${curr} - ${prev}`,
  `            = ${units}`,
  "",
  
  "",
  "Total Amount = Units × Rate",
  `             = ${units} × ${r}`,
  `             = ${total}`
];

  doc.setFont("courier", "normal"); // mono font keeps alignment perfect
  doc.setFontSize(12);
  // Print line-by-line for perfect spacing
let y = finalY;
electricityText.forEach(line => {
  doc.text(line, 14, y);
  y += 7;  // perfect line spacing
});

    if (othersExplanation.trim() !== "") {
    const othersText = `
  Others Calculation
  -------------------------------------

  ${othersExplanation}
  `;

    doc.text(othersText, 14, finalY);
  }
    const date = new Date();
    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];
    const previousMonth = monthNames[(date.getMonth() - 1 + 12) % 12];
    const year = date.getFullYear();

    doc.save(`${previousMonth}${year}.pdf`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>

        <div className="text-black">
          {content}
          <h3>Value Calculation</h3>

          {/* SECTION 1 */}
          <div style={{ marginBottom: '20px' }}>
            <h3>1st Floor</h3>

            {/* Rent */}
            <div>
              <label>
                Rent:
                <input
                  type="number"
                  name="rent"
                  value={sectionOne.rent}
                  onChange={handleSectionOneChange}
                  style={{ marginLeft: '80px' }}
                />
              </label>
            </div>

            {/* Electricity */}
            <div className="flex flex-col mb-4 mt-4">
              <h2 className="text-xl font-bold mb-2">Electricity</h2>

              <div className="flex gap-6">

                {/* Current */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Current Reading:</label>
                  <input
                    type="number"
                    name="current"
                    value={electricityInputs.current}
                    style={{ marginLeft: '10px' }}
                    onChange={handleElectricityInput}
                    className="border border-gray-400 rounded-md px-2 py-1 w-32"
                  />
                </div>

                {/* Previous */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Previous Reading:</label>
                  <input
                    type="number"
                    name="previous"
                    value={electricityInputs.previous}
                    style={{ marginLeft: '10px' }}
                    onChange={handleElectricityInput}
                    className="border border-gray-400 rounded-md px-2 py-1 w-32"
                  />
                </div>

                {/* Rate */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Rate per Unit:</label>
                  <input
                    type="number"
                    name="rate"
                    value={electricityInputs.rate}
                    style={{ marginLeft: '40px' }}
                    onChange={handleElectricityInput}
                    className="border border-gray-400 rounded-md px-2 py-1 w-32"
                  />
                </div>
              </div>

              {/* Display electricity bill */}
              <p className="mt-2 font-semibold">
                Electricity Bill: ₹ {sectionOne.electricity.toFixed(2)}
              </p>

            </div>
          </div>

          {/* SECTION 2 */}
          <div style={{ marginBottom: '20px' }}>
            <div>
              <label>
                Water:
                <input
                  type="number"
                  name="water"
                  value={sectionTwo.water}
                  onChange={handleSectionTwoChange}
                  style={{ marginLeft: '10px' }}
                />
              </label>
            </div>

            <div>
              <label>
                Others:
                <input
                  type="number"
                  name="others"
                  value={sectionTwo.others}
                  onChange={handleSectionTwoChange}
                  style={{ marginLeft: '10px' }}
                />
              </label>
            </div>
            <div style={{ marginTop: '5px' }}>
  <label className="font-semibold">Others Calculation (Explanation):</label>
  <textarea
    value={othersExplanation}
    onChange={(e) => setOthersExplanation(e.target.value)}
    placeholder="Write calculation or notes for 'Others' here..."
    className="border border-gray-400 rounded-md p-1 w-full mt-1"
    rows={4}
  />
</div>
          </div>

          {/* TOTAL */}
          <div>
            <h3>Total: ₹ {calculateTotal()}</h3>
          </div>

          {/* Generate PDF */}
          <button
            onClick={generatePDF}
            style={{
              marginTop: '5px',
              padding: '10px 30px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Generate Bill (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

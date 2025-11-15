import React, { useState } from "react";
import jsPDF from "jspdf";

export default function Modall() {
  const [prevReading, setPrevReading] = useState("");
  const [currReading, setCurrReading] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState(null);

  // -----------------------------------------
  // CALCULATION FUNCTION
  // -----------------------------------------
  const calculateBill = () => {
    const prev = Number(prevReading);
    const curr = Number(currReading);
    const r = Number(rate);

    if (curr < prev) {
      setResult({
        stepsText: "Error: Current reading cannot be less than previous reading.",
      });
      return;
    }

    const units = curr - prev;
    const total = units * r;

    const stepsText = `
Electricity Bill Calculation
-------------------------------------

Previous Reading : ${prev}
Current Reading  : ${curr}

Total Units = Current - Previous
            = ${curr} - ${prev}
            = ${units}

Rate per Unit : ₹${r}

Total Amount = Units × Rate
             = ${units} × ₹${r}
             = ₹${total}
`;

    setResult({
      units,
      total,
      stepsText,
    });
  };

  // -----------------------------------------
  // PDF DOWNLOAD FUNCTION
  // -----------------------------------------
  const downloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    doc.setFont("courier", "normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(result.stepsText, 550);
    doc.text(lines, 40, 40);

    doc.save("electricity_bill.pdf");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Electricity Bill Calculator</h2>

      <label>Previous Reading</label>
      <input
        type="number"
        value={prevReading}
        onChange={(e) => setPrevReading(e.target.value)}
        placeholder="Enter previous reading"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Current Reading</label>
      <input
        type="number"
        value={currReading}
        onChange={(e) => setCurrReading(e.target.value)}
        placeholder="Enter current reading"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Rate per Unit (₹)</label>
      <input
        type="number"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        placeholder="Enter rate per unit"
        style={{ width: "100%", marginBottom: "20px" }}
      />

      <button onClick={calculateBill} style={{ marginRight: "10px" }}>
        Calculate
      </button>

      {result && (
        <>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "",
              padding: "15px",
              marginTop: "20px",
            }}
          >
            {result.stepsText}
          </pre>

          <button onClick={downloadPDF} style={{ marginTop: "10px" }}>
            Download PDF
          </button>
        </>
      )}
    </div>
  );
}

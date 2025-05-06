import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    euro: 92.35,
    basicCustomDuty: 8.25,
    posNo: 10,
    articleNo: 'BG-A-161-3285',
    description: 'ISOFLEX GREASE KLUEBER NBU 15 PU: 1 KG',
    units: 1,
    ratePerPiece: 116.20,
    localTransport: 3000
  });

  const [calculatedValues, setCalculatedValues] = useState({
    fobAmount: 0,
    insuranceAndFreight: 0,
    cifValue: 0,
    svbLoad: 0,
    cifValueRs: 0,
    assessableValue: 0,
    basicCustomDutyAmount: 0,
    eCess: 0,
    shECess: 0,
    clearingExpenses: 0,
    highSeaSale: 0,
    bisDuty: 0,
    lsbDuty: 0,
    totalValue: 0,
    landedCostPerPc: 0,
    landedCostWithoutCenvat: 0,
    salesPrice: 0
  });
  const toFixedNumber = (num, digits = 2) => {
    return Number(Number(num).toFixed(digits));
  };
  useEffect(() => {
    // Calculate all values whenever form data changes
    const fobAmount = toFixedNumber(formData.units * formData.ratePerPiece);
  const insuranceAndFreight = toFixedNumber(fobAmount * 0.02);
  const cifValue = toFixedNumber(fobAmount + insuranceAndFreight);
  const svbLoad = toFixedNumber(fobAmount * 0.01);
  const cifValueRs = toFixedNumber((cifValue + svbLoad) * formData.euro);
  const assessableValue = toFixedNumber(cifValueRs * 1.01);
  const basicCustomDutyAmount = toFixedNumber(assessableValue * (formData.basicCustomDuty / 100));
  const eCess = toFixedNumber(basicCustomDutyAmount * 0.02);
  const shECess = toFixedNumber(basicCustomDutyAmount * 0.01);
  const clearingExpenses = toFixedNumber(assessableValue * 0.03);
  const highSeaSale = toFixedNumber(assessableValue * 0.01);
  const bisDuty = toFixedNumber(assessableValue * 0.02);
  const lsbDuty = toFixedNumber(assessableValue * 0.02);
  const totalValue = toFixedNumber(
    cifValueRs + basicCustomDutyAmount + eCess + shECess +
    clearingExpenses + formData.localTransport + highSeaSale +
    bisDuty + lsbDuty
  );
  const landedCostPerPc = toFixedNumber(totalValue / formData.units);
  const landedCostWithoutCenvat = landedCostPerPc;
  const salesPrice = toFixedNumber(landedCostWithoutCenvat * 1.3);

    setCalculatedValues({
      fobAmount,
      insuranceAndFreight,
      cifValue,
      svbLoad,
      cifValueRs,
      assessableValue,
      basicCustomDutyAmount,
      eCess,
      shECess,
      clearingExpenses,
      highSeaSale,
      bisDuty,
      lsbDuty,
      totalValue,
      landedCostPerPc,
      landedCostWithoutCenvat,
      salesPrice
    });
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'articleNo' || name === 'description' ? value : Number(value)
    }));
  };

  return (
    <div className="App">
      <div className="calculator-container">
        <h1>Import Cost Calculator</h1>
        <div className="form-grid">
          <div className="input-group">
            <label>EURO Rate:</label>
            <input
              type="number"
              name="euro"
              value={formData.euro}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Basic Custom Duty (%):</label>
            <input
              type="number"
              name="basicCustomDuty"
              value={formData.basicCustomDuty}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Pos. No:</label>
            <input
              type="number"
              name="posNo"
              value={formData.posNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Article No:</label>
            <input
              type="text"
              name="articleNo"
              value={formData.articleNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Description of Items:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>No. of PCS in a lot(Units):</label>
            <input
              type="number"
              name="units"
              value={formData.units}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Rate per piece:</label>
            <input
              type="number"
              name="ratePerPiece"
              value={formData.ratePerPiece}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>FOB Amt. of lot:</label>
            <input type="number" value={calculatedValues.fobAmount.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>Ins & Frt & P&Fto item lot:</label>
            <input type="number" value={calculatedValues.insuranceAndFreight.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>CIF Value of lot:</label>
            <input type="number" value={calculatedValues.cifValue.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>SVB Load:</label>
            <input type="number" value={calculatedValues.svbLoad.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>CIF value of lot (Rs):</label>
            <input type="number" value={calculatedValues.cifValueRs.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>Assessable value (Rs):</label>
            <input type="number" value={calculatedValues.assessableValue.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>Basic custom duty:</label>
            <input type="number" value={calculatedValues.basicCustomDutyAmount.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>E-CESS ON ALL CUST DTY:</label>
            <input type="number" value={calculatedValues.eCess.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>S&H E-CESS ON ALL CUST DTY:</label>
            <input type="number" value={calculatedValues.shECess.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>Clearing Exps. on CIF (Rs.):</label>
            <input type="number" value={calculatedValues.clearingExpenses.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>Local Transport lumpsum (Rs.):</label>
            <input
              type="number"
              name="localTransport"
              value={formData.localTransport}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>High Sea Sale:</label>
            <input type="number" value={calculatedValues.highSeaSale.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>BIS Duty:</label>
            <input type="number" value={calculatedValues.bisDuty.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>LSB Duty:</label>
            <input type="number" value={calculatedValues.lsbDuty.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>Total Value of the LOT:</label>
            <input type="number" value={calculatedValues.totalValue.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>Landed Cost per/pc:</label>
            <input type="number" value={calculatedValues.landedCostPerPc.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>Landed cost per pc without cenvat duties:</label>
            <input type="number" value={calculatedValues.landedCostWithoutCenvat.toFixed(2)} readOnly />
          </div>
          <div className="input-group">
            <label>Sales Price added 30%:</label>
            <input type="number" value={calculatedValues.salesPrice.toFixed(2)} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 
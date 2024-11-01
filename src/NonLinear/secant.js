import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const SecantMethod = () => {
  const [inputValue, setInputValue] = useState("");
  const [initialX0, setInitialX0] = useState("2.0");
  const [initialX1, setInitialX1] = useState("3.0");
  const [result, setResult] = useState(null);

  function func(x, a) {
    return Math.pow(x, 2) - a; // คำนวณ f(x) = x^2 - a
  }

  function secantMethod(a) {
    let x0 = parseFloat(initialX0);
    let x1 = parseFloat(initialX1);
    let x;

    do {
      const f0 = func(x0, a);
      const f1 = func(x1, a);
      // คำนวณค่า x ใหม่
      x = x1 - (f1 * (x1 - x0)) / (f1 - f0);

      // อัปเดต x0 และ x1 สำหรับการวนลูปถัดไป
      x0 = x1;
      x1 = x;
    } while (!(func(x1, a) >= -0.00001 && func(x1, a) <= 0.00001));

    return x1; // คืนค่าผลลัพธ์
  }

  const handleCalculate = () => {
    const a = parseFloat(inputValue);
    if (!isNaN(a) && a >= 0) {
      const calculatedResult = secantMethod(a);
      setResult(calculatedResult.toFixed(5));
      setResult("Please enter a valid non-negative number."); 
    }
  };

  return (
    <Container>
      <h3 style={{ marginTop: "50px",fontWeight: 'bold' }}>Secant Method</h3>
      <Form.Group className="mb-3" style={{ marginTop: "20px" }}>
        <Form.Label>Enter a number:</Form.Label>
        <Form.Control
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a non-negative number"
          style={{ width: '250px' }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Initial guess (x0):</Form.Label>
        <Form.Control
          type="number"
          value={initialX0}
          onChange={(e) => setInitialX0(e.target.value)}
          placeholder="Enter initial guess for x0"
          style={{ width: '250px' }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Initial guess (x1):</Form.Label>
        <Form.Control
          type="number"
          value={initialX1}
          onChange={(e) => setInitialX1(e.target.value)}
          placeholder="Enter initial guess for x1"
          style={{ width: '250px' }}
        />
      </Form.Group>
      <Button variant="dark" onClick={handleCalculate}>
        Calculate
      </Button>
      {result && (
        <h5 style={{ marginTop: "20px" }}>
          Result: √{inputValue} ≈ {result}
        </h5>
      )}
    </Container>
  );
};

export default SecantMethod;


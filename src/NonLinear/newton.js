import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const NewtonRaphson = () => {
  const [inputValue, setInputValue] = useState(""); 
  const [initialGuess, setInitialGuess] = useState("2.0"); 
  const [result, setResult] = useState(null);
  function func(x, a) {
    return Math.pow(x, 2) - a;
  }

  function func2(x) {
    return 2 * x;
  }

  function sqrtApprox(a, initial) {
    let x0 = parseFloat(initial);

    do {
      x0 = x0 - (func(x0, a) / func2(x0));
    } while (!(func(x0, a) >= -0.000001 && func(x0, a) <= 0.000001));

    return x0;
  }

  const handleCalculate = () => {
    const a = parseFloat(inputValue);
    const initial = initialGuess;
    if (!isNaN(a) && a >= 0) {
      const calculatedResult = sqrtApprox(a, initial);
      setResult(calculatedResult.toFixed(6));
    } else {
      setResult("Please enter a valid non-negative number.");
    }
  };

  return (
    <Container>
      <h3 style={{ marginTop: "50px",fontWeight: 'bold' }}>Newton-Raphson</h3>
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
          value={initialGuess}
          onChange={(e) => setInitialGuess(e.target.value)}
          placeholder="Enter initial guess for square root"
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

export default NewtonRaphson;

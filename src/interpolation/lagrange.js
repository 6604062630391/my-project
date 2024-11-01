import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const LagrangeInterpolation = () => {
    const initialXValues = [0, 20000, 40000, 60000, 80000];
    const initialYValues = [9.81, 9.7487, 9.6879, 9.6879, 9.5682];
    const [xValues, setXValues] = useState(initialXValues);
    const [yValues, setYValues] = useState(initialYValues);
    const [inputX, setInputX] = useState(42000);
    const [results, setResults] = useState({ linear: null, quadratic: null, polynomial: null });

    const lagrange = (x, y, n, val) => {
        let result = 0.0;
        for (let i = 0; i < n; i++) {
            let term = y[i];
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    term = term * (val - x[j]) / (x[i] - x[j]);
                }
            }
            result += term;
        }
        return result;
    };

    const handleCalculate = () => {
        const yLinear = lagrange([xValues[0], xValues[4]], [yValues[0], yValues[4]], 2, Number(inputX));
        const yQuadratic = lagrange([xValues[0], xValues[2], xValues[4]], [yValues[0], yValues[2], yValues[4]], 3, Number(inputX));
        const yPolynomial = lagrange(xValues.map(Number), yValues.map(Number), xValues.length, Number(inputX));
        
        setResults({
            linear: yLinear,
            quadratic: yQuadratic,
            polynomial: yPolynomial,
        });
    };

    const handleXChange = (index, value) => {
        const newXValues = [...xValues];
        newXValues[index] = parseFloat(value);
        setXValues(newXValues);
    };

    const handleYChange = (index, value) => {
        const newYValues = [...yValues];
        newYValues[index] = parseFloat(value);
        setYValues(newYValues);
    };

    return (
        <Container>
            <h3 style={{ marginTop: "40px", fontWeight: "bold" }}>Lagrange Interpolation</h3>
            <Form>
                <h5>Input values</h5>
                <Row>
                    <Col>
                        <h6>Input X</h6>
                        {xValues.map((value, index) => (
                            <Form.Control
                                key={`x-${index}`}
                                type="number"
                                value={value}
                                onChange={(e) => handleXChange(index, e.target.value)}
                                className="mb-2"
                            />
                        ))}
                    </Col>
                    <Col>
                        <h6>Input Y</h6>
                        {yValues.map((value, index) => (
                            <Form.Control
                                key={`y-${index}`}
                                type="number"
                                value={value}
                                onChange={(e) => handleYChange(index, e.target.value)}
                                className="mb-2"
                            />
                        ))}
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Enter x of f(x)</Form.Label>
                    <Form.Control
                        type="number"
                        value={inputX}
                        onChange={(e) => setInputX(e.target.value)}
                    />
                </Form.Group>
                <Button variant="dark" onClick={handleCalculate} style={{ marginTop: "20px" }}>
                    Calculate
                </Button>
            </Form>

            {results.linear !== null && (
                <h5 style={{ marginTop: "20px" }}>
                    Linear (1,5) : f({inputX}) = {results.linear.toFixed(5)}
                </h5>
            )}
            {results.quadratic !== null && (
                <h5>
                    Quadratic (1,3,5) : f({inputX}) = {results.quadratic.toFixed(5)}
                </h5>
            )}
            {results.polynomial !== null && (
                <h5>
                    Polynomial (1,2,3,4,5) : f({inputX}) = {results.polynomial.toFixed(5)}
                </h5>
            )}
        </Container>
    );
};

export default LagrangeInterpolation;


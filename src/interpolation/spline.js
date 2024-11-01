import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const LinearSplineInterpolation = () => {
    const [inputX, setInputX] = useState(["2", "4", "6", "8", "10"]);
    const [inputY, setInputY] = useState(["9.5", "8.0", "10.5", "39.5", "72.5"]);
    const [inputA, setInputA] = useState("");
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const x = inputX.map(Number);
        const y = inputY.map(Number);
        const a = parseFloat(inputA);
        const fx = calculateLinearSpline(x, y, a);
        setResult(fx);
    };

    const calculateLinearSpline = (x, y, a) => {
        let mi = [];
        for (let i = 1; i < x.length; i++) {
            mi.push((y[i] - y[i - 1]) / (x[i] - x[i - 1]));
        }

        for (let i = 0; i < x.length - 1; i++) {
            if (a >= x[i] && a <= x[i + 1]) {
                return y[i] + mi[i] * (a - x[i]);
            }
        }
        return null; // กรณี a อยู่นอกช่วง
    };

    const handleInputXChange = (index, value) => {
        const newInputX = [...inputX];
        newInputX[index] = value;
        setInputX(newInputX);
    };

    const handleInputYChange = (index, value) => {
        const newInputY = [...inputY];
        newInputY[index] = value;
        setInputY(newInputY);
    };

    return (
        <Container>
            <h3 style={{ marginTop: "50px" ,fontWeight: 'bold'}}>Linear Spline Interpolation</h3>
            <Form>
                <h5>Input values</h5>
                <Row>
                    <Col>
                        <h6>Input X</h6>
                    </Col>
                    <Col>
                        <h6>Input Y</h6>
                    </Col>
                </Row>
                {inputX.map((value, index) => (
                    <Row key={index} className="mb-2">
                        <Col>
                            <Form.Control
                                type="number"
                                value={value}
                                onChange={(e) => handleInputXChange(index, e.target.value)}
                                placeholder={`x${index + 1}`}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="number"
                                value={inputY[index]}
                                onChange={(e) => handleInputYChange(index, e.target.value)}
                                placeholder={`y${index + 1}`}
                            />
                        </Col>
                    </Row>
                ))}
                
                <Form.Group>
                    <Form.Label>Enter x of f(x)</Form.Label>
                    <Form.Control
                        type="number"
                        value={inputA}
                        onChange={(e) => setInputA(e.target.value)}
                    />
                </Form.Group>
                
                <Button variant="dark" onClick={handleCalculate} style={{ marginTop: "20px" }}>
                    Calculate
                </Button>
            </Form>

            {result !== null && (
                <h5 style={{ marginTop: "20px" }}>
                    f({inputA}) = {result.toFixed(5)}
                </h5>
            )}
        </Container>
    );
};

export default LinearSplineInterpolation;




import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

const LinearRegression = () => {
    const [xi, setXi] = useState([10, 15, 20, 30, 40, 50, 60, 70, 80]);
    const [yi, setYi] = useState([5, 9, 15, 18, 22, 30, 35, 38, 43]);
    const [inputX, setInputX] = useState("");
    const [a0, setA0] = useState(0);
    const [a1, setA1] = useState(0);
    const [result, setResult] = useState(0);

    const handleXiChange = (index, value) => {
        const newXi = [...xi];
        newXi[index] = parseFloat(value);
        setXi(newXi);
    };

    const handleYiChange = (index, value) => {
        const newYi = [...yi];
        newYi[index] = parseFloat(value);
        setYi(newYi);
    };

    const calculateRegression = () => {
        const n = xi.length;
        let sumxy = 0, sumx = 0, sumy = 0, sumx2 = 0;

        for (let i = 0; i < n; i++) {
            sumxy += (xi[i] * yi[i]);
            sumx += xi[i];
            sumy += yi[i];
            sumx2 += xi[i] * xi[i];
        }

        const a1 = (n * sumxy - sumx * sumy) / (n * sumx2 - sumx * sumx);
        const a0 = (sumy - a1 * sumx) / n;
        setA0(a0);
        setA1(a1);
        setResult(a0 + a1 * parseFloat(inputX));
    };

    return (
        <Container>
            <h3 style={{ marginTop: "40px", fontWeight: "bold" }}>Linear Regression</h3>
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
                {xi.map((value, i) => (
                    <Row key={`input-${i}`} className="mb-2">
                        <Col>
                            <Form.Control
                                type="number"
                                value={value}
                                onChange={(e) => handleXiChange(i, e.target.value)}
                                placeholder={`x${i + 1}`}
                                
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="number"
                                value={yi[i]}
                                onChange={(e) => handleYiChange(i, e.target.value)}
                                placeholder={`y${i + 1}`}
                                
                            />
                        </Col>
                    </Row>
                ))}
                
                <Form.Group>
                    <Form.Label>Enter x of f(x)</Form.Label>
                    <Form.Control
                            type="number"
                            value={inputX}
                            onChange={(e) => setInputX(e.target.value)}
                        />
                </Form.Group>

                <Button variant="dark" onClick={calculateRegression} style={{ marginTop: "20px" }}>
                    Calculate
                </Button>
            </Form>

            <h5 style={{ marginTop: "20px" }}>Equation: y = {a0.toFixed(5)} + {a1.toFixed(5)}x</h5>
            <h5>f({inputX}) = {result.toFixed(5)}</h5>
        </Container>
    );
};

export default LinearRegression;

import React, { useState } from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";

const JacobiMethod = () => {
    const EPSILON = 0.000001;
    const SIZE = 4;
    const [matrixA, setMatrixA] = useState([
        [5, 2, 0, 0],
        [2, 5, 2, 0],
        [0, 2, 5, 2],
        [0, 0, 2, 5]
    ]);
    const [vectorB, setVectorB] = useState([12, 17, 14, 7]);
    
    const [iterations, setIterations] = useState([]);

    const handleMatrixChange = (i, j, value) => {
        const updatedMatrix = matrixA.map((row, rowIndex) =>
            rowIndex === i ? row.map((val, colIndex) => (colIndex === j ? parseFloat(value) : val)) : row
        );
        setMatrixA(updatedMatrix);
    };

    const handleVectorChange = (i, value) => {
        const updatedVector = vectorB.map((val, index) => (index === i ? parseFloat(value) : val));
        setVectorB(updatedVector);
    };

    const calculateJacobi = () => {
        let k = 0;
        let x = Array(SIZE).fill(0);
        let newX = Array(SIZE).fill(0);
        const results = [];

        while (true) {
            k++;
            let converged = true;

            for (let i = 0; i < SIZE; i++) {
                let sum = vectorB[i];
                for (let j = 0; j < SIZE; j++) {
                    if (j !== i) sum -= matrixA[i][j] * x[j];
                }
                newX[i] = sum / matrixA[i][i];

                if (Math.abs(newX[i] - x[i]) > EPSILON) converged = false;
            }

            results.push({ k, values: [...newX] });

            for (let i = 0; i < SIZE; i++) {
                x[i] = newX[i];
            }

            if (converged) break;
        }

        setIterations(results);
    };

    // ดึงผลลัพธ์สุดท้าย
    const finalResult = iterations.length > 0 ? iterations[iterations.length - 1].values : [];

    return (
        <Container>
            <h3 style={{ marginTop: "50px" ,fontWeight: 'bold'}}>Jacobi Iteration Calculator</h3>
            <Form>
                <h5 style={{ marginTop: "20px", marginBottom: "30px" }}>Matrix A</h5>
                {Array.from({ length: SIZE }, (_, i) => (
                    <Row key={i} className="mb-2">
                        {Array.from({ length: SIZE }, (_, j) => (
                            <Col key={j}>
                                <Form.Control
                                    type="number"
                                    value={matrixA[i][j]}
                                    onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                                />
                            </Col>
                        ))}
                    </Row>
                ))}
                <h5 style={{ marginTop: "30px", marginBottom: "30px" }}>Matrix B</h5>
                <Row>
                    {Array.from({ length: SIZE }, (_, i) => (
                        <Col key={i}>
                            <Form.Control
                                type="number"
                                value={vectorB[i]}
                                onChange={(e) => handleVectorChange(i, e.target.value)}
                            />
                        </Col>
                    ))}
                </Row>
            </Form>
            <Button variant="dark" onClick={calculateJacobi} style={{ marginTop: "20px" }}>Calculate</Button>

            {finalResult.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h5>Final Result:</h5>
                    <p>
                        x1 = {finalResult[0].toFixed(6)}, x2 = {finalResult[1].toFixed(6)}, 
                        x3 = {finalResult[2].toFixed(6)}, x4 = {finalResult[3].toFixed(6)}
                    </p>
                </div>
            )}

<Table striped bordered hover variant="dark" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>x1</th>
                        <th>x2</th>
                        <th>x3</th>
                        <th>x4</th>
                    </tr>
                </thead>
                <tbody>
                    {iterations.map((iteration) => (
                        <tr key={iteration.k}>
                            <td>{iteration.k}</td>
                            <td>{iteration.values[0].toFixed(6)}</td>
                            <td>{iteration.values[1].toFixed(6)}</td>
                            <td>{iteration.values[2].toFixed(6)}</td>
                            <td>{iteration.values[3].toFixed(6)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {iterations.length > 0 && (
                <p>Converged in {iterations.length} iterations.</p>
            )}
        </Container>
    );
};

export default JacobiMethod;

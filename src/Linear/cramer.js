import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

const CramersRule = () => {
  const [matrixA, setMatrixA] = useState([[-2, 3, 1], [3, 4, -5], [1, -2, 1]]);
  const [matrixB, setMatrixB] = useState([[9], [0], [-4]]);
  const [results, setResults] = useState([]);

  const calculateDeterminant = (matrix) => {
    const positiveDiagonal = (matrix[0][0] * matrix[1][1] * matrix[2][2]) +
                             (matrix[0][1] * matrix[1][2] * matrix[2][0]) +
                             (matrix[0][2] * matrix[1][0] * matrix[2][1]);

    const negativeDiagonal = (matrix[2][0] * matrix[1][1] * matrix[0][2]) +
                             (matrix[2][1] * matrix[1][2] * matrix[0][0]) +
                             (matrix[2][2] * matrix[1][0] * matrix[0][1]);

    return positiveDiagonal - negativeDiagonal;
  };

  const copyMatrix = (source) => {
    return source.map(row => row.slice());
  };

  const replaceColumn = (matrix, column, colIndex) => {
    for (let i = 0; i < 3; i++) {
      matrix[i][colIndex] = column[i][0];
    }
  };

  const calculateCramersRule = () => {
    const determinantA = calculateDeterminant(matrixA);
    const tempResults = [];

    for (let i = 0; i < 3; i++) {
      const tempMatrix = copyMatrix(matrixA);
      replaceColumn(tempMatrix, matrixB, i);
      tempResults[i] = calculateDeterminant(tempMatrix) / determinantA;
    }

    setResults(tempResults);
  };

  const updateMatrixA = (row, col, value) => {
    const newMatrix = [...matrixA];
    newMatrix[row][col] = parseFloat(value);
    setMatrixA(newMatrix);
  };

  const updateMatrixB = (row, value) => {
    const newMatrix = [...matrixB];
    newMatrix[row][0] = parseFloat(value);
    setMatrixB(newMatrix);
  };

  return (
    <Container>
      <h3 style={{ marginTop: "50px" ,fontWeight: 'bold'}}>Cramer's Rule Calculator</h3>
      <h5 style={{ marginTop: "20px" }}>Matrix A:</h5>
      <Form style={{ marginTop: "20px" }}>
        {[0, 1, 2].map((row) => (
          <Row key={row}>
            {[0, 1, 2].map((col) => (
              <Col key={col}>
                <Form.Control
                  type="number"
                  value={matrixA[row][col]}
                  onChange={(e) => updateMatrixA(row, col, e.target.value)}
                />
              </Col>
            ))}
          </Row>
        ))}
      </Form>
  
      <h5 style={{ marginTop: "40px" }}>Matrix B:</h5>
      <Form style={{ marginTop: "20px" }}>
        {[0, 1, 2].map((row) => (
          <Row key={row}>
            <Col>
              <Form.Control
                type="number"
                value={matrixB[row][0]}
                onChange={(e) => updateMatrixB(row, e.target.value)}
                style={{ width: "355px" }} // ปรับความกว้างของ Matrix B เท่านั้น
              />
            </Col>
          </Row>
        ))}
      </Form>
  
      <Button variant="dark" onClick={calculateCramersRule} style={{ marginTop: "20px" }}>
        Calculate
      </Button>
  
      <h5 style={{ marginTop: "20px" }}>
        Results: x1 = {results[0]?.toFixed(2)}, x2 = {results[1]?.toFixed(2)}, x3 = {results[2]?.toFixed(2)}
      </h5>
    </Container>
  );
  
};

export default CramersRule;


import React, { useState } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";

const GaussianElimination = () => {
  const [matrixA, setMatrixA] = useState([[-2, 3, 1], [3, 4, -5], [1, -2, 1]]);
  const [matrixB, setMatrixB] = useState([9, 0, -4]);
  const [results, setResults] = useState([]);
  const [iterations, setIterations] = useState([]); // State สำหรับเก็บค่า iteration

  const printMatrix = (A, B) => {
    return A.map((row, i) => {
      return row.map(num => num.toFixed(2)).join(" ") + " | " + B[i].toFixed(2);
    });
  };

  const gaussElimination = () => {
    let A = JSON.parse(JSON.stringify(matrixA)); // ทำสำเนา A
    let B = [...matrixB]; // ทำสำเนา B
    const tempIterations = []; // Array สำหรับเก็บการ iteration

    for (let i = 0; i < 3; i++) {
      for (let j = i + 1; j < 3; j++) {
        let factor = A[j][i] / A[i][i];
        for (let k = i; k < 3; k++) {
          A[j][k] -= factor * A[i][k];
        }
        B[j] -= factor * B[i];
      }
      // เก็บค่าที่อัพเดตใน iteration
      tempIterations.push({
        iteration: i + 1,
        matrix: A.map(row => row.slice()), // ทำสำเนาของ matrix
        result: B
      });
    }

    // คำนวณค่าตัวแปร x1, x2, x3
    let x3 = B[2] / A[2][2];
    let x2 = (B[1] - A[1][2] * x3) / A[1][1];
    let x1 = (B[0] - A[0][1] * x2 - A[0][2] * x3) / A[0][0];

    setResults([x1, x2, x3]);
    setIterations(tempIterations); // อัปเดต state สำหรับ iteration
  };

  const updateMatrixA = (row, col, value) => {
    const newMatrix = [...matrixA];
    newMatrix[row][col] = parseFloat(value);
    setMatrixA(newMatrix);
  };

  const updateMatrixB = (row, value) => {
    const newMatrix = [...matrixB];
    newMatrix[row] = parseFloat(value);
    setMatrixB(newMatrix);
  };

  return (
    <Container>
      <h3 style={{ marginTop: "50px",fontWeight: 'bold' }}>Gaussian Elimination Calculator</h3>
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
                value={matrixB[row]}
                onChange={(e) => updateMatrixB(row, e.target.value)}
                style={{ width: "355px" }}
              />
            </Col>
          </Row>
        ))}
      </Form>

      <Button variant="dark" onClick={gaussElimination} style={{ marginTop: "20px" }}>
        Calculate
      </Button>

      <h5 style={{ marginTop: "20px" }}>
        Results: x1 = {results[0]?.toFixed(2)}, x2 = {results[1]?.toFixed(2)}, x3 = {results[2]?.toFixed(2)}
      </h5>

      {/* แสดง iteration ในรูปแบบตาราง */}
      <h5 style={{ marginTop: "40px" }}>Iterations:</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>Matrix A</th>
            <th>Result B</th>
          </tr>
        </thead>
        <tbody>
          {iterations.map((iteration) => (
            <tr key={iteration.iteration}>
              <td>{iteration.iteration}</td>
              <td>
                <pre>{printMatrix(iteration.matrix, iteration.result).join("\n")}</pre>
              </td>
              <td>{iteration.result.map(num => num.toFixed(2)).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GaussianElimination;

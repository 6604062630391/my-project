import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

const LUDecomposition = () => {
  const [matrixA, setMatrixA] = useState([
    [-2, 3, 1],
    [3, 4, -5],
    [1, -2, 1]
  ]);
  const [matrixB, setMatrixB] = useState([9, 0, -4]);
  const [L, setL] = useState([]);
  const [U, setU] = useState([]);
  const [y, setY] = useState([]);
  const [x, setX] = useState([]);

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

  const calculateLU = () => {
    const L = Array.from({ length: 3 }, () => Array(3).fill(0));
    const U = Array.from({ length: 3 }, () => Array(3).fill(0));
    const y = Array(3).fill(0);
    const x = Array(3).fill(0);

    L[0][0] = matrixA[0][0];
    U[0][1] = matrixA[0][1] / L[0][0];
    U[0][2] = matrixA[0][2] / L[0][0];

    L[1][0] = matrixA[1][0];
    L[1][1] = matrixA[1][1] - L[1][0] * U[0][1];
    U[1][2] = (matrixA[1][2] - L[1][0] * U[0][2]) / L[1][1];

    L[2][0] = matrixA[2][0];
    L[2][1] = matrixA[2][1] - L[2][0] * U[0][1];
    L[2][2] = matrixA[2][2] - L[2][0] * U[0][2] - L[2][1] * U[1][2];

    setL(L);
    setU(U);

    y[0] = matrixB[0] / L[0][0];
    y[1] = (matrixB[1] - y[0] * L[1][0]) / L[1][1];
    y[2] = (matrixB[2] - L[2][0] * y[0] - L[2][1] * y[1]) / L[2][2];

    setY(y);

    x[2] = y[2];
    x[1] = y[1] - U[1][2] * x[2];
    x[0] = y[0] - U[0][1] * x[1] - U[0][2] * x[2];

    setX(x);
  };

  const renderMatrix = (matrix) => {
    return (
      <table className="matrix-table">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((value, j) => (
                <td key={j}>{value.toFixed(2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Container>
      <h3 style={{ marginTop: "50px",fontWeight: 'bold' }}>LU Decomposition Calculator</h3>
      
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

      <Button variant="dark" onClick={calculateLU} style={{ marginTop: "20px" }}>
        Calculate
      </Button>

      <h5 style={{ marginTop: "40px" }}>Matrix L:</h5>
      {renderMatrix(L)}

      <h5 style={{ marginTop: "40px" }}>Matrix U:</h5>
      {renderMatrix(U)}

      <h5 style={{ marginTop: "40px" }}>Values of y:</h5>
      {y.length > 0 && (
        <div>
          <p>y1 = {y[0]?.toFixed(2)}</p>
          <p>y2 = {y[1]?.toFixed(2)}</p>
          <p>y3 = {y[2]?.toFixed(2)}</p>
        </div>
      )}

      <h5 style={{ marginTop: "40px" }}>Result = Values of x:</h5>
      {x.length > 0 && (
        <div>
          <p>x1 = {x[0]?.toFixed(2)}</p>
          <p>x2 = {x[1]?.toFixed(2)}</p>
          <p>x3 = {x[2]?.toFixed(2)}</p>
        </div>
      )}

      <style jsx>{`
        .matrix-table {
          border-collapse: collapse;
          margin: 20px 0;
        }
        .matrix-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
          font-size: 1.2em;
        }
        .matrix-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        .matrix-table tr:hover {
          background-color: #ddd;
        }
      `}</style>
    </Container>
  );
};

export default LUDecomposition;

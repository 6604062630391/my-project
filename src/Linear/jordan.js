import React, { useState } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";

const GaussJordan = () => {
  const [matrixA, setMatrixA] = useState([[-2, 3, 1], [3, 4, -5], [1, -2, 1]]);
  const [matrixB, setMatrixB] = useState([9, 0, -4]);
  const [results, setResults] = useState([]);
  const [iterations, setIterations] = useState([]); 

  const printMatrix = (A, B) => {
    return A.map((row, i) => {
      return row.map(num => num.toFixed(2)).join(" ") + " | " + B[i].toFixed(2);
    });
  };

  const gaussJordan = () => {
    let A = JSON.parse(JSON.stringify(matrixA));
    let B = [...matrixB]; 
    const tempIterations = []; 

   
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i !== j) {
          let ratio = A[j][i] / A[i][i];
          for (let k = 0; k < 3; k++) {
            A[j][k] -= ratio * A[i][k];
          }
          B[j] -= ratio * B[i];
        }
      }
   
      tempIterations.push({
        iteration: i + 1,
        matrix: A.map(row => row.slice()), 
        result: B.map(num => num) 
      });
    }

    
    for (let i = 0; i < 3; i++) {
      B[i] /= A[i][i];
    }

    setResults(B);
    setIterations(tempIterations); 
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
      <h3 style={{ marginTop: "50px" ,fontWeight: 'bold'}}>Gauss-Jordan Elimination Calculator</h3>
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

      <Button variant="dark" onClick={gaussJordan} style={{ marginTop: "20px" }}>
        Calculate
      </Button>

      <h5 style={{ marginTop: "20px" }}>
        Results: x1 = {results[0]?.toFixed(2)}, x2 = {results[1]?.toFixed(2)}, x3 = {results[2]?.toFixed(2)}
      </h5>

  
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

export default GaussJordan;

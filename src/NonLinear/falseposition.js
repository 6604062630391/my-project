import { useState } from "react"; 
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { evaluate } from 'mathjs';

const FalsePosition = () => {
    const [data, setData] = useState([]);
    const [Equation, setEquation] = useState("(x^4)-13");
    const [X, setX] = useState(0);
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);

    const calculateFalsePosition = (xl, xr) => {
        let xm, fXm, fXl, fXr;
        let iter = 0;
        const MAX = 100;
        const e = 0.000001;
        const tempData = [];

        do {
            fXl = evaluate(Equation, { x: xl });
            fXr = evaluate(Equation, { x: xr });
            xm = ((xl * fXr) - (xr * fXl)) / (fXr - fXl);
            fXm = evaluate(Equation, { x: xm });

            iter++;
            if (iter <= MAX) {
                tempData.push({
                    iteration: iter,
                    Xl: xl,
                    Xm: xm,
                    Xr: xr,
                });
            }

            if (fXm * fXl < 0) {
                xr = xm;
            } else {
                xl = xm;
            }
        } while (Math.abs(fXm) > e);

        setData(tempData);
        setX(xm);
    }

    const inputEquation = (event) => setEquation(event.target.value);
    const inputXL = (event) => setXL(event.target.value);
    const inputXR = (event) => setXR(event.target.value);

    const calculateRoot = () => {
        const xlnum = parseFloat(XL);
        const xrnum = parseFloat(XR);
        calculateFalsePosition(xlnum, xrnum);
    }

    return (
        <Container>
            <h3 style={{ marginTop: "40px", fontWeight: 'bold' }}>False Position</h3>
            <Form>
                <Form.Group className="mb-3" style={{ marginTop: "40px" }}>
                    <Row className="align-items-center">
                        <Col md={2}>
                            <Form.Label style={{ marginTop: "10px" }}>Input f(x)</Form.Label>
                        </Col>
                        <Col md={4}>
                            <input type="text" id="equation" value={Equation} onChange={inputEquation} className="form-control" />
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col md={2}>
                            <Form.Label style={{ marginTop: "10px" }}>Input XL</Form.Label>
                        </Col>
                        <Col md={4}>
                            <input type="number" id="XL" value={XL} onChange={inputXL} className="form-control" />
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col md={2}>
                            <Form.Label style={{ marginTop: "10px" }}>Input XR</Form.Label>
                        </Col>
                        <Col md={4}>
                            <input type="number" id="XR" value={XR} onChange={inputXR} className="form-control" />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            <br />
            <h5>Answer = {X.toFixed(6)}</h5>
            
            {/* ตารางแสดงผลลัพธ์ */}
            <Container>
                <table className="table table-striped table-bordered table-dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">XM</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl.toFixed(6)}</td>
                                <td>{element.Xm.toFixed(6)}</td>
                                <td>{element.Xr.toFixed(6)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </Container>
    )
}

export default FalsePosition;


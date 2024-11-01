import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './home.css';
import head from './a.gif';

function Home() {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-4">
            <img
            alt=""
            src={head}
            width="500"
            height="300"
            className="d-inline-block align-top"
          />
            <h2 style={{ marginTop: "10px" ,fontFamily: 'Bakbak One', fontWeight: 'normal',fontSize: '40px'}}>
                Select calculation method</h2>
            <h4 style={{ marginTop: "20px", fontFamily: 'Bakbak One', fontWeight: 'normal',fontSize: '20px', textAlign: 'left' }}>
                Non-Linear Equation
            </h4>
            <div className="button-container mt-4"style={{fontFamily: 'sans-serif', fontWeight: 'bold'}}>
                <Button className="custom-button m-2" onClick={() => navigate('/sample')}>
                    Bisection
                </Button>
                <Button className="custom-button m-2" onClick={() => navigate('/falseposition')}>
                    False Position
                </Button>
                <Button className="custom-button m-2" onClick={() => navigate('/onepoint')}>
                    One Point
                </Button>
                <Button className="custom-button m-2" onClick={() => navigate('/newton')}>
                    Newton Raphson
                </Button>
                <Button className="custom-button m-2" onClick={() => navigate('/secant')}>
                    Secant Method
                </Button>
            </div>
            <h4 style={{ marginTop: "20px", fontFamily: 'Bakbak One', fontWeight: 'normal',fontSize: '20px', textAlign: 'left' }}>
                Linear Equation
            </h4>
            <div className="button-container mt-4" style={{ fontFamily: 'sans-serif', textAlign: 'left' }}>
            <Button className="custom-button m-2" onClick={() => navigate('/cramers-rule')}>
                    Cramer's Rule
                </Button>
                <Button className="custom-button m-2" onClick={() => navigate('/eli')}>
                    Gaussian Elimination
                </Button>
                <Button className="custom-button m-2" onClick={() => navigate('/jordan')}>
                    Gaussian Jordan
                </Button>
                <Button className="custom-button m-2" onClick={() => navigate('/Lu')}>
                    LU Decomposition
                </Button>
                <Button className="custom-button m-2" onClick={() => navigate('/jacobi')}>
                    Jacobi Iterations
                </Button>
            </div>
            <h4 style={{ marginTop: "20px", fontFamily: 'Bakbak One', fontWeight: 'normal',fontSize: '20px', textAlign: 'left' }}>
                Interpolation
            </h4>
            <div className="button-container mt-4" style={{ fontFamily: 'sans-serif', textAlign: 'left' }}>
                <Button className="custom-button m-2" onClick={() => navigate('/lagrange')}>
                    Lagrange Interpolation
                </Button>
                <Button className="custom-button m-2" onClick={() => navigate('/spline')}>
                    Spline
                </Button>
                <Button className="custom-button m-2" onClick={() => navigate('/regression')}>
                    Linear Regression
                </Button>
            </div>
        </Container>
    );
}

export default Home;


import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sample from './NonLinear/Sample';
import CramersRule from './Linear/cramer';
import FalsePosition from './NonLinear/falseposition';
import OnePoint from './NonLinear/onepoint';
import NewtonRaphson from './NonLinear/newton';
import SecantMethod from './NonLinear/secant';
import GaussianElimination from './Linear/eli';
import GaussJordan from './Linear/jordan';
import LUDecomposition from './Linear/Lu';
import Home from './home';
import JacobiCalculator from './Linear/jacobi';
import LinearRegression from './interpolation/regression';
import LinearSpline from './interpolation/spline';
import LagrangeInterpolation from './interpolation/lagrange';
import Footer from './footer';
import '@fontsource/bakbak-one';



function App() {
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sample" element={<Sample />} />
                    <Route path="/cramers-rule" element={<CramersRule />} />
                    <Route path="/falseposition" element={<FalsePosition />} /> 
                    <Route path="/onepoint" element={<OnePoint />} /> 
                    <Route path="/newton" element={<NewtonRaphson />} />
                    <Route path="/secant" element={<SecantMethod />} />
                    <Route path="/eli" element={<GaussianElimination />} />
                    <Route path="/jordan" element={<GaussJordan />} />
                    <Route path="/Lu" element={<LUDecomposition />} />
                    <Route path="/jacobi" element={<JacobiCalculator />} />
                    <Route path="/regression" element={<LinearRegression />} />
                    <Route path="/spline" element={<LinearSpline />} />
                    <Route path="/lagrange" element={<LagrangeInterpolation />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;


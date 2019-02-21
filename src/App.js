import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import Scene from './Scene';
class App extends Component {
    componentDidMount() {
    }
    render() {
	return(
		<div className="container App">
		<div className="pb-2 mt-4 mb-2 border-bottom">
		<h1>WebGL and Three.js demonstration</h1>
		</div>
		<div className="row">
		<div className="col-lg-5">
		<div className="jumbotron bg-warning" style={{fontSize:'20px',height:'100%'}}>
		<h3>Demo</h3>
		<hr/>
		<p>This is a demonstration of 3D-modeling with Three.js and React. Look at the source code for implementation.</p>
		<p>The source code is available at:</p>
		<a href="http://github.com/huse007" className="btn btn-lg btn-outline-light"> http://github.com/huse007 </a>
		</div>
		</div>
		<div className="col-lg-7 col-sm-12">
		<Scene/>
		<a href="http://www.threejs.org" className="btn btn-lg">Three.js</a>
		</div>
		</div>
		<div className="row">

		</div>
		</div>
	);
    }
}


export default App;

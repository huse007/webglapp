import React, { Component } from 'react'
import * as THREE from 'three'
import jupiter_img from './jupitermap.jpg';
//import {Button} from 'react-bootstrap';
class Scene extends Component {
    constructor(props) {
	super(props)
	
	this.start = this.start.bind(this)
	this.stop = this.stop.bind(this)
	this.animate = this.animate.bind(this)
	this.paintCube = this.paintCube.bind(this)
	this.rotateTop = this.rotateTop.bind(this)
	this.getGroup = this.getGroup.bind(this)
	this.updateCube = this.updateCube.bind(this)
	this.checkRotation = this.checkRotation.bind(this);
	this.doExplode = this.doExplode.bind(this);
	this.resetState = this.resetState.bind(this);
	this.initCube = this.initCube.bind(this);
    }
    
    componentDidMount() {
	console.log(this.mount.parentElement);
	const width = this.mount.parentElement.clientWidth-30;
	const height = this.mount.parentElement.clientHeight;
	
	    /*this.mount.style.cssText="width:1000px; height:500px;";
	const width = this.mount.clientWidth
	const height = this.mount.clientHeight
	*/
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75,width / height,0.1,1000);
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	var jupiter_geometry = new THREE.SphereGeometry(2, 32, 32);
        var jupiter_material = new THREE.MeshPhongMaterial();
        var jupiter_mesh = new THREE.Mesh(jupiter_geometry, jupiter_material);
	var jupiter_pivot = new THREE.Object3D();
	var parent = new THREE.Object3D();
	var light = new THREE.PointLight( 0xffffff, 4, 1000 );
	var mesh2 = new THREE.Mesh(new THREE.BoxGeometry(10,10,10), new THREE.MeshPhysicalMaterial({
            wireframe:false,
            color:0xffffff,
            transparent:true,
            opacity:1.0,
            vertexColors:THREE.FaceColors,
            reflectivity:1.0,
            defines:{ 'PHYSICAL': '' },
            metalness:0.7
	}));
	
	for(var i = 0; i<27; i++) {
	    var pivot = new THREE.Object3D();
            pivot.position.set(0,0,0);
            pivot.updateMatrixWorld();
            pivot.updateMatrix();
            parent.add(pivot);
            var mesh = new THREE.Mesh(new THREE.BoxGeometry(2,2,2), new THREE.MeshPhysicalMaterial({
		wireframe:false,
		color:0xffffff,
		transparent:false,
		opacity:0.9,
		vertexColors:THREE.FaceColors,
		reflectivity:1.0,
		defines:{ 'PHYSICAL': '' },
		metalness:0.7
            }));
            pivot.add(mesh);
	}
	

	//Parent of cube
	parent.position.set(0,0,0);
	parent.updateMatrixWorld();
	//Jupiter init
	jupiter_material.map = new THREE.TextureLoader().load(jupiter_img)	
	jupiter_pivot.add(jupiter_mesh);
	jupiter_mesh.position.set(0,0,0);
	//White cube init
	mesh2.geometry.faces[4].color.setHex(0xffffff);
	//Light init
	light.position.set( 40, 40, 40 );
	//Camera init
	camera.position.z = 10;
	camera.position.x = 6;
	camera.position.y = 6;
	camera.rotation.x = -0.5;
	camera.rotation.y = 0.3;
	//Adding to scene
	scene.updateMatrixWorld();
	scene.add(parent);
	scene.add(mesh2);
	scene.add(light);
	scene.add(jupiter_pivot);

	this.parent = parent;
	this.light = light;
	this.mesh2 = mesh2;      
	this.axisX = new THREE.Vector3(1.0,0.0,0.0);
	this.axisY = new THREE.Vector3(0.0,1.0,0.0);
	this.axisZ = new THREE.Vector3(0.0,0.0,1.0);
	this.jupiter_mesh = jupiter_mesh;	
	this.initCube();	
	this.paintCube(parent);	
	this.doRotateTop = false;
	this.doRotateLeft = false;
	this.doRotateBottom = false;
	this.doRotateRight = false;
	this.doRaise = true;
	this.explode = false;
	this.counting = 0;
	this.stopCube = false;
	this.rotateCamera = true;
	this.frames = 0;
	this.cycles = 0;
	this.jupiter_pivot = jupiter_pivot;
	this.scenecolor = 0x000000;
	this.renderer = renderer;
	this.renderer.setClearColor(this.scenecolor)
	this.renderer.setSize(width, height)
	this.speed = 0.05;
	this.scene = scene
	this.camera = camera
	this.renderer = renderer
	this.fade = 0.0;
	this.mount.appendChild(this.renderer.domElement)
	this.start()
    }
    
    componentWillUnmount() {
	this.stop()
	this.mount.removeChild(this.renderer.domElement)
    }
    
    start() {
	if (!this.frameId) {
	    this.frameId = requestAnimationFrame(this.animate)
	}
    }
    
    stop() {
	cancelAnimationFrame(this.frameId)
    }
    initCube(){
	var count = 0;
	//pivot point should be rotation axis
	for(var j = 1; j<4; j++) {
	    for(var k = 1; k<4; k++) {
		for(var l = 1; l<4; l++) {
                    this.parent.children[count++].children[0].position.set(2.0*(j-1)-2.0,2.0*(k-1)-2.0,2.0*(l-1)-2.0);
		}
            }
	}
    }
    resetState(obj) {
	var count = 0;
	obj.position.set(0,0,0);
	obj.rotation.set(0,0,0);
	obj.updateMatrixWorld();
	obj.updateMatrix();
	this.camera.position.z = 10;
	this.camera.position.x = 6;
	this.camera.position.y = 6;
	this.camera.rotation.x = -0.5;
	this.camera.rotation.y = 0.3;

	
	
	this.jupiter_mesh.position.set(0,0,0);
	this.light.position.set(40,40,100);
	this.light.rotation.set(0,0,0);
	this.fade = 0.0;
	//pivot point should be rotation axis
	for(var j = 1; j<4; j++) {
	    for(var k = 1; k<4; k++) {
		for(var l = 1; l<4; l++) {
		    obj.children[count].rotation.set(0,0,0);
                    obj.children[count].children[0].rotation.set(0,0,0);
		    obj.children[count].position.set(0,0,0);
		    obj.children[count++].children[0].position.set(2.0*(j-1)-2.0,2.0*(k-1)-2.0,2.0*(l-1)-2.0);
		    
		}
            }
	}
    }
    animate() {
	this.frames++;
	
	//this.camera.position.z+=0.1;
	if(this.rotateCamera === true) {

	}
	if(this.explode===false && this.fade<=1.0) {
	    this.checkRotation();
	    this.fade+=0.005;
	    this.renderer.setClearColor(this.renderer.getClearColor().setHSL(0.0,0.0,this.fade));
	}
	if(this.doRaise === true) {
	    
            if(this.mesh2.position.y>=-10.0) {
                this.mesh2.position.y-=this.speed;
		
            }
            else {
                this.doRaise = false;
                this.doRotateTop = true;

            }
        }
        if(this.doRaise === false) {
            this.mesh2.scale.x-=0.01;
            this.mesh2.scale.z-=0.01;
            this.mesh2.scale.y-=0.01;
            this.mesh2.rotation.z+=0.02;
            this.mesh2.material.opacity-=0.01;
	    
	}
	if(this.doRotateTop===true) {

	    if(this.rotateTop(this.parent,this.axisY,2) === true) {
		this.doRotateTop = false;
		this.doRotateLeft = true;
	    }
	}
	if(this.doRotateLeft===true) {
	    if(this.rotateTop(this.parent,this.axisX,1) === true) {
		this.doRotateBottom = true;
		this.doRotateLeft = false;
	    }
	}
	if(this.doRotateBottom===true) {
	    if(this.rotateTop(this.parent,this.axisY,3) === true) {
		this.doRotateRight = true;
		this.doRotateBottom = false;
	    }
	}
	if(this.doRotateRight===true) {
	    if(this.rotateTop(this.parent,this.axisX,0) === true) {
		this.doRotateTop = false;
		this.doRotateRight = false;
		if(++this.cycles%3 === 0) {
		    this.explode=true;
		}
		else {
		    this.doRotateTop = true;
		}
	    }
	}
	if(this.explode === true) {

	    this.checkRotation();
	    this.fade-=0.02;
	    this.renderer.setClearColor(this.renderer.getClearColor().setHSL(0.0,0.0,this.fade));	    
	    this.doExplode(this.parent);
	    this.jupiter_mesh.rotation.y+=0.01;
	    
	    this.jupiter_mesh.rotation.y+=this.speed/2;
            this.jupiter_mesh.position.z+=this.speed/2;
            this.jupiter_mesh.position.y+=this.speed/2;
	    if(this.jupiter_mesh.position.y>9.0) {
		this.explode=false;
		this.renderer.setClearColor(0xffffff);
		this.doRotateTop = true;
		this.resetState(this.parent);
	    }
	}
	this.renderScene()
	this.frameId = window.requestAnimationFrame(this.animate)
    }
    
    renderScene() {
	this.renderer.render(this.scene, this.camera)
    }
    // 0:right, 1:left, 2:top, 3:bottom, 4:front, 5:back, 6:middle
    getGroup(obj,choice) {
	var tmp = [];
        switch(choice) {
        case 0:
            for(var i = 0; i<obj.children.length; i++) {
		if(obj.children[i].children[0].position.x===2.0) {
                    tmp.push(i);
                }
            }
            break;
        case 1:
            for( i = 0; i<obj.children.length; i++) {
                if(obj.children[i].children[0].position.x===-2.0) {
                    tmp.push(i);
                }
            }
            break;
        case 2:
            for( i = 0; i<obj.children.length; i++) {
                if(obj.children[i].children[0].position.y===2.0) {
                    tmp.push(i);
                }
            }
            break;
	case 3:
            for(i = 0; i<obj.children.length; i++) {
                if(obj.children[i].children[0].position.y===-2.0) {
                    tmp.push(i);
                }
            }
            break;
        case 4:
            for(i = 0; i<obj.children.length; i++) {
                if(obj.children[i].children[0].position.z===2.0) {
                    tmp.push(i);
                }
            }
	    break;
    	case 5:
            for(i = 0; i<obj.children.length; i++) {
                if(obj.children[i].children[0].position.z===-2.0) {
                    tmp.push(i);
                }
            }
            break;
	case 6:
	    for(i = 0; i<obj.children.length; i++) {
		if(obj.children[i].children[0].position.z === 0.0 && obj.children[i].children[0].position.x === 0.0 && obj.children[i].children[0].position.y === 0.0) {
		    tmp.push(i);
		}
	    }
	    break;
        default:

        }
        return tmp;
    }

    rotateTop(obj,axis,choice) {
        var group = this.getGroup(obj,choice);
        var v = new THREE.Vector3();
        var done = false;
	var comp = 0;
	
	if(axis.y>axis.x) {
	    comp = 1;
	}
	if(axis.z>axis.y) {
	    comp = 2;
	}
        for(var i = 0; i<group.length; i++) {
	    obj.children[group[i]].rotation.toVector3(v);
            if(v.getComponent(comp)<=Math.PI/2-0.05) {
                obj.children[group[i]].rotateOnWorldAxis(axis,this.speed);
            }
            else {
                this.updateCube(obj,group);
                return true;
            }
        }
        return done;
    }
    
    updateCube(obj, arr) {
        for(var i = 0; i<arr.length; i++) {
            //Get new world coordinates
            obj.children[arr[i]].children[0].getWorldPosition(obj.children[arr[i]].children[0].position);
            //Get rotation from pivot point
            var x = obj.children[arr[i]].rotation.x;
            var y = obj.children[arr[i]].rotation.y;
            var z = obj.children[arr[i]].rotation.z;
            var ax;
	    if(x>y && x>z){
                ax = new THREE.Vector3(1.0,0.0,0.0);
    	    }
            if(y>x && y>z) {
             	ax = new THREE.Vector3(0.0,1.0,0.0);
            }
            if(z>x && z>y) {
                ax = new THREE.Vector3(0.0,0.0,1.0);
            }
            //turn back coordinate system
	    obj.children[arr[i]].rotation.x=0.0;
            obj.children[arr[i]].rotation.y=0.0;
            obj.children[arr[i]].rotation.z=0.0;
	    //Rotate children about own axis
	    obj.children[arr[i]].children[0].rotateOnWorldAxis(ax,Math.PI/2);
	    obj.children[arr[i]].children[0].updateMatrix();
            obj.children[arr[i]].children[0].updateMatrixWorld();
            //Set positions to world coordinates
            obj.children[arr[i]].children[0].position.x = Math.round(obj.children[arr[i]].children[0].position.x);
            obj.children[arr[i]].children[0].position.y = Math.round(obj.children[arr[i]].children[0].position.y);
            obj.children[arr[i]].children[0].position.z = Math.round(obj.children[arr[i]].children[0].position.z);
	    //Every rotation > 3.14 is set back to 0.0 to avoid round off errors
            if(obj.children[arr[i]].children[0].rotation.x>=2*Math.PI){
                obj.children[arr[i]].children[0].rotation.x=0.0;
            }
            if(obj.children[arr[i]].children[0].rotation.y>=2*Math.PI){
                obj.children[arr[i]].children[0].rotation.y=0.0;
            }
            if(obj.children[arr[i]].children[0].rotation.z>=2*Math.PI){
                obj.children[arr[i]].children[0].rotation.z=0.0;
            }
            if(arr[i]===240) {
                console.log(obj.children[arr[i]].children[0].rotation);
            }
        }
    }

    paintCube(parent) {
        var orange = 0xfd6f02;
        var blue = 0x0000ff;
        var yellow = 0xffff00;
        var green = 0x008000;
        var white = 0xffffff;
        var red = 0xff0000;
        var black = 0x8a795d;
        var tmp = this.getGroup(parent,2);
	// 0:right, 1:left, 2:top, 3:bottom, 4:front, 5:back 
        for(var i = 0; i<parent.children.length; i++) {
            for(var j = 0; j<parent.children[i].children[0].geometry.faces.length; j++) {
                parent.children[i].children[0].geometry.faces[j].color.setHex(black);
            }
        }
        for( i = 0; i<tmp.length; i++) {
            parent.children[tmp[i]].children[0].geometry.faces[4].color.setHex(white);
            parent.children[tmp[i]].children[0].geometry.faces[5].color.setHex(white);
        }
        tmp = this.getGroup(parent,1);
        for( i = 0; i<tmp.length; i++){
            parent.children[tmp[i]].children[0].geometry.faces[2].color.setHex(green);
            parent.children[tmp[i]].children[0].geometry.faces[3].color.setHex(green);
            parent.children[tmp[i]].children[0].geometry.faces[0].color.setHex(black);
            parent.children[tmp[i]].children[0].geometry.faces[1].color.setHex(black);
        }
        tmp = this.getGroup(parent,4);
        for( i = 0; i<tmp.length; i++){
            parent.children[tmp[i]].children[0].geometry.faces[8].color.setHex(red);
            parent.children[tmp[i]].children[0].geometry.faces[9].color.setHex(red);
        }
        tmp = this.getGroup(parent,3);
        for( i = 0; i<tmp.length; i++){
            parent.children[tmp[i]].children[0].geometry.faces[6].color.setHex(yellow);
            parent.children[tmp[i]].children[0].geometry.faces[7].color.setHex(yellow);
        }
	tmp = this.getGroup(parent,0);
        for( i = 0; i<tmp.length; i++){
            parent.children[tmp[i]].children[0].geometry.faces[0].color.setHex(blue);
            parent.children[tmp[i]].children[0].geometry.faces[1].color.setHex(blue);
            parent.children[tmp[i]].children[0].geometry.faces[2].color.setHex(black);
            parent.children[tmp[i]].children[0].geometry.faces[3].color.setHex(black);
        }
        tmp = this.getGroup(parent,5);
        for( i = 0; i<tmp.length; i++){
            parent.children[tmp[i]].children[0].geometry.faces[10].color.setHex(orange);
            parent.children[tmp[i]].children[0].geometry.faces[11].color.setHex(orange);
        }
    }
    checkRotation(){
        var rotSpeed = this.speed/2;
        var x = this.camera.position.x,
            z = this.camera.position.z;
	var xx = this.light.position.x,
	    zz = this.light.position.z;
        if(true) {
            this.camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
            this.camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
	    this.light.position.x = xx * Math.cos(rotSpeed) + zz * Math.sin(rotSpeed);
            this.light.position.z = zz * Math.cos(rotSpeed) - xx * Math.sin(rotSpeed);
        }
        else {
            this.camera.position.x=6;
	    this.camera.position.y=6;
	    this.camera.position.z=10;
	    this.rotateCamera = false;
	}

        this.camera.lookAt(this.scene.position);
	return this.rotateCamera;	

    }
    
    doExplode(obj) {
	// 0:right, 1:left, 2:top, 3:bottom, 4:front, 5:back 
        this.a += 0.001;
	var top = this.getGroup(obj,2);
        var bottom = this.getGroup(obj,3);
        var left = this.getGroup(obj,1);
        var right = this.getGroup(obj,0);
        var front = this.getGroup(obj,4);
        var back = this.getGroup(obj,5);
	var middle = this.getGroup(obj,6);
	
        for(var i = 0; i<top.length; i++) {
            obj.children[top[i]].rotation.x-=0.01;
	    obj.children[top[i]].position.y-=this.a;
            obj.children[top[i]].children[0].material.opacity-=0.01;
        }
	for(i = 0; i<bottom.length; i++) {
            obj.children[bottom[i]].rotation.x+=0.01;
	    obj.children[bottom[i]].position.y-=0.1;
            obj.children[top[i]].children[0].material.opacity-=0.01;
        }

        for(i = 0; i<left.length; i++) {
            obj.children[left[i]].rotation.x+=0.01;
            obj.children[left[i]].position.y-=0.1;
            obj.children[top[i]].children[0].material.opacity-=0.01;
	}
         for(i = 0; i<right.length; i++) {
            obj.children[right[i]].rotation.x+=0.01;
            obj.children[right[i]].position.y-=0.1;
            obj.children[top[i]].children[0].material.opacity-=0.01;
	}
        for(i = 0; i<front.length; i++) {
            obj.children[front[i]].rotation.x+=0.01;
            obj.children[front[i]].position.y-=0.1;
            obj.children[top[i]].children[0].material.opacity-=0.01;
        }
        for(i = 0; i<back.length; i++) {
            obj.children[back[i]].rotation.x-=0.01;
            obj.children[back[i]].position.y-=0.1;
            obj.children[top[i]].children[0].material.opacity-=0.01;
        }
        for(i = 0; i<middle.length; i++) {
            obj.children[middle[i]].rotation.x-=0.01;
            obj.children[middle[i]].position.y-=0.1;
            obj.children[top[i]].children[0].material.opacity-=0.01;
            if(obj.children[top[i]].children[0].material.opacity<0.0) {
                return false;
            }
        }
    }

    render() {
	return (
		<div style={{height:'400px'}} ref={(mount) => { this.mount = mount }}/>
	)
    }
}

export default Scene;
//		<div style={{ width: '400px', height: '400px' }} ref={(mount) => { this.mount = mount }}/>

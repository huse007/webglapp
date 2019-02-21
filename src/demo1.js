/*class Jupiter {
    constructor() {
	this.geometry   = new THREE.SphereGeometry(2, 32, 32)
	this.material  = new THREE.MeshPhongMaterial()
	this.earthMesh = new THREE.Mesh(this.geometry, this.material)
	//this.material.map    = THREE.ImageUtils.loadTexture('jupitermap.jpg')
	this.material.map    = new THREE.TextureLoader().load('jupitermap.jpg')
    }
}
class Sun {
    constructor() {
	this.geometry   = new THREE.SphereGeometry(2, 32, 32)
	this.material  = new THREE.MeshPhongMaterial()
	this.sunMesh = new THREE.Mesh(this.geometry, this.material)
	//this.material.map    = THREE.ImageUtils.loadTexture('jupitermap.jpg')
	this.material.map    = new THREE.TextureLoader().load('sunmap.jpg')
    }
}
class Text {
    constructor() {
    var loader = new THREE.FontLoader();
    loader.load( 'helvetiker_bold.typeface.json', function ( font ) {
	
	var textGeometry = new THREE.TextGeometry( "WebGL", {
	    
	    font: font,
	    
	    size: 5,
	    height: 5,
	    curveSegments: 12,
	    
	    bevelThickness: 1,
	    bevelSize: 1,
	    bevelEnabled: true
	    
	});
	
	var textMaterial = new THREE.MeshPhongMaterial( 
	    { color: 0xff0000, specular: 0xffffff }
	);
	
	var mesh = new THREE.Mesh( textGeometry, textMaterial );
	mesh.position.z = -20;
	
	
    }); 				       }
    }*/
import THREE from './three.min.js';
export default function my(){
    this.speed =0.05;
    console.log(this.speed);
    // Get window dimension
    var wh = window.innerHeight;
    var ww = document.documentElement.clientWidth || document.body.clientWidth;
    

    // Save half window dimension
    var ww2 = ww * 0.5, wh2 = wh * 0.5;


    let scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, ww/wh, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({
	antialias: true,
	canvas: document.querySelector("#scene")
    });
    renderer.setSize( ww,wh );
//    scene.add(new THREE.Mesh(new TextGeometry("hei"),new THREE.MeshBasicMaterial()));

    camera.position.z = 10;
    camera.position.x = 6;
    camera.position.y = 6;
    camera.rotation.x = -0.5;
    camera.rotation.y = 0.3;

    /*camera.position.z = 20;
      camera.position.x = 3;
      camera.position.y = 7;
    */
    //this.renderer.setSize(ww, wh);
    
    //let geometry = new THREE.BufferGeometry();
    
    let grid = new THREE.BufferGeometry();
    var grid_vertices = new Float32Array([
	-2.0, 0.0, 0.0,
	2.0, 0.0, 0.0,
	0.0, -2.0, 0.0,
	0.0, 2.0, 0.0,
	0.0, 0.0, -2.0,
	0.0, 0.0, 2.0
    ]);


    var parent = new THREE.Object3D();
    parent.position.set(0,0,0);
    parent.updateMatrixWorld();
    scene.updateMatrixWorld();
    scene.add(parent);

    var cubes = [];
    
    var light = new THREE.PointLight( 0xffffff, 2, 1000 );
    light.position.set( 40, 40, 100 );
    //var light = new THREE.AmbientLight( 0x404040 ); // soft white light

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
    
    scene.add(mesh2);
    mesh2.geometry.faces[4].color.setHex(0xffffff);
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
    scene.add( light );

/*    var loader = new THREE.FontLoader();
    loader.load( 'helvetiker_bold.typeface.json', function ( font ) {
	
	var textGeometry = new THREE.TextGeometry( "WebGL", {
	    
	    font: font,
	    
	    size: 5,
	    height: 5,
	    curveSegments: 12,
	    
	    bevelThickness: 1,
	    bevelSize: 1,
	    bevelEnabled: true
	    
	});
	
	var textMaterial = new THREE.MeshPhongMaterial( 
	    { color: 0xff0000, specular: 0xffffff }
	);
	
	var mesh = new THREE.Mesh( textGeometry, textMaterial );
	mesh.position.z = -20;
	scene.add( mesh );
	
    }); 

*/


    var wpos = new THREE.Vector3(0,0,0);
    var count = 0;

    //pivot point should be rotation axis
    for(var j = 1; j<4; j++) {
	for(var k = 1; k<4; k++) {
	    for(var l = 1; l<4; l++) {
		//parent.children[count++].position.set(2.0*(j-1)-2.0,2.0*(k-1)-2.0,2.0*(l-1)-2.0);
		parent.children[count++].children[0].position.set(2.0*(j-1)-2.0,2.0*(k-1)-2.0,2.0*(l-1)-2.0);
		
	    }
	}
    }
    
    paintCube(parent);
    //Find Cube Left Top Back
    for(var i = 0; i<parent.children.length; i++) {
	var tmp = parent.children[i].children[0].position;
	if(tmp.x == 2.0 && tmp.y == 2.0 && tmp.z == -2.0) {
	    console.log("RightTopBack is cube: "+i);
	}
    }
    //parent.children[6].position.x=-2.0;
    /*
      parent.children[8].position.x=6.0;
      parent.children[8].children[0].position.x=6.0;
      //parent.children[0].children[0].rotation.x=2.0;
      console.log(parent.children[0].children[0]);
    */
    
    grid.addAttribute('position',new THREE.BufferAttribute(grid_vertices,3));
    let grid_lines = new THREE.LineSegments(grid, new THREE.LineBasicMaterial());
    //scene.add(grid_lines);
    
    var rotWorldMatrix;
    var finish = false;
    var doRotateTop = false;
    var doRotateLeft = false;
    var doRotateBottom = false;
    var doRotateRight = false;
    var doRaise = true;
    var explode = false;
    var counting = 0;
    var stopCube = false;
    this.frame = 0;
    function animate() {
	requestAnimationFrame( animate );
	this.frame++;
	if(doRaise == true) {
	    if(mesh2.position.y>=-10.0) {
		mesh2.position.y-=0.02;

	    }
	    else {
		doRaise = false;
		doRotateTop = true;
	    }
	}
	if(doRaise == false) {
	    mesh2.scale.x-=0.01;
	    mesh2.scale.z-=0.01;
	    mesh2.scale.y-=0.01;
	    mesh2.rotation.z+=0.02;
	    mesh2.material.opacity-=0.01;
	}
	if(explode==false){
	    checkRotation();
	}
	/*camera.position.x+=0.04;
	camera.position.z-=0.04;
	camera.position.y-=0.04;
	camera.rotation.y+=0.008;
	camera.rotation.x+=0.008;
	*/
	//	light.position.x+=1.0;

	if(doRotateTop==true && stopCube ==false) {
	    if(rotateTop(parent) == true) {
		doRotateTop=false;	    
		doRotateLeft=true;
		
	    }
	}
	if(!doRotateTop && doRotateLeft && stopCube ==false) {
	    if(rotateLeft(parent) == true) {
		doRotateLeft=false;
		doRotateBottom = true;
	    }
    	    
	}
	if(!doRotateTop && !doRotateLeft && doRotateBottom && stopCube == false) {
	    if(rotateBottom(parent) == true) {
		doRotateBottom=false;
		doRotateRight=true;
	    }
	}
	if(!doRotateTop && !doRotateLeft && !doRotateBottom && doRotateRight && stopCube ==false) {
	    if(rotateRight(parent) == true) {
		doRotateRight=false;
		doRotateTop = true;
		explode=false;
	    }
    	    
	}
	
	if(explode==true){
	    //console.log(frame);
	    if(this.frame<900) {
		doExplode(parent);
		//jupiter2.earthMesh.scale.x=0.5;
		//jupiter2.earthMesh.scale.y=0.5;
		//jupiter2.earthMesh.scale.z=0.5;
	    }
	    else{
		scene.remove(parent);
		camera.rotation.y+=0.001;
		
		
		//camera.rotation.y+=0.001;
		//camera.position.z+=0.001;
	    }
	    //camera.rotation.x+=0.001;
	    
	    camera.rotation.y-=0.001;
	}
	
	renderer.render( scene, camera );
    }
    
    console.log("position 6");
    
    animate();
    
    function getTop(obj) {
	var tmp = [];
	for(var i = 0; i<obj.children.length; i++) {
	    if(obj.children[i].children[0].position.y==2.0) {
		tmp.push(i);
	    }
	}
	return tmp;
    }
    function getBottom(obj) {
	var tmp = [];
	for(var i = 0; i<obj.children.length; i++) {
	    if(obj.children[i].children[0].position.y==-2.0) {
		tmp.push(i);
	    }
	}
	return tmp;
    }
    function getFront(obj) {
	var tmp = [];
	for(var i = 0; i<obj.children.length; i++) {
	    if(obj.children[i].children[0].position.z==2.0) {
		tmp.push(i);
	    }
	}
	return tmp;
    }
    function getLeft(obj) {
	var tmp = [];
	for(var i = 0; i<obj.children.length; i++) {
	    if(obj.children[i].children[0].position.x==-2.0) {
		tmp.push(i);
	    }
	}
	return tmp;
    }
    function getRight(obj) {
	var tmp = [];
	for(var i = 0; i<obj.children.length; i++) {
	    if(obj.children[i].children[0].position.x==2.0) {
		tmp.push(i);
	    }
	}
	return tmp;
    }
    function getBack(obj) {
	var tmp = [];
	for(var i = 0; i<obj.children.length; i++) {
	    if(obj.children[i].children[0].position.z==-2.0) {
		tmp.push(i);
	    }
	}
	return tmp;
    }

    function getMiddle(obj) {
	var tmp = [];
	for(var i = 0; i<obj.children.length; i++) {
	    if(obj.children[i].children[0].position.z==0.0 && obj.children[i].children[0].position.y==0.0 && obj.children[i].children[0].position.x == 0.0) {
		tmp.push(i);
	    }
	}
	return tmp;
    }

    
    // 0:right, 1:left, 2:top, 3:bottom, 4:front, 5:back
    function getGroup(obj,choice) {
	var tmp = [];
	switch(choice) {
	case 0:
	    for(var i = 0; i<obj.children.length; i++) {
		if(obj.children[i].children[0].position.x==2.0) {
		    tmp.push(i);
		}
	    }
	    break;
	case 1:
	    for(var i = 0; i<obj.children.length; i++) {
		if(obj.children[i].children[0].position.x==-2.0) {
		    tmp.push(i);
		}
	    }
	    break;
	case 2:
	    for(var i = 0; i<obj.children.length; i++) {
		if(obj.children[i].children[0].position.y==2.0) {
		    tmp.push(i);
		}
	    }
	    break;
	case 3:
	    for(var i = 0; i<obj.children.length; i++) {
		if(obj.children[i].children[0].position.y==-2.0) {
		    tmp.push(i);
		}
	    }
	    break;
	case 4:
	    for(var i = 0; i<obj.children.length; i++) {
		if(obj.children[i].children[0].position.z==2.0) {
		    tmp.push(i);
		}
	    }
	case 5:
	    for(var i = 0; i<obj.children.length; i++) {
		if(obj.children[i].children[0].position.z==-2.0) {
		    tmp.push(i);
		}
	    }
	    break;
	default:
	    
	}
	return tmp;
    }

    // 0:right, 1:left, 2:top, 3:bottom, 4:front, 5:back
    function rotateTop(obj) {
	var choice = 2;
	var max = Math.PI/2;
	var group = getGroup(obj,choice);
	var axis = new THREE.Vector3(0.0,1.0,0.0);
	var v = new THREE.Vector3();
	var done = false;
	for(var i = 0; i<group.length; i++) {
	    obj.children[group[i]].rotation.toVector3(v);
	    if(v.getComponent(1)<=Math.PI/2-0.05) {
		obj.children[group[i]].rotateOnWorldAxis(axis,this.speed);
		//console.log(obj.children[group[i]].rotation);
		
//		console.log(v.getComponent(1));
		    //obj.children[group[i]].rotation.y+=this.speed;
		}
	    else {
		updateCube(obj,group);
		done=true;
		return done;
	    }
	}
	return done;
    }
    function rotateLeft(obj){
	var ax = new THREE.Vector3(1.0,0.0,0.0);
	var radians = 0.01;
	var done = false;
	var arr = getLeft(obj);
	for(var i = 0; i<arr.length; i++) {
	    if(obj.children[arr[i]].rotation.x<=Math.PI/2) {
		obj.children[arr[i]].rotation.x+=this.speed;
	    }
	    else{
		updateCube(obj,arr);
		done=true;
		return done;
	    }
	}
	return done;
    }
    function rotateRight(obj){
	var ax = new THREE.Vector3(1.0,0.0,0.0);
	var radians = 0.01;
	var done = false;
	var arr = getRight(obj);
	for(var i = 0; i<arr.length; i++) {
	    if(obj.children[arr[i]].rotation.x<=Math.PI/2) {
		obj.children[arr[i]].rotation.x+=this.speed;
	    }
	    else{
		updateCube(obj,arr);
		done=true;
		return done;
	    }
	}
	return done;
    }
    
  /*  function rotateTop(obj) {
	var ax = new THREE.Vector3(0.0,1.0,0.0);
	var radians = 0.01;
	var done = false;
	var pos = new THREE.Vector3();
	var arr = getTop(obj);
	for(var i = 0; i<arr.length; i++) {
	    if(obj.children[arr[i]].rotation.y<=Math.PI/2) {
		obj.children[arr[i]].rotation.y+=this.speed;
	    }
	    else{
		updateCube(obj,arr);
		done=true;
		return done;
	    }
	}
	return done;
    }
*/
    function rotateBottom(obj) {
	var done = false;
	var pos = new THREE.Vector3();
	var arr = getBottom(obj);
	for(var i = 0; i<arr.length; i++) {
	    if(obj.children[arr[i]].rotation.y<=Math.PI/2) {
		obj.children[arr[i]].rotation.y+=this.speed;
	    }
	    else{
		updateCube(obj,arr);
		done=true;
		return done;
	    }
	}
	return done;
    }
    var mycount = 0;
    function updateCube(obj, arr) {
	//console.log(mycount++);
	//SHOULD TRY TO UPDATE MATRIX/WORLD SOMEWHERE IN THIS FUNCTION
	
	//console.log("update cube");	    
	for(var i = 0; i<arr.length; i++) {
	    var pos;// = new THREE.Vector3();
	    
	    //Get new world coordinates
	    obj.children[arr[i]].children[0].getWorldPosition(obj.children[arr[i]].children[0].position);
	    
/*	    if(arr[i]==24) {
		console.log(obj.children[arr[i]].children[0].getWorldDirection());
	    }
*/	    
	    //Get rotation from pivot point
	    var x = obj.children[arr[i]].rotation.x;
	    var y = obj.children[arr[i]].rotation.y;
	    var z = obj.children[arr[i]].rotation.z;
	    var ax;
//	    console.log("Rot: "+x+" "+y+" "+z);
	    if(x>y && x>z){
		console.log("X");
		ax = new THREE.Vector3(1.0,0.0,0.0);
	    }
	       if(y>x && y>z) {
		console.log("Y");
		ax = new THREE.Vector3(0.0,1.0,0.0);
	    }
	       if(z>x && z>y) {
		console.log("Z");
		ax = new THREE.Vector3(0.0,0.0,1.0);
	    }
	    if(arr[i]==240){
		console.log("Rotation to be added: "+x+" "+y+" "+z+" ");
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
	    if(arr[i]==240) {
		console.log(obj.children[arr[i]].children[0].rotation);
	    }
	    
	    //	console.log(obj.children[arr[i]].children[0].rotation.y);
	    //obj.children[arr[i]].children[0].rotation.x = Math.round(obj.children[arr[i]].children[0].rotation.x);
	    //obj.children[arr[i]].children[0].rotation.y = Math.round(obj.children[arr[i]].children[0].rotation.y);
	    //obj.children[arr[i]].children[0].rotation.z = Math.round(obj.children[arr[i]].children[0].rotation.z);
	    
	    
	    
	}
	
	/*    console.log(
	      obj.children[24].children[0].rotation.x+" "+
	      obj.children[24].children[0].rotation.y+" "+
	      obj.children[24].children[0].rotation.z+" ");	*/
    }
    function paintCube(parent) {
	var orange = 0xfd6a02;
	var blue = 0x0000ff;
	var yellow = 0xffff00;
	var green = 0x008000;
	var white = 0xffffff;
	var red = 0xff0000;
	var black = 0x8a795d;
	var tmp = getTop(parent);
	
//	console.log("Farger disse");
	//    console.log(tmp);
	for(var i = 0; i<parent.children.length; i++) {
	    //console.log(i);
	    for(var j = 0; j<parent.children[i].children[0].geometry.faces.length; j++) {
		parent.children[i].children[0].geometry.faces[j].color.setHex(black);
	    }
	}
	for(var i = 0; i<tmp.length; i++) {
	    parent.children[tmp[i]].children[0].geometry.faces[4].color.setHex(white);
	    parent.children[tmp[i]].children[0].geometry.faces[5].color.setHex(white);
	}
	tmp = getLeft(parent);
	for(var i = 0; i<tmp.length; i++){
	    parent.children[tmp[i]].children[0].geometry.faces[2].color.setHex(green);
	    parent.children[tmp[i]].children[0].geometry.faces[3].color.setHex(green);
	    parent.children[tmp[i]].children[0].geometry.faces[0].color.setHex(black);
	    parent.children[tmp[i]].children[0].geometry.faces[1].color.setHex(black);
	}
	tmp = getFront(parent);
	for(var i = 0; i<tmp.length; i++){
	    parent.children[tmp[i]].children[0].geometry.faces[8].color.setHex(red);
	    parent.children[tmp[i]].children[0].geometry.faces[9].color.setHex(red);
	}
	tmp = getBottom(parent);
	for(var i = 0; i<tmp.length; i++){
	    parent.children[tmp[i]].children[0].geometry.faces[6].color.setHex(yellow);
	    parent.children[tmp[i]].children[0].geometry.faces[7].color.setHex(yellow);
	}
	tmp = getRight(parent);
//	console.log(tmp);
	for(var i = 0; i<tmp.length; i++){
	    parent.children[tmp[i]].children[0].geometry.faces[0].color.setHex(blue);
	    parent.children[tmp[i]].children[0].geometry.faces[1].color.setHex(blue);
	    parent.children[tmp[i]].children[0].geometry.faces[2].color.setHex(black);
	    parent.children[tmp[i]].children[0].geometry.faces[3].color.setHex(black);
	}
	tmp = getBack(parent);
	for(var i = 0; i<tmp.length; i++){
	    parent.children[tmp[i]].children[0].geometry.faces[10].color.setHex(orange);
	    parent.children[tmp[i]].children[0].geometry.faces[11].color.setHex(orange);
	}
	
	//parent.children[24].children[0].geometry.faces[4].color.setHex(0xf0f0f0);
    }
    function checkRotation(){
	var rotSpeed = 0.01;
	var x = camera.position.x,
	    y = camera.position.y,
	    z = camera.position.z;
	
	//	if (keyboard.pressed("left")){
	if(true) {
	    camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
	    camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
	}
	else if(false) {
	    //else if (keyboard.pressed("right")){
	    camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
	    camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
	}
	
	camera.lookAt(scene.position);
	
    }
    this.a = 0.01;
    function doExplode(obj) {
	this.a += 0.001;
	var top = getTop(obj);
	var bottom = getBottom(obj);
	var left = getLeft(obj);
	var right = getRight(obj);
	var front = getFront(obj);
	var back = getBack(obj);
	var middle = getMiddle(obj);	
	for(var i = 0; i<top.length; i++) {
	    obj.children[top[i]].rotation.x-=0.01;
	    obj.children[top[i]].position.y-=this.a;
	    //obj.children[top[i]].scale.z-=0.01;
	    //obj.children[top[i]].rotation.z+=0.2;
	    obj.children[top[i]].children[0].material.opacity-=0.01;
	}
	for(var i = 0; i<bottom.length; i++) {
	    obj.children[bottom[i]].rotation.x+=0.01;
	    obj.children[bottom[i]].position.y-=0.1;
	    //obj.children[bottom[i]].scale.z-=0.01;
	    //obj.children[top[i]].rotation.z+=0.2;
 	    obj.children[top[i]].children[0].material.opacity-=0.01;
	}
	
	for(var i = 0; i<left.length; i++) {
	    obj.children[left[i]].rotation.x+=0.01;
	    obj.children[left[i]].position.y-=0.1;
	    //obj.children[left[i]].scale.z-=0.01;
	    //obj.children[top[i]].rotation.z+=0.2;
	    obj.children[top[i]].children[0].material.opacity-=0.01;
	}
	for(var i = 0; i<right.length; i++) {
	    obj.children[right[i]].rotation.x+=0.01;
	    obj.children[right[i]].position.y-=0.1;
	    //obj.children[right[i]].scale.z-=0.01;
	    //obj.children[top[i]].rotation.z+=0.2;
	    obj.children[top[i]].children[0].material.opacity-=0.01;
	}
	for(var i = 0; i<front.length; i++) {
	    obj.children[front[i]].rotation.x+=0.01;
	    //obj.children[front[i]].scale.x-=0.01;
	    obj.children[front[i]].position.y-=0.1;
	    //obj.children[front[i]].scale.z-=0.01;
	    //obj.children[top[i]].rotation.z+=0.2;
	    obj.children[top[i]].children[0].material.opacity-=0.01;
	}
	for(var i = 0; i<back.length; i++) {
	    obj.children[back[i]].rotation.x-=0.01;
	    obj.children[back[i]].position.y-=0.1;
	    //obj.children[back[i]].scale.z-=0.01;
	    //obj.children[top[i]].children[0].rotation.z+=0.2;
	    obj.children[top[i]].children[0].material.opacity-=0.01;
	}
	for(var i = 0; i<middle.length; i++) {
	    obj.children[middle[i]].rotation.x-=0.01;
	    obj.children[middle[i]].position.y-=0.1;
	    //obj.children[back[i]].scale.z-=0.01;
	    //obj.children[top[i]].children[0].rotation.z+=0.2;
	    obj.children[top[i]].children[0].material.opacity-=0.01;
	    if(obj.children[top[i]].children[0].material.opacity<0.0) {
		return false;
	    }
	}
		
	
	return true;
    }
}
my();






function init() {
	
	var stats = initStats();

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xEEEEEE, 1);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(-40, 60, -10);
	spotLight.castShadow = true;
	scene.add( spotLight );
        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);

	var axes = new THREE.AxisHelper(20);

	scene.add(axes);

	var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);

	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 15;
	plane.position.y = 0;
	plane.position.z = 0;
	plane.receiveShadow = true;

	scene.add(plane);

	var cubeGeometry = new THREE.BoxGeometry(4, 4,4);
	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

	cube.position.x = -4;
	cube.position.y = 3;
	cube.position.z = 0;
	cube.castShadow = true;

	scene.add(cube);

	var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff});
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.castShadow = true;

	sphere.position.x = 20;
	sphere.position.y = 4;
	sphere.position.z = 2;


	scene.add(sphere);

	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);


	var controls = new function() {
		this.rotationSpeed = 0.02;
		this.bouncingSpeed = 0.03;
	}

	var gui = new dat.GUI();
	gui.add(controls, 'rotationSpeed', 0, 0.5);
	gui.add(controls, 'bouncingSpeed', 0, 0.5);



	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	renderScene();

	var step=0;
	function renderScene() {

		cube.rotation.x += controls.rotationSpeed;
		cube.rotation.y += controls.rotationSpeed;
		cube.rotation.z += controls.rotationSpeed;

		step += controls.bouncingSpeed;
		sphere.position.x = 20 + ( 10 * (Math.cos(step)));
		sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

		stats.update();
		requestAnimationFrame(renderScene);
		renderer.render(scene, camera);
	}

	window.addEventListener('resize', onResize, false);
	function onResize() {
		camera.aspect = window.innerWidth /window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
};

function initStats() {
	var stats = new Stats();
	stats.setMode(0);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.getElementById("Stats-output").appendChild( stats.domElement );
	return stats;
}

window.onload = init;

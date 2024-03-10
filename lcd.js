// Capture the webpage
html2canvas(document.body).then(canvas => {
    // Convert the canvas to a texture
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a curved mesh with the webpage texture
    const geometry = new THREE.PlaneGeometry(5, 3, 32); // Example geometry, adjust for curvature
    const material = new THREE.MeshBasicMaterial({map: texture});
    const curvedScreen = new THREE.Mesh(geometry, material);
    scene.add(curvedScreen);

    // Position the camera and render the scene
    camera.position.z = 5;
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});

class UnderwaterVisualization {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);

        // Create water surface
        this.createWaterSurface();
        
        // Create coordinate system
        this.createCoordinateSystem();

        // Initialize vehicles
        this.asv = this.createASV();
        this.auv = this.createAUV();
        
        // Add communication visualization
        this.commLine = null;

        // Set up camera position
        this.camera.position.set(50, 50, 50);
        this.camera.lookAt(0, 0, 0);

        // Add orbit controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        // Start animation loop
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    createWaterSurface() {
        const geometry = new THREE.PlaneGeometry(200, 200);
        const material = new THREE.MeshPhongMaterial({
            color: 0x0077be,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });
        const water = new THREE.Mesh(geometry, material);
        water.rotation.x = -Math.PI / 2;
        water.position.y = 0;
        this.scene.add(water);
    }

    createCoordinateSystem() {
        const size = 100;
        const divisions = 10;
        const gridHelper = new THREE.GridHelper(size, divisions, 0x000000, 0x000000);
        gridHelper.position.y = -25;
        this.scene.add(gridHelper);

        // Add axes
        const axesHelper = new THREE.AxesHelper(50);
        this.scene.add(axesHelper);
    }

    createASV() {
        const geometry = new THREE.BoxGeometry(5, 2, 3);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const asv = new THREE.Mesh(geometry, material);
        asv.position.set(0, 0, 0);
        this.scene.add(asv);
        return asv;
    }

    createAUV() {
        const geometry = new THREE.CylinderGeometry(1, 1, 6, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const auv = new THREE.Mesh(geometry, material);
        auv.rotation.z = Math.PI / 2;
        auv.position.set(100, -10, 0);
        this.scene.add(auv);
        return auv;
    }

    updateVehiclePositions(asvPos, auvPos) {
        this.asv.position.set(asvPos.x, asvPos.y, asvPos.z);
        this.auv.position.set(auvPos.x, auvPos.y, auvPos.z);
    }

    showCommunication(success, source, target) {
        if (this.commLine) {
            this.scene.remove(this.commLine);
        }

        const material = new THREE.LineBasicMaterial({
            color: success ? 0x00ff00 : 0xff0000,
            linewidth: 2
        });

        const points = [];
        points.push(new THREE.Vector3(source.x, source.y, source.z));
        points.push(new THREE.Vector3(target.x, target.y, target.z));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        this.commLine = new THREE.Line(geometry, material);
        this.scene.add(this.commLine);

        // Remove the line after 2 seconds
        setTimeout(() => {
            if (this.commLine) {
                this.scene.remove(this.commLine);
                this.commLine = null;
            }
        }, 2000);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
} 
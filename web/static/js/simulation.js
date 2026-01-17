class SimulationController {
    constructor() {
        this.visualization = new UnderwaterVisualization(document.getElementById('three-container'));
        this.setupEventListeners();
        this.simulationRunning = false;
    }

    setupEventListeners() {
        const form = document.getElementById('simulation-form');
        form.addEventListener('submit', (e) => this.handleSimulationStart(e));
    }

    async handleSimulationStart(e) {
        e.preventDefault();
        if (this.simulationRunning) return;

        const formData = new FormData(e.target);
        const params = {
            asv: {
                start_position: [
                    parseFloat(formData.get('asv_x')),
                    parseFloat(formData.get('asv_y')),
                    parseFloat(formData.get('asv_z'))
                ],
                velocity: parseFloat(formData.get('asv_velocity'))
            },
            auv: {
                start_position: [
                    parseFloat(formData.get('auv_x')),
                    parseFloat(formData.get('auv_y')),
                    parseFloat(formData.get('auv_z'))
                ],
                velocity: parseFloat(formData.get('auv_velocity'))
            },
            simulation: {
                duration: parseInt(formData.get('duration')),
                time_step: parseFloat(formData.get('time_step'))
            }
        };

        this.simulationRunning = true;
        document.getElementById('start-simulation').disabled = true;
        
        try {
            const response = await fetch('/api/start_simulation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) {
                throw new Error('Simulation failed to start');
            }

            const simulationId = await response.json();
            this.startSimulationUpdates(simulationId);
        } catch (error) {
            console.error('Error starting simulation:', error);
            this.simulationRunning = false;
            document.getElementById('start-simulation').disabled = false;
        }
    }

    async startSimulationUpdates(simulationId) {
        const statsContent = document.getElementById('stats-content');
        
        while (this.simulationRunning) {
            try {
                const response = await fetch(`/api/simulation_status/${simulationId}`);
                if (!response.ok) {
                    throw new Error('Failed to get simulation status');
                }

                const status = await response.json();
                
                // Update visualization
                this.visualization.updateVehiclePositions(
                    status.asv_position,
                    status.auv_position
                );

                // Show communication if it occurred
                if (status.last_communication) {
                    this.visualization.showCommunication(
                        status.last_communication.success,
                        status.last_communication.source,
                        status.last_communication.target
                    );
                }

                // Update statistics
                statsContent.textContent = this.formatStats(status);

                if (status.completed) {
                    this.simulationRunning = false;
                    document.getElementById('start-simulation').disabled = false;
                    break;
                }

                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                console.error('Error getting simulation status:', error);
                this.simulationRunning = false;
                document.getElementById('start-simulation').disabled = false;
                break;
            }
        }
    }

    formatStats(status) {
        return `
Time: ${status.current_time.toFixed(1)}s
ASV Position: (${status.asv_position.x.toFixed(1)}, ${status.asv_position.y.toFixed(1)}, ${status.asv_position.z.toFixed(1)})
AUV Position: (${status.auv_position.x.toFixed(1)}, ${status.auv_position.y.toFixed(1)}, ${status.auv_position.z.toFixed(1)})
Distance: ${status.distance.toFixed(1)}m
Last Communication: ${status.last_communication ? 
    `${status.last_communication.source} -> ${status.last_communication.target} (${status.last_communication.success ? 'Success' : 'Failed'})` : 
    'None'}
SNR: ${status.last_communication ? status.last_communication.snr.toFixed(1) + ' dB' : 'N/A'}
Propagation Delay: ${status.last_communication ? (status.last_communication.prop_delay * 1000).toFixed(1) + ' ms' : 'N/A'}
`;
    }
}

// Initialize the simulation controller when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SimulationController();
}); 
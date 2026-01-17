from flask import Flask, request, jsonify, send_from_directory
import os
import subprocess
import yaml
import re
import math

app = Flask(__name__, static_folder='dist', template_folder='dist')

PARAMETERS_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../parameters.yaml'))
SIM_PY_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../sim.py'))
VISUALIZE_PY_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../visualize.py'))

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    # Serve static files from dist
    return send_from_directory(app.static_folder, path)

def update_env_file(params):
    env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../eigen_arrival.env'))
    with open(env_path, 'r') as f:
        lines = f.readlines()
    asv_pos = params['nodes']['asv']['start_position']
    auv_pos = params['nodes']['auv']['start_position']
    receiver = params.get('receiver', 'asv')
    # Determine source and receiver
    if receiver == 'asv':
        rx_pos = asv_pos
        tx_pos = auv_pos
    else:
        rx_pos = auv_pos
        tx_pos = asv_pos

    # Convert Cartesian to cylindrical coordinates relative to the source
    x_rx, y_rx, z_rx = rx_pos
    x_tx, y_tx, z_tx = tx_pos

    # Receiver depth is its z-coordinate
    rx_depth = z_rx

    # Range in km
    range_m = math.sqrt((x_rx - x_tx)**2 + (y_rx - y_tx)**2)
    range_km = range_m / 1000.0

    # Bearing in degrees (clockwise from North/Y-axis)
    bearing_rad = math.atan2( y_rx - y_tx, x_rx - x_tx) # atan2(dx, dy)
    bearing_deg = math.degrees(bearing_rad)
    if bearing_deg < 0:
        bearing_deg += 360
        print(bearing_deg)

    for i, line in enumerate(lines):
        if '! Receiver depths in meters' in line:
            lines[i] = f"{rx_depth} /  ! Receiver depths in meters\n"
        elif '! Receiver ranges in km' in line:
             lines[i] = f"{range_km} / ! Receiver ranges in km\n"
        elif '! Bearings in degrees' in line:
             lines[i] = f"{bearing_deg} / ! Bearings in degrees\n"
        elif '! X cordinates of S (km)' in line:
            lines[i] = f"{tx_pos[0]/1000.0}  / ! X cordinates of S (km)\n"
        elif '! Y cordinates of S (km)' in line:
            lines[i] = f"{tx_pos[1]/1000.0} /  ! Y cordinates of S (km)\n"
        elif '! Depth cordinates of S (m)' in line:
            lines[i] = f"{tx_pos[2]} / ! Depth cordinates of S (m)\n"
    with open(env_path, 'w') as f:
        f.writelines(lines)

@app.route('/api/update_parameters', methods=['POST'])
def update_parameters():
    params = request.json
    try:
        with open(PARAMETERS_PATH, 'w') as f:
            yaml.safe_dump(params, f)
        # Update eigen_arrival.env as well
        update_env_file(params)
        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/simulate', methods=['POST'])
def simulate():
    try:
        # Path to the input file
        env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../eigen_arrival'))
        # Try to run bellhopcxx3d from PATH, else from parent directory
        try:
            result = subprocess.run(['bellhopcxx3d', env_path], capture_output=True, text=True)
        except FileNotFoundError:
            # Try from parent directory
            bh_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../bellhopcxx3d'))
            result = subprocess.run([bh_path, env_path], capture_output=True, text=True)
        if result.returncode == 0:
            return jsonify({'status': 'done', 'output': result.stdout})
        else:
            return jsonify({'status': 'error', 'output': result.stderr}), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/visualize', methods=['POST'])
def visualize():
    try:
        result = subprocess.run(['python3', VISUALIZE_PY_PATH], capture_output=True, text=True)
        if result.returncode == 0:
            return jsonify({'status': 'done', 'output': result.stdout})
        else:
            return jsonify({'status': 'error', 'output': result.stderr}), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 
'''
* Flask webserver
* This module works with db.py
*
* API: /api/
*  - handle REST GET request from JavaScript Watchman (Watchman-Worker)
*  - receive REST POST request from Watchman and make task thread
*
* Internal API : /iapi/
*  - task thread provide the result as REST POST.
*
* 2017/11/30
* @author Yuichi Ito yuichi@yuichi.com
'''

from flask import *
import requests
import json
import time
import threading

#import topology
import db



DEBUG = True
HOST = '0.0.0.0'
PORT = 8080
TOPOLOGY_PATH = 'http://0.0.0.0:{}/static/p5.u1.watchman.topology.json'.format(PORT)
TOPOLOGY_INITIAL_DICT = {}
TOPOLOGY_GET_AFTER_SEC = 3

def get_current_time():
    return '{0:.4f}'.format(time.time())

app = Flask(__name__)
t = get_current_time()
timestamp_last_topology_update = t
timestamp_last_operation_update = t
topology = TOPOLOGY_INITIAL_DICT

#################
## STATIC FILE ##
#################

@app.route('/')
def root():
    return render_template('index.html')


###########################
## REST API FOR WATCHMAN ##
###########################

# status

@app.route('/api/status/topology', methods=['GET'])
def api_status_topology():
    result = {
        'result':True,
        'data':{
            'current':get_current_time(),
            'last':timestamp_last_topology_update
        }
    }
    return make_response(jsonify(result), 200)


@app.route('/api/status/operation', methods=['GET'])
def api_status_operation():
    result = {
        'result':True,
        'data':{
            'current':get_current_time(),
            'last':timestamp_last_operation_update
        }
    }
    return make_response(jsonify(result), 200)


# topology

@app.route('/api/topology', methods=['GET'])
def api_topology():
    if topology == TOPOLOGY_INITIAL_DICT:
        result = {
            'result':False,
            'data':topology,
            'error':"failed to load topology definition at '{}'".format(TOPOLOGY_PATH)
        }
        return make_response(jsonify(result), 500)

    else:
        result = {
            'result':True,
            'data':topology
        }
        return make_response(jsonify(result), 200)

# operation

@app.route('/api/operation', methods=['GET'])
def api_operation():
    result = {
        'result':True,
        'data':{},
        }
    return make_response(jsonify(result), 200)

# gear get

@app.route('/api/gear/<string:gear_name>', methods=['GET'])
def api_gear(gear_name):
    d = db.get_gear(gear_name)
    if d['exist']:
        result = {
            'result':True,
            'data':d['data']
        }
        return make_response(jsonify(result), 200)

    else:
        result = {
            'result':False,
            'data':{},
            'error':'gear "{}" does not exist'.format('gearname')
        }
        return make_response(jsonify(result), 404)

########################################
## REST API FROM INTERNAL TASK THREAD ##
########################################

@app.route('/iapi/gear/<string:gear_name>', methods=['POST'])
def iapi_gear(gear_name):
    return make_response(jsonify({}), 200)

def updateTopology():
    global topology
    time.sleep(TOPOLOGY_GET_AFTER_SEC)
    try:
        topology = requests.get(TOPOLOGY_PATH).json()
        print('Successed to load topology json file "{}"'.format(TOPOLOGY_PATH))

    except e:
        topology = TOPOLOGY_INITIAL_DICT
        print('Failed to load topology json file "{}"'.format(TOPOLOGY_PATH))
        print(e)

if __name__ == '__main__':
    app.debug = DEBUG
    threading.Thread(target=updateTopology).start()
    app.run(host=HOST, port=PORT)

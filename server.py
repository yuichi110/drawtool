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
import json
import time

DEBUG = True
HOST = '0.0.0.0'
PORT = 8080

def get_current_time():
    return '{0:.4f}'.format(time.time())

app = Flask(__name__)
t = get_current_time()
print(t)
timestamp_last_topology_update = t
timestamp_last_operation_update = t

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
    result = {
        'result':True,
        'data':{
            'width':1920,
            'height':1080,
            'gears':[
                {
                'name':'router01', 'size':100, 'color':'orange',
                'x':100, 'y':100,
                'left-nics':['e0'],
                'bottom-nics':[],
                'right-nics':[],
                'top-nics':[],
                },
            ]
        }
    }
    return make_response(jsonify(result), 200)

def api_gear():
    result = {
        'result':True,
        'data':{
            'name':'router01',
            'status':'up',
            'management':'10.0.0.1',
            'nics':[
                {'name':'e0', 'status':'up', 'type':'l3', 'ip':'10.0.0.1'},
            ]
            # cpu
            # memory
            # disk
        }
    }
    return make_response(jsonify(result), 200)

########################################
## REST API FROM INTERNAL TASK THREAD ##
########################################

if __name__ == '__main__':
    app.debug = DEBUG
    app.run(host=HOST, port=PORT)

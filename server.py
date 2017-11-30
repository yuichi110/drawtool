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
app = Flask(__name__)

#################
## STATIC FILE ##
#################

@app.route('/')
def root():
    return render_template('index.html')


###########################
## REST API FOR WATCHMAN ##
###########################

@app.route('/api/test', methods=['GET'])
def api_test():
    result = {
        'result':True,
        'data':{
            'hello':'world',
            'hello2':'world2'
        }
    }
    return make_response(jsonify(result), 200)


########################################
## REST API FROM INTERNAL TASK THREAD ##
########################################

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=80)

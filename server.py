from flask import *
import json

app = Flask(__name__)

@app.route('/')
def root():
    return render_template('index.html')

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


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=80)

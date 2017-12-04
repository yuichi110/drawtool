'''
* Flask webserver
*   Nothing special
*
* 2017/12/03
* @author Yuichi Ito yuichi@yuichi.com
'''

from flask import *
app = Flask(__name__)

HOST = '0.0.0.0'
PORT = 8080

@app.route('/')
def root():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host=HOST, port=PORT)

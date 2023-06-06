from flask import Flask, jsonify

app = Flask(__name__)

@app.route('api/ai/describtion')
def runDesc():
    return jsonify({'message': 'Hello World'})
@app.route('api/ai/image')
def runImage():
    return jsonify({'message': 'Hello World'})
@app.route('api/ai/dialect')
def reunDialect():
    return jsonify({'message': 'Hello World'})


if __name__ == '__main__':
    app.run()
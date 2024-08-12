from flask import Flask, request, jsonify, send_file

import DBUtility
import pandas as pd
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)

@app.route("/get-data", methods =['GET'])
def get_data():
    try:
        items = DBUtility.storeDB["ItemList"].find()
        itemsDF = pd.DataFrame(list(items))
        if not items:
            return jsonify({'error': 'No items found'}), 500
        itemsJSON = itemsDF.to_json(orient='records')
        return itemsJSON
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/add-to-batch", methods=["POST"])
def add_to_batch():
    try:
        data = request.get_json() #request will ideally just be a singular id
        id = data["_id"]
        item = DBUtility.searchByID(id)
        print(item)
        if type(item) == str:
            return jsonify({'error': 'No matching item for ID provided'}), 500 #this should never happen
        if item.iloc[0]['count'] == 0:
            return jsonify({'error': 'There are no items left matching that ID'}), 500
        itemJSON = item.to_json(orient='records')
        return jsonify({'Item is available to be added to batch': itemJSON}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#add one for running batch. Should have POST and GET. maybe use PUT. Also maybe if you send the whole batch at once, could change it to just be a POST and handle logic on frontend
@app.route("/run-batch", methods = ["POST"])
def run_batch():
    try:
        data = request.get_json() #json here will be a list of IDs

        batch = pd.DataFrame()
        items = data["_id"]
        for item in items:
            batch = pd.concat([batch, DBUtility.searchByID(item)], ignore_index=True) #this is fine cause request will only get valid IDs
        batchJSON = batch.to_json()
        return jsonify({batchJSON}, 200)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


@app.route('/images/<filename>')
def serve_image(filename):
    try:
        image_path = os.path.join('images', filename)
        return send_file(image_path)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/decrement-count/<id>')
def decrement_count(id):
    try:
        item = DBUtility.searchByID(id)
        DBUtility.updateCount(id, str(int(item['count']) - 1))
        return jsonify({'Count updated successfully for': id}, 200)
    except Exception as e:
        return jsonify({'error': str(e)}, 500)

@app.route("/")
def home():
    return jsonify({"test": "test"})


if __name__ == "__main__":
    app.run(debug=True)
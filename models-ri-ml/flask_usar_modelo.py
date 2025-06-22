from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Cargar el modelo
with open('../backend/models/modelo_escala_svc.pkl', 'rb') as f:
    objetos = pickle.load(f)
    modelo = objetos['modelo']
    scaler = objetos['scaler']

# Cargar datos de test escalados
X_test = pd.read_csv('X_test_scaled.csv')
y_test = pd.read_csv('y_test.csv').squeeze()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])
    pred = modelo.predict(df)
    proba = modelo.predict_proba(df)
    return jsonify({'prediccion': int(pred[0]),
                    'probabilidadd de tener diabetes': float(proba[0][1]),
                    'probabilidad de no tener diabetes': float(proba[0][0])})

if __name__ == '__main__':
    app.run()
# modelo.py

import pandas as pd
from datasets import load_dataset
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
import pickle

# Cargar y preprocesar datos (igual que antes)
ds = load_dataset("marianeft/diabetes_prediction_dataset")
df = ds["train"].to_pandas()
dataset = df.copy()
gender_cols = pd.get_dummies(dataset['gender'], prefix='gnd', dtype=int)
dataset = dataset.drop('gender', axis=1)
dataset = pd.concat([dataset, gender_cols], axis=1)
smoking_cols = pd.get_dummies(dataset['smoking_history'], prefix='smoking', dtype=int)
dataset = dataset.drop('smoking_history', axis=1)
dataset = pd.concat([dataset, smoking_cols], axis=1)

X = dataset.drop("diabetes", axis=1)
y = dataset["diabetes"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Escalar los datos
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Entrenar el modelo
svc = SVC(kernel='rbf', probability=True, random_state=42)
svc.fit(X_train_scaled, y_train)

# Guardar modelo y escalador juntos
with open('../backend/models/modelo_escala_svc.pkl', 'wb') as f:
    pickle.dump({'modelo': svc, 'scaler': scaler}, f)

# Guardar X_test y y_test si lo necesitas
pd.DataFrame(X_test_scaled, columns=X.columns).to_csv('X_test_scaled.csv', index=False)
y_test.to_csv('y_test.csv', index=False)

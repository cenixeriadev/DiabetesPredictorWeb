import pandas as pd
from datasets import load_dataset
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
import pickle

# Cargar el dataset
ds = load_dataset("marianeft/diabetes_prediction_dataset")
df = ds["train"].to_pandas()

# Preprocesamiento
dataset = df.copy()
gender_cols = pd.get_dummies(dataset['gender'], prefix='gnd', dtype=int)
dataset = dataset.drop('gender', axis=1)
dataset = pd.concat([dataset, gender_cols], axis=1)
smoking_cols = pd.get_dummies(dataset['smoking_history'], prefix='smoking', dtype=int)
dataset = dataset.drop('smoking_history', axis=1)
dataset = pd.concat([dataset, smoking_cols], axis=1)

# Separar variables
X = dataset.drop("diabetes", axis=1)
y = dataset["diabetes"]

# Dividir en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entrenar el modelo SVC
svc = SVC(kernel='rbf', probability=True, random_state=42)
svc.fit(X_train, y_train)

# Guardar el modelo entrenado
with open('../backend/models/modelo_svc.pkl', 'wb') as f:
    pickle.dump(svc, f)
import joblib
import numpy as np
import pandas as pd
from pathlib import Path
import os
from typing import Dict, Any, Optional

class ModelService:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.model_path = None
        self.scaler_path = None
        self.load_model()
        self.load_scaler()
    
    def load_scaler(self):
        """
        Carga el scaler desde la carpeta models.
        Busca automáticamente archivos .pkl o .joblib en la carpeta.
        """
        models_dir = Path(__file__).parent.parent / "models"
        
        if not models_dir.exists():
            raise FileNotFoundError(f"La carpeta models no existe: {models_dir}")
        
        # Buscar archivos de scaler
        scaler_files = list(models_dir.glob("scaler_*.pkl")) + list(models_dir.glob("scaler_*.joblib"))
        
        if not scaler_files:
            raise FileNotFoundError("No se encontraron archivos de scaler (.pkl o .joblib) en la carpeta models")
        
        # Tomar el primer scaler encontrado
        self.scaler_path = scaler_files[0]
        
        try:
            self.scaler = joblib.load(self.scaler_path)
            print(f"Scaler cargado exitosamente desde: {self.scaler_path}")
        except Exception as e:
            raise Exception(f"Error al cargar el scaler: {str(e)}")
    
    def load_model(self):
        """
        Carga el modelo de machine learning desde la carpeta models.
        Busca automáticamente archivos .pkl o .joblib en la carpeta.
        """
        models_dir = Path(__file__).parent.parent / "models"
        
        if not models_dir.exists():
            raise FileNotFoundError(f"La carpeta models no existe: {models_dir}")
        
        # Buscar archivos de modelo
        model_files = list(models_dir.glob("*.pkl")) + list(models_dir.glob("*.joblib"))
        
        if not model_files:
            raise FileNotFoundError("No se encontraron archivos de modelo (.pkl o .joblib) en la carpeta models")
        
        # Tomar el primer modelo encontrado
        self.model_path = model_files[0]
        
        try:
            self.model = joblib.load(self.model_path)
            print(f"Modelo cargado exitosamente desde: {self.model_path}")
        except Exception as e:
            raise Exception(f"Error al cargar el modelo: {str(e)}")
    
    def predict(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Realiza una predicción usando el modelo cargado.
        
        Args:
            data: Diccionario con los datos de entrada
            
        Returns:
            Diccionario con la predicción y probabilidad (si está disponible)
        """
        if self.model is None:
            raise Exception("No hay modelo cargado")
        
        try:
            # Convertir los datos a formato adecuado para el modelo
            features = self._prepare_features(data)
            
            # Realizar predicción
            prediction = self.model.predict(features)
            
            # Obtener probabilidades si el modelo las soporta
            try:
                probabilities = self.model.predict_proba(features)[:, 1]
                probability = float(np.max(probabilities))
            except AttributeError:
                probability = None
            
            # Interpretar la predicción
            prediction_label = self._interpret_prediction(prediction[0])
            
            return {
                'prediccion': prediction_label,
                'probabilidad': probability,
                'raw_prediction': int(prediction[0]) if isinstance(prediction[0], (int, np.integer)) else float(prediction[0])
            }
            
        except Exception as e:
            raise Exception(f"Error en la predicción: {str(e)}")
    
    def _prepare_features(self, data: Dict[str, Any]) -> np.ndarray:
        """
        Prepara las características para el modelo.
        """
        # Orden de características esperado por el modelo
        # Ajusta según tu modelo específico
        gender_map = {
            "Female": [1, 0, 0],
            "Male": [0, 1, 0],
            "Other": [0, 0, 1]
        }
        smoking_history_map = {
            "No Info": [1, 0, 0, 0, 0, 0],
            "Current": [0, 1, 0, 0, 0 , 0],
            "Ever": [0, 0, 1, 0, 0 , 0],
            "Former": [0, 0, 0, 1, 0 , 0],
            "Never": [0, 0, 0, 0, 1 , 0],
            "Not current": [0 ,0 , 0 , 0 ,0 ,1]
        }
        hypertension_value = 1 if data["hypertension"]=="Si" else 0
        heart_disease_value = 1 if data["heart_disease"]=="Si" else 0
        
        gender_str = data.get("gender", "Other")
        gnd_Female, gnd_Male, gnd_Other = gender_map.get(gender_str, [0, 0, 1])

        smoking_history_str = data.get("smoking_history", "No Info")
        smoking_No_Info, smoking_current, smoking_ever, smoking_former, smoking_never , smoking_not_current = smoking_history_map.get(smoking_history_str, [1, 0, 0, 0, 0 , 0])

        feature_order = [
            'age', 'hypertension',
            'heart_disease', 'bmi', 'HbA1c_level', 'blood_glucose_level',
            'gnd_Female','gnd_Male','gnd_Other','smoking_No Info',
            'smoking_current','smoking_ever','smoking_former',
            'smoking_never','smoking_not current'
        ]
        
        extended_data = data.copy()
        extended_data['gnd_Female'] = gnd_Female
        extended_data['gnd_Male'] = gnd_Male
        extended_data['gnd_Other'] = gnd_Other
        extended_data['hypertension'] = hypertension_value
        extended_data['heart_disease'] = heart_disease_value
        extended_data['smoking_No Info'] = smoking_No_Info
        extended_data['smoking_current'] = smoking_current
        extended_data['smoking_ever'] = smoking_ever
        extended_data['smoking_former'] = smoking_former
        extended_data['smoking_never'] = smoking_never
        extended_data['smoking_not current'] = smoking_not_current
        
        # Extraer características en el orden correcto
        features = []
        for feature in feature_order:
            features.append(extended_data.get(feature, 0.0))

        features_df = pd.DataFrame([features], columns=feature_order)
        
        # Aplicar el scaler si está cargado
        if self.scaler is not None:
            try:
                features_df = pd.DataFrame(self.scaler.transform(features_df), columns=feature_order)
                print("Features escaladas correctamente")
            except Exception as e:
                raise Exception(f"Error al escalar características: {str(e)}")
        else:
            print("Advertencia: No se aplicó escalado (scaler no cargado)")
        
        return features_df
    
    def _interpret_prediction(self, prediction) -> str:
        """
        Interpreta la predicción del modelo en un formato legible.
        Ajusta según tu modelo específico.
        """
        if isinstance(prediction, (int, np.integer)):
            return "Diabetes" if prediction == 1 else "No Diabetes"
        elif isinstance(prediction, (float, np.floating)):
            return "Diabetes" if prediction > 0.5 else "No Diabetes"
        else:
            return str(prediction)
    
    def get_model_info(self) -> Dict[str, Any]:
        """
        Retorna información sobre el modelo cargado.
        """
        if self.model is None:
            return {"error": "No hay modelo cargado"}
        
        info = {
            "model_path": str(self.model_path),
            "model_type": type(self.model).__name__,
            "loaded": True
        }
        
        # Agregar información específica del modelo si está disponible
        try:
            if hasattr(self.model, 'feature_names_in_'):
                info["features"] = list(self.model.feature_names_in_)
            if hasattr(self.model, 'n_features_in_'):
                info["n_features"] = self.model.n_features_in_
        except:
            pass
        
        return info

# Instancia global del servicio de modelo
model_service = ModelService()
import "../styles/Pag_Evaluacion.css";
import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function EvaluationPage() {
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        hypertension: '',
        heart_disease: '',
        smoking_history: '',
        bmi: '',
        HbA1c_level: '',
        blood_glucose_level: ''
    });

    const [predictionResult, setPredictionResult] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convertir los valores numéricos de string a número
            const numericFormData = {
                ...formData,
                age: parseFloat(formData.age),
                bmi: parseFloat(formData.bmi),
                HbA1c_level: parseFloat(formData.HbA1c_level),
                blood_glucose_level: parseInt(formData.blood_glucose_level, 10)
            };

            const apiUrl = "http://localhost:5000/api/v1/prediccion";
            const response = await axios.post(apiUrl, numericFormData, {
                withCredentials: true, // Importante para enviar cookies
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setPredictionResult(response.data);
        } catch (error) {
            console.error('Error en la predicción:', error);
            alert(`Error al realizar la predicción: ${error.response?.data?.error || error.message}`);
        }
    };

    const data = {
        labels: ['No Diabetes', 'Diabetes'],
        datasets: [
            {
                label: 'Probabilidad (%)',
                data: predictionResult ? [
                    predictionResult.probabilidad_clase_0 * 100,
                    predictionResult.probabilidad_clase_1 * 100
                ] : [0, 0],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            },
        ],
    };
    
    // Opciones para el gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        return `${context.dataset.label}: ${context.raw.toFixed(2)}%`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Probabilidad (%)'
                }
            }
        }
    };

    return (
        <>
            <form className="formulario" onSubmit={handleSubmit}>
                <div className="campo">
                    <label>Género</label>
                    <select name="gender" onChange={handleChange} required>
                        <option value="">Seleccione</option>
                        <option value="Female">Femenino</option>
                        <option value="Male">Masculino</option>
                        <option value="Other">Otro</option>
                    </select>
                </div>
                <div className="campo">
                    <label>Edad</label>
                    <input type="number" name="age" onChange={handleChange} placeholder="Edad" required />
                </div>
                <div className="campo">
                    <label>Hipertensión</label>
                    <select name="hypertension" onChange={handleChange} required>
                        <option value="">Seleccione</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="campo">
                    <label>Enfermedad del corazón</label>
                    <select name="heart_disease" onChange={handleChange} required>
                        <option value="">Seleccione</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="campo">
                    <label>Historial de tabaquismo</label>
                    <select name="smoking_history" onChange={handleChange} required>
                        <option value="">Seleccione</option>
                        <option value="No Info">Sin información</option>
                        <option value="Current">Actual</option>
                        <option value="Ever">Alguna vez</option>
                        <option value="Former">Ex fumador</option>
                        <option value="Never">Nunca</option>
                        <option value="Not current">No actual</option>
                    </select>
                </div>
                <div className="campo">
                    <label>Índice de Masa Corporal (BMI)</label>
                    <input type="number" name="bmi" onChange={handleChange} placeholder="BMI" required />
                </div>
                <div className="campo">
                    <label>Nivel de HbA1c</label>
                    <input type="number" name="HbA1c_level" onChange={handleChange} placeholder="Nivel de HbA1c" step="0.1" required />
                </div>
                <div className="campo">
                    <label>Nivel de glucosa en sangre</label>
                    <input type="number" name="blood_glucose_level" onChange={handleChange} placeholder="Nivel de glucosa" step="1" required />
                </div>
                <button type="submit">➜ Predecir</button>
            </form>

            {predictionResult && (
                <div className="resultado">
                    <h2>Resultado de la Predicción</h2>
                    <div className="chart-container">
                        <Bar data={data} options={options} />
                    </div>
                    
                    <div className="prediccion-info">
                        <h3>Interpretación:</h3>
                        <p>
                            La predicción indica que hay un <strong>{(predictionResult.probabilidad_clase_1 * 100).toFixed(2)}%</strong> de 
                            probabilidad de desarrollar diabetes tipo 2, y un <strong>{(predictionResult.probabilidad_clase_0 * 100).toFixed(2)}%</strong> de 
                            probabilidad de no desarrollarla.
                        </p>
                        
                        {predictionResult.prediccion === 'Diabetes' ? (
                            <div className="alerta alerta-positiva">
                                <p><strong>Resultado: Riesgo alto</strong></p>
                                <p>Se recomienda consultar con un médico para realizar exámenes adicionales.</p>
                                <div className="acciones-adicionales">
                                    <Link to="/Pag_Cuestionario" className="btn-cuestionario">
                                        Realizar cuestionario psicológico adicional
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="alerta alerta-negativa">
                                <p><strong>Resultado: Riesgo bajo</strong></p>
                                <p>Se recomienda mantener hábitos saludables y realizar chequeos periódicos.</p>
                                <div className="acciones-adicionales">
                                    <Link to="/Pag_Cuestionario" className="btn-cuestionario">
                                        Realizar cuestionario sobre hábitos saludables
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

import "../styles/Pag_Evaluacion.css";
import NotificacionDatos from "../components/NotificacionDatos";
import { Link } from "react-router-dom";

import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

type PredictionResult = {
  prediccion: string;
  probabilidad_clase_0: number;
  probabilidad_clase_1: number;
};

export default function EvaluationPage() {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    smoking_history: "",
    bmi: "",
    HbA1c_level: "",
    blood_glucose_level: "",
  });

  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const numericFormData = {
        ...formData,
        age: parseFloat(formData.age),
        bmi: parseFloat(formData.bmi),
        HbA1c_level: parseFloat(formData.HbA1c_level),
        blood_glucose_level: parseInt(formData.blood_glucose_level, 10),
      };
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const apiUrl = `${API_URL}/api/v1/prediccion`;
      const response = await axios.post(apiUrl, numericFormData, {
        withCredentials: true, // Important for sending cookies
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPredictionResult(response.data);
    } catch (error) {
      console.error("Prediction error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Validation error handling (400)
          if (error.response.status === 400 && error.response.data.detalle) {
            const errorDetails = error.response.data.detalle as Array<{
              loc: string[];
              msg: string;
            }>;

            const errorMessages = errorDetails
              .map((err) => `${err.loc.join(".")}: ${err.msg}`)
              .join("\n");

            alert(`Validation errors:\n${errorMessages}`);
          } else {
            // Other errors
            alert(
              error.response.data.message ||
                error.response.data.error ||
                "Unknown error"
            );
          }
        } else {
          alert("Connection error with the server");
        }
      } else {
        alert("Unexpected error processing the request");
      }
    }
  };

  const data = {
    labels: ["No Diabetes", "Diabetes"],
    datasets: [
      {
        label: "Probability (%)",
        data: predictionResult
          ? [
              predictionResult.probabilidad_clase_0 * 100,
              predictionResult.probabilidad_clase_1 * 100,
            ]
          : [0, 0],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: import("chart.js").TooltipItem<"bar">) {
            return `${context.dataset.label}: ${(context.raw as number).toFixed(
              2
            )}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Probability (%)",
        },
      },
    },
  };

  return (
    <>
      <NotificacionDatos />
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo">
          <label>Gender</label>
          <select name="gender" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
          <p>Select the gender you identify with.</p>
        </div>
        <div className="campo">
          <label>Age</label>
          <input
            type="number"
            name="age"
            onChange={handleChange}
            placeholder="Age"
            required
          />
          <p>Enter your age in years.</p>
        </div>
        <div className="campo">
          <label>Hypertension</label>
          <select name="hypertension" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Si">Yes</option>
            <option value="No">No</option>
          </select>
          <p>
            Indicate if you have ever been diagnosed with high blood pressure.
          </p>
        </div>
        <div className="campo">
          <label>Heart Disease</label>
          <select name="heart_disease" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Si">Yes</option>
            <option value="No">No</option>
          </select>
          <p>Indicate if you have or have had any heart disease.</p>
        </div>
        <div className="campo">
          <label>Smoking History</label>
          <select name="smoking_history" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="No Info">No information</option>
            <option value="Current">Current</option>
            <option value="Ever">Ever</option>
            <option value="Former">Former smoker</option>
            <option value="Never">Never</option>
            <option value="Not current">Not current</option>
          </select>
          <p>Select your smoking history.</p>
        </div>
        <div className="campo">
          <label>Body Mass Index (BMI)</label>
          <input
            type="number"
            name="bmi"
            onChange={handleChange}
            placeholder="BMI"
            required
          />
          <p>
            Calculate your BMI by dividing your weight in kilograms by your height in meters squared. For example: 70 kg / (1.75 m × 1.75 m) = 22.9
          </p>
        </div>
        <div className="campo">
          <label>HbA1c Level (Glycated Hemoglobin)</label>
          <input
            type="number"
            name="HbA1c_level"
            onChange={handleChange}
            placeholder="HbA1c level in %"
            step="0.1"
            required
          />
          <p>
            Indicate your average blood glucose level over the last 3 months.
          </p>
        </div>
        <div className="campo">
          <label>Blood Glucose Level</label>
          <input
            type="number"
            name="blood_glucose_level"
            onChange={handleChange}
            placeholder="Glucose level"
            step="1"
            required
          />
          <p>Indicate your fasting blood glucose level:</p>
        </div>
        <button type="submit">➜ Predict</button>
      </form>

      {predictionResult && (
        <div className="resultado">
          <h2>Prediction Result</h2>
          <div className="chart-container">
            <Bar data={data} options={options} />
          </div>

          <div className="prediccion-info">
            <h3>Interpretation:</h3>
            <p>
              The prediction indicates there is a{" "}
              <strong>
                {(predictionResult.probabilidad_clase_1 * 100).toFixed(2)}%
              </strong>{" "}
              probability of developing type 2 diabetes, and a{" "}
              <strong>
                {(predictionResult.probabilidad_clase_0 * 100).toFixed(2)}%
              </strong>{" "}
              probability of not developing it.
            </p>

            {predictionResult.prediccion === "Diabetes" ? (
              <div className="alerta alerta-positiva">
                <p>
                  <strong>Result: High risk</strong>
                </p>
                <p>
                  It is recommended to consult a doctor for further tests.
                </p>
                <div className="acciones-adicionales">
                  <Link to="/Pag_Cuestionario" className="btn-cuestionario">
                    Take additional psychological questionnaire
                  </Link>
                </div>
              </div>
            ) : (
              <div className="alerta alerta-negativa">
                <p>
                  <strong>Result: Low risk</strong>
                </p>
                <p>
                  It is recommended to maintain healthy habits and have regular check-ups.
                </p>
                <div className="acciones-adicionales">
                  <Link to="/Pag_Cuestionario" className="btn-cuestionario">
                    Take questionnaire about healthy habits
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

import axios from 'axios';

// 🔥 URL base dinâmica baseada no ambiente
const baseURL = import.meta.env.PROD 
    ? 'https://seu-backend.vercel.app/api' 
    : 'http://localhost:8000/api';

    export const api = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
    });

    // Interceptor para logs em desenvolvimento
    api.interceptors.request.use(
    (config) => {
        if (!import.meta.env.PROD) {
        console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



// import axios from "axios";

// const baseURL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

// export const api = axios.create({ 
//     baseURL, 
//     timeout: 30000, // Aumentado para 30 segundos
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

// // Interceptor para logs de requisição
// api.interceptors.request.use(
//     (config) => {
//         console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
//         return config;
//     },
//     (error) => {
//         console.error("❌ Erro na requisição:", error);
//         return Promise.reject(error);
//     }
// );

// // Interceptor para respostas
// api.interceptors.response.use(
//     (response) => {
//         console.log(`✅ ${response.status} ${response.config.url}`);
//         return response;
//     },
//     (error) => {
//         console.error(`❌ Erro ${error.response?.status || 'NO_RESPONSE'} em ${error.config?.url}:`, error.message);
//         return Promise.reject(error);
//     }
// );
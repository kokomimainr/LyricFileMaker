import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
  } from 'axios';
  
  //FIX - 1) Расширяем InternalAxiosRequestConfig для добавления свойства sent
  interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    sent?: boolean;
  }
  
  //* Создание экземпляра axios с базовой конфигурацией.
  export const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API}`,
    withCredentials: true,
  });
  
  //* Глобальная переменная для хранения токена доступа.
  let accessToken: string = '';
  
  //* Функция для установки токена доступа.
  export function setAccessToken(token: string): void {
    accessToken = token;
  }
  
  //* Интерсептор для добавления заголовка Authorization в каждый запрос.
  axiosInstance.interceptors.request.use(
    (config: ExtendedAxiosRequestConfig): ExtendedAxiosRequestConfig => {
      if (config.headers && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    }
  );
  
  //* Интерсептор для обработки ответов и ошибок.
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: AxiosError) => {
      //? Запоминаем информацию о предыдущем запросе.
      const prevRequest: ExtendedAxiosRequestConfig | undefined = error.config;
  
      //? Проверяем статус ответа и метку повторного запроса.
      if (error.response?.status === 403 && prevRequest && !prevRequest.sent) {
        try {
          //? Делаем запрос на обновление токенов.
          const response = await axios.get(`${import.meta.env.VITE_API}tokens/refresh`, {
            withCredentials:true
          });        
  
          //? Достаём новый токен из ответа.
          accessToken = response.data.accessToken;
  
          //? Устанавливаем метку повторного запроса.
          prevRequest.sent = true;
  
          //? Устанавливаем новый заголовок Authorization.
          if (prevRequest.headers) {
            prevRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
  
          //? Повторно отправляем исходный запрос.
          return axiosInstance(prevRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
export interface Environment {
  production: boolean;
  apiKey: string;
  fbDBUrl: string;
}

export interface FbCreateResponse {
  name: string;
}

export interface Phone {
  id?: string;
  name: string;
  resolution: string;
  processor: string;
  camera: string;
  price: number;
  rating?: {};
}

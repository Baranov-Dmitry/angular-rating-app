export interface Phone {
  name: string,
  resolution: string,
  processor: string,
  camera: string,
  price: number,
  rating?: number
}

export interface Environment {
  production: boolean,
  apiKey: string,
  fbDBUrl: string
}

export interface FbCreateResponse {
  name: string
}

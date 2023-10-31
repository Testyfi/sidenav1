export interface Paymentresponse {
  success: boolean;
  code: number;
  message: string;
  data: Data;
}

export interface Data {
  payment_url: string;
}

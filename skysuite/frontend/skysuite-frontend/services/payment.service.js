import api from "../lib/axios";

export const createCheckout = () => {
  return api.post("/payment/checkout");
};

export const verifyPayment = (session_id) => {
  return api.get(`/payment/verify?session_id=${session_id}`);
};

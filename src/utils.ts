export const calculateDiscount = (price: number, percentage: number) => {
   return '$' + price * (percentage / 100);
};

export const calculateTwoNumbers = (a: number, b: number) => {
   return a + b;
};

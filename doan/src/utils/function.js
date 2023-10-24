let orderCounter = 1;
const generateOrderCode = () => {
  const code = `#DH${orderCounter.toString().padStart(2, '0')}`;
  orderCounter++;
  return code;
};
module.exports = generateOrderCode;

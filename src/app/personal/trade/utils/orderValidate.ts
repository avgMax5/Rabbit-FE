/**
 * 주문 총액이 최소 금액 이상인지 검증하는 함수
 * @param totalAmount 주문 총액 (숫자)
 * @param minAmount 최소 금액 (기본값: 1000)
 * @returns 유효한 주문 금액인지 여부
 */
export const validateMinOrderAmount = (totalAmount: number, minAmount: number = 1000): boolean => {
  return totalAmount >= minAmount;
};

/**
 * 주문 수량과 가격으로부터 총액을 계산하고 최소 금액 검증을 수행하는 함수
 * @param quantity 주문 수량 (문자열)
 * @param price 주문 가격 (문자열)
 * @param minAmount 최소 금액 (기본값: 1000)
 * @returns 검증 결과 객체
 */
export const validateOrderAmount = (
  quantity: string, 
  price: string, 
  minAmount: number = 1000
): { isValid: boolean; totalAmount: number; errorMessage?: string } => {
  const quantityNum = parseFloat(quantity) || 0;
  const priceNum = parseFloat(price) || 0;
  const totalAmount = quantityNum * priceNum;
  
  if (quantityNum <= 0 || priceNum <= 0) {
    return {
      isValid: false,
      totalAmount: 0,
      errorMessage: '수량과 가격을 모두 입력해주세요.'
    };
  }
  
  if (totalAmount < minAmount) {
    return {
      isValid: false,
      totalAmount,
      errorMessage: `최소 주문 금액은 ${minAmount.toLocaleString()}원입니다.`
    };
  }
  
  return {
    isValid: true,
    totalAmount
  };
};

/**
 * 주문 총액을 계산하는 함수
 * @param quantity 주문 수량 (문자열)
 * @param price 주문 가격 (문자열)
 * @returns 포맷된 총액 문자열
 */
export const calculateTotalAmount = (quantity: string, price: string): string => {
  const quantityNum = parseFloat(quantity) || 0;
  const priceNum = parseFloat(price) || 0;
  const total = quantityNum * priceNum;
  return total.toLocaleString();
};

/**
 * 가격 상승을 처리하는 함수
 * @param currentPrice 현재 입력된 가격 (문자열)
 * @param basePrice 기준 가격 (숫자)
 * @param percentage 상승 퍼센트
 * @returns 새로운 가격 (문자열)
 */
export const handlePriceIncrease = (
  currentPrice: string, 
  basePrice: number, 
  percentage: number
): string => {
  const currentInputPrice = parseFloat(currentPrice) || 0;
  if (currentInputPrice === 0) {
    const increaseAmount = basePrice * (percentage / 100);
    const newPrice = basePrice + increaseAmount;
    return newPrice.toFixed(0);
  } else {
    const increaseAmount = currentInputPrice * (percentage / 100);
    const newPrice = currentInputPrice + increaseAmount;
    return newPrice.toFixed(0);
  }
};

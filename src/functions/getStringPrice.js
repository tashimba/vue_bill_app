export const getStringPrice = (price) => {
  const priceRounded = Math.round(price * 10) / 10;
  const priceInt = Math.ceil(price);

  return `${priceRounded} ${
    priceInt % 10 == 1
      ? "рубль"
      : priceInt % 10 >= 2 && priceInt % 10 <= 4
      ? "рубля"
      : "рублей"
  }`;
};

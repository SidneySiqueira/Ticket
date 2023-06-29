import { EventProps } from "../../Types/types";

export default function sumPrices(data: EventProps[]) {
    const numericPrices = data.map((item) => {
      const numericValue = parseFloat(item.price.replace("R$", "").replace(",", "."));
      return isNaN(numericValue) ? 0 : numericValue;
    });
  
    const sum = numericPrices.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  
    const formattedSum = `R$${sum.toFixed(2).replace(".", ",")}`;
  
    return formattedSum;
  }
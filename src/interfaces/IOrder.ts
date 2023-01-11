interface IOrder {
  id: number;
  user: number;
  numbersOfItems: number;
  totalPrice: number;
  createdAt: Date;
}
export default IOrder;

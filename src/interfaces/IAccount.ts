import IOrder  from 'src/interfaces/IOrder';
interface IAccount {
  id: number;
  username: string;
  email: string;
  password: string;
  orders: IOrder[];
}
export default IAccount;

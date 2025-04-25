// type for car
export type TCar = {
  _id?: string;
  name: string;
  carType: string;
  location: string;
  description: string;
  images: string[];
  color: string;
  isElectric: boolean;
  status?: string;
  features: string[];
  pricePerHour: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// export type TModalProps = {
//   open : boolean,
//   setOpen : React.Dispatch<React.SetStateAction<boolean>>
// };

// export type TUser = {
//     _id? : string;
//     name : string;
//     email: string;
//     role: string;
//     image: string;
//     address? : string;
//     iat?: number;
//     exp?: number;
//   };

//  export type TAuthState = {
//     user: null | TUser;
//     token: null | string;
//   };

// export type TBooking = {
//     _id? : string;
//     date : string;
//     user : TUser;
//     car : TCar;
//     phone: string;
//     location: string;
//     paymentMethod : string;
//     startTime : string;
//     status? : string;
//     isReturnProcess? : boolean;
//     endTime? : string;
//     totalCost? : number;
//     createdAt? : string,
//     updatedAt? : string,
//     isPaid? : boolean,
// }

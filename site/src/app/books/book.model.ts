export interface Book {
  _id: string,
  title: string,
  image: string,
  category: string,
  quantity: number,
  price: string,
  description: string,
};

export interface InputBook {
  title: string,
  image: string,
  category: string,
  quantity: number,
  price: string,
  description: string,
};

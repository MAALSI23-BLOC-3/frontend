export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  currency: string;
  color: string;
  size: string;
  material: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

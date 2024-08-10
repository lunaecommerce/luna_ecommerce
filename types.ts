export interface Store {
  id: string;
  name: string;
  userId: string;
  fantasia?: string | null;
  razao?: string | null;
  cnpj?: string | null;
  ie?: string | null;
  telefone?: string | null;
  instagramAccount?: string | null;
  twitterAccount?: string | null;
  facebookAccount?: string | null;
  whatsappAccount?: string | null;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  idEstado?: number | null;
  ibge?: number | null;
  featured: Featured[];
  categories: Category[];
  brands: Brand[];
  products: Product[];
  sizes: Size[];
  colors: Color[];
  orders: Order[];
  clients: Client[];
  orderAddresses: OrderAddress[];
  clientAddresses: ClientAddress[];
  OrderItem: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Client {
  id: string;
  externalId: string;
  storeId: string;
  store: Store;
  type?: 'pessoa fisica' | 'pessoa juridica' | null;
  cpf?: string | null;
  cnpj?: string | null;
  fantasia?: string | null;
  razao?: string | null;
  name?: string | null;
  email: string;
  phone?: string | null;
  password?: string | null;
  Address: ClientAddress[];
  AddressesOrders: OrderAddress[];
  orders: Order[];
  createdAt: Date;
  updatedAt: Date;
}
export interface ClientAddress {
  id: string;
  storeId: string;
  store: Store;
  zipcode?: string | null; // cep
  ibge?: string | null; // codigo ibge
  state?: string | null; // estado
  city?: string | null; // cidade
  district?: string | null; // bairro
  street?: string | null; // rua
  number?: string | null; // numero
  complement?: string | null; // complemento
  reference?: string | null; // Ponto de referencia
  clientName?: string | null; // Nome do cliente
  clientPhone?: string | null; // número para contato
  isDefault?: boolean | null;
  country?: number | null; // codigo pais
  clientId: string;
  clients: Client;
}
export interface Order {
  id: number;
  clientId: string;
  storeId: string;
  orderItems: OrderItem[];
  isPaid: boolean;
  phone: string;
  address: Partial<OrderAddress>;
  status: number;
  total: number;
  orderPayment: Partial<OrderPayment>;
  paymentMoment: number;
  observation: string;
  createdAt?: Date;
}
export interface OrderPayment {
  id: number;
  storeId: string;
  store: Store;
  paymentDescription: string;
  paymentId: number;
  orderId: number;
  moneyChange: number;
  totalDiscount: number;
  totalIncrease: number;
  totalShipping: number;
  totalPayment: number;
}
export interface PaymentMethod {
  id: number;
  description: string;
  storeId: string;
  tax: number;
  active: boolean;
  external_id: number;
}
export interface OrderData {
  orders: Order[];
  totalPages: number;
  totalitems: number;
}

export interface PostOrderResponse {
  status: number;
  orderId?: number;
}

export interface OrderAddress {
  id?: string;
  clientId?: string;
  storeId?: string;
  orderId: number;
  zipcode: string;
  city: string;
  state: string;
  district: string;
  street: string;
  number: string;
  complement: string;
  reference: string;
  isDefault: boolean;
  clientPhone: string;
  clientName: string;
}

export interface OrderItem {
  id?: number;
  image: string;
  orderId?: number;
  productId: String;
  description: string;
  color: string;
  size: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
}

export interface Product {
  id: string;
  categoryId: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  brand: Brand;
  featured: Featured;
  size: Size;
  color: Color;
  images: Image[];
  description: string;
  attribute001: string;
  attribute002: string;
  attribute003: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface cartItem {
  product: Product
  quantity: number
}

export interface Address {
  id: string;
  zipcode: string;
  city: string;
  state: string;
  district: string;
  street: string;
  number: string;
  complement: string;
  clientId: string;
  reference: string;
  isDefault: boolean;
  clientPhone: string;
  clientName: string;
}



export interface Image {
  id: string;
  url: string;
}

export interface Featured {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

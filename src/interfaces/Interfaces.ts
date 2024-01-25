
export interface PostInterface {
  postText: string;
}

export interface SubcategoryInterface {
  name: string;
}

export interface TopcategoryInterface {
  name: string;
}

export interface UserInterface {
  name: string;
  email: string;
  password: string;
}

export interface DecodedTokenInterface {
  id: number;
  iat: number;
  exp: number;
}
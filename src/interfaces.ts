import { Document } from 'mongoose';

export interface Article {
  artId: string;
  name: string;
  stock: number;
}

export interface IArticle extends Document, Article {}

export interface ContainArticles {
  artId: string;
  amountOf: number;
}

export interface Product {
  name: string;
  containArticles: ContainArticles[];
}

export interface IProduct extends Document, Product {}

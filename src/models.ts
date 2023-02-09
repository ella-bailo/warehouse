import { model, Schema } from 'mongoose';
import { IArticle, IProduct } from './interfaces';

const ArticleSchema = new Schema({
  artId: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true, trim: true, unique: true },
  stock: { type: Number, required: true },
});

export const MArticle = model<IArticle>('Article', ArticleSchema);

const ContainArticleSchema = new Schema({
  artId: { type: String, required: true },
  amountOf: { type: Number, required: true },
});

const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
  containArticles: { type: [ContainArticleSchema], required: true },
});

export const MProduct = model<IProduct>('Product', ProductSchema);

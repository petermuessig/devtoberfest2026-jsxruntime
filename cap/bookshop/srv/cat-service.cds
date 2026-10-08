using { sap.capire.bookshop as bookshop } from '../db/schema';

service CatalogService @(path:'/browse') {

  @readonly entity Books as SELECT from bookshop.Books {*,
    author.name as author,
    genre.name  as genre
  } excluding { createdBy, modifiedBy };

  action submitOrder (book : Books:ID, quantity : Integer);
}

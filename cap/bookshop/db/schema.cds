namespace sap.capire.bookshop;
using { managed, Currency, sap.common.CodeList } from '@sap/cds/common';

entity Books : managed {
  key ID       : Integer;
      title    : localized String(111);
      descr    : localized String(1111);
      author   : Association to Authors;
      genre    : Association to Genres;
      stock    : Integer;
      price    : Decimal(9,2);
      currency : Currency;
}

entity Authors {
  key ID   : Integer;
      name : String(111);
      books : Association to many Books on books.author = $self;
}

/** Genre code list — supports trees via parent/children */
entity Genres : CodeList {
  key ID        : Integer;
      name      : String(111);
      parent    : Association to Genres;
      children  : Composition of many Genres on children.parent = $self;
}

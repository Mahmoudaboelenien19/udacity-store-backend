CREATE extension if not exists "uuid-ossp";
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    first  VARCHAR(100) NOT NULL,
    last VARCHAR(100)  NOT NULL ,
    password VARCHAR(100)   NOT NULL
);
CREATE extension if not exists "uuid-ossp";
CREATE TABLE products(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100),
    price INT,
    category VARCHAR(100)
);
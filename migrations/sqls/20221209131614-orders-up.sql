CREATE TABLE orders(
    id SERIAL   PRIMARY KEY,
    status VARCHAR(20),
    quantity integer,
      product_id uuid  REFERENCES products(id), 
      user_id uuid  REFERENCES  users(id)
    );
ALTER TABLE orders  ADD CONSTRAINT unique_status CHECK(status='active' OR status='complete');

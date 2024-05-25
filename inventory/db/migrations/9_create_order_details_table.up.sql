CREATE TABLE IF NOT EXISTS order_details (
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    quantity INT NOT NULL
);

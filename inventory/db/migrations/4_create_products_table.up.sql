CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    brand_id UUID REFERENCES brands(id),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price NUMERIC(10, 2) NOT NULL,
    style VARCHAR(100),
    size VARCHAR(50),
    stock_quantity INTEGER NOT NULL,
    stock_limit INTEGER NOT NULL
);

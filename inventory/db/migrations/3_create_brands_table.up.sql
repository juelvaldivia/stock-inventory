CREATE TABLE IF NOT EXISTS brands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(255)
);

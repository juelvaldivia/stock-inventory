CREATE TABLE clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  names VARCHAR(255) NOT NULL,
  first_last_name VARCHAR(255) NOT NULL,
  second_last_name VARCHAR(255),
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SEQUENCE user_id_seq START 1;

CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id BIGINT DEFAULT nextval('user_id_seq'),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  last_session_date TIMESTAMP
);

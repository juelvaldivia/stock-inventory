CREATE TABLE IF NOT EXISTS product_materials (
  product_id UUID REFERENCES products(id),
  material_id UUID REFERENCES materials(id),
  quantity_used INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY (product_id, material_id)
);

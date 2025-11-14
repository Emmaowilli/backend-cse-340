
DROP TABLE IF EXISTS inventory, account, classification, vehicles CASCADE;
DROP TYPE IF EXISTS account_type_enum CASCADE;


CREATE TYPE account_type_enum AS ENUM ('Client', 'Staff', 'Admin');

CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR(50) NOT NULL,
    account_lastname VARCHAR(50) NOT NULL,
    account_email VARCHAR(100) NOT NULL UNIQUE,
    account_password TEXT NOT NULL,
    account_type account_type_enum DEFAULT 'Client'
);

CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_year CHAR(4) NOT NULL,
    inv_description TEXT,
    inv_image VARCHAR(255),
    inv_thumbnail VARCHAR(255),
    inv_price NUMERIC(9,2),
    inv_miles INTEGER,
    inv_color VARCHAR(30),
    classification_id INTEGER NOT NULL,
    CONSTRAINT fk_classification
        FOREIGN KEY (classification_id)
        REFERENCES classification(classification_id)
        ON DELETE CASCADE
);


INSERT INTO classification (classification_name) VALUES
('Sport'),('SUV'),('Truck'),('Sedan');

INSERT INTO inventory (
    inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,
    inv_price, inv_miles, inv_color, classification_id
) VALUES
('Chevy', 'Camaro', '2019', 'The Chevrolet Camaro is known all around the globe...', 
 '/images/camaro.jpg', '/images/camaro-thumb.jpg', 36000.00, 12000, 'Red', 1),
('Ford', 'Mustang', '2020', 'The Ford Mustang is the most successful classic car...', 
 '/images/mustang.jpg', '/images/mustang-thumb.jpg', 42000.00, 8000, 'Blue', 1),
('GM', 'Hummer', '2008', 'The Hummer offers a unique look with small interiors.', 
 '/images/hummer.jpg', '/images/hummer-thumb.jpg', 25000.00, 95000, 'Yellow', 2),
('Jeep', 'Wrangler', '2021', 'The Jeep Wrangler is small and compact...', 
 '/images/wrangler.jpg', '/images/wrangler-thumb.jpg', 38000.00, 15000, 'Green', 2);

INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type)
VALUES 
('Admin', 'User', 'admin@phpsmotors.com', 'password123', 'Admin'),
('John', 'Doe', 'john@example.com', 'pass456', 'Client');


SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' 
  AND inv_model = 'Hummer'
  AND inv_description LIKE '%small interiors%';

UPDATE inventory
SET 
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')
WHERE inv_image LIKE '/images/%' OR inv_thumbnail LIKE '/images/%';
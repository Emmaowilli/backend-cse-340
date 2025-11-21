-- =============================================
-- Assignment 2 - Database Rebuild File
-- Drops and rebuilds the full database schema
-- =============================================

-- ===== DROP OLD OBJECTS =====
DROP TABLE IF EXISTS public.inventory CASCADE;
DROP TABLE IF EXISTS public.classification CASCADE;
DROP TABLE IF EXISTS public.account CASCADE;
DROP TYPE IF EXISTS public.account_type CASCADE;

-- ===== CREATE TYPE =====
CREATE TYPE public.account_type AS ENUM ('Client', 'Admin');

-- ===== CREATE TABLE: account =====
CREATE TABLE public.account (
  account_id SERIAL PRIMARY KEY,
  account_firstname VARCHAR(50) NOT NULL,
  account_lastname VARCHAR(50) NOT NULL,
  account_email VARCHAR(100) UNIQUE NOT NULL,
  account_password VARCHAR(255) NOT NULL,
  account_type public.account_type DEFAULT 'Client'
);

-- ===== CREATE TABLE: classification =====
CREATE TABLE public.classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(50) NOT NULL UNIQUE
);

-- ===== CREATE TABLE: inventory =====
CREATE TABLE public.inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(50) NOT NULL,
  inv_model VARCHAR(50) NOT NULL,
  inv_year INT NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image VARCHAR(255) NOT NULL,
  inv_thumbnail VARCHAR(255) NOT NULL,
  inv_price NUMERIC(10,2) NOT NULL,
  inv_miles INT NOT NULL,
  inv_color VARCHAR(30) NOT NULL,
  classification_id INT REFERENCES public.classification(classification_id)
);

-- =============================================
-- INSERT INITIAL DATA
-- =============================================

-- ===== Insert classification data =====
INSERT INTO public.classification (classification_name)
VALUES
('Sport'),
('SUV'),
('Truck'),
('Sedan'),
('Electric');

-- ===== Insert sample inventory =====
INSERT INTO public.inventory
(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
VALUES
('GM', 'Hummer', 2019, 'small interiors but great power', '/images/gm-hummer.jpg', '/images/gm-hummer-tn.jpg', 50000, 10000, 'Black', 2),
('Jeep', 'Wrangler', 2021, 'Great off-road experience', '/images/jeep-wrangler.jpg', '/images/jeep-wrangler-tn.jpg', 42000, 15000, 'Green', 1),
('Ford', 'Mustang', 2020, 'Powerful performance vehicle', '/images/ford-mustang.jpg', '/images/ford-mustang-tn.jpg', 35000, 8000, 'Red', 1);

-- =============================================
-- TASK 1 QUERIES TO EXECUTE LAST
-- =============================================

-- 4. Replace description for GM Hummer
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- 6. Update file paths with "/vehicles"
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

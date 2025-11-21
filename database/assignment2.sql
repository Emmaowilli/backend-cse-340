-- =============================================
-- Assignment 2 - Task 1 SQL Queries
-- =============================================

-- 1. Insert Tony Stark
INSERT INTO public.account 
(account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2. Modify Tony Stark to Admin
UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- 3. Delete Tony Stark
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';

-- 4. Replace "small interiors" with "a huge interior" for GM Hummer
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- 5. Inner join to show Sport vehicles
SELECT inv_make, inv_model, classification_name
FROM public.inventory
INNER JOIN public.classification
  ON public.inventory.classification_id = public.classification.classification_id
WHERE classification_name = 'Sport';

-- 6. Update inventory paths to include "/vehicles"
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

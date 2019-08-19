------------------------------------------------------------------------------------
--isFriendOf--

--create a friendship
INSERT INTO isFriendOf (student, friend_id) VALUES ([studentValArg], [friendIdArg]);

--end a friendship
DELETE FROM isFriendOf WHERE student = [studentValArg] AND friend_id = [friendIdArg]; 

--generate list of friendships
SELECT DISTINCT t1.name AS n1, t2.name AS n2 FROM
(SELECT student.name, isFriendOf.student FROM isFriendOf
INNER JOIN student ON isFriendOf.student = student.student_id) AS t1
INNER JOIN 
(SELECT student.name, isFriendOf.student FROM isFriendOf
INNER JOIN student ON isFriendOf.friend_id = student.student_id) AS t2 
ON t1.student = t2.student;

--generate list of particular student's friends
SELECT student.name FROM student
INNER JOIN isFriendOf ON isFriendOf.friend_id = student.student_id
WHERE isFriendOf.student = [studentArg];
-------------------------------------------------------------------------------------


-------------------------------------------------------------------------------------
--House--

--create a new House
INSERT INTO house (tower, colors, animal, founder) VALUES ([towerArg], [colorsArg], [animalArg], [founderArg]);

--delete a House
DELETE FROM house WHERE tower = [towerArg];

--list Houses
SELECT * FROM house;

--sort by name
SELECT * FROM house ORDER BY tower;

-------------------------------------------------------------------------------------


-------------------------------------------------------------------------------------
--Class--

--create a new Class
INSERT INTO class (course, category) VALUES ([courseArg], [categoryArg]);

--delete a Class
DELETE FROM class WHERE course = [courseArg];

--update existing class's category
UPDATE Class SET category = [categoryArg] WHERE course = [courseArg];

--generate list of classes
SELECT * FROM class;

--generate list of class names
SELECT course FROM class;

--sort by category
SELECT * FROM class ORDER BY category;

-------------------------------------------------------------------------------------


-------------------------------------------------------------------------------------
--Student--

-- add a new student
INSERT INTO student (name, blood, dorm, locatedAt) VALUES ([nameInput], [bloodInput], [dormInpput], [locatedAtInput])

-- get all unique blood values to populate the Blood Type drop list
SELECT DISTINCT blood FROM student

-- get all tower values from house to populate the House drop list
SELECT tower FROM house

-- get all place values from location to populate the Current Location drop list
SELECT place FROM location

-- generate list of student
SELECT * FROM student;

-- generate list of student names
SELECT name FROM student;

-- delete a student
DELETE FROM student WHERE id = [student_ID_selected_from_browse_student_page]

-- update a student
UPDATE student SET name=[nameInput], blood=[blood_dropdown_Input], dorm=[dorm_id_from_dropdown_Input], locatedAt=[locatedAt_id_from_dropdown_Input] WHERE id=[student_ID_from_the_update_form]
-------------------------------------------------------------------------------------


-------------------------------------------------------------------------------------
-- location --

-- add a new location
INSERT INTO location (place, campus) VALUES ([placeInput], [campusInput])

-- get all unique campus values to populate the Campus drop list
SELECT DISTINCT campus FROM location

-- generate list of location
SELECT * FROM location;

-- generate list of location names
SELECT place FROM location;

-- delete a student
DELETE FROM location WHERE id = [location_ID_selected_from_browse_location_page]

-- update a student
UPDATE student SET name=[nameInput], blood=[blood_dropdown_Input], dorm=[dorm_id_from_dropdown_Input], locatedAt=[locatedAt_id_from_dropdown_Input] WHERE id=[student_ID_from_the_update_form]
-------------------------------------------------------------------------------------


-------------------------------------------------------------------------------------
-- Takes --

-- get all names to populate the Student Name drop list
SELECT name FROM student

-- get all course value from class to populate the Course Name drop list
SELECT course FROM class

-- create a student - course relationship (M-to-M relationship addition)
INSERT INTO takes (student_id, class_id) VALUES ([student_id_from_dropdown_Input], [class_id_from_dropdown_Input])

-- delete a student-course relationship
DELETE FROM takes WHERE student_id = [student_id_from_dropdown_Input] and class_id = [class_id_from_dropdown_Input]

--generate list of student-class relationship
SELECT DISTINCT t1.name, t2.course FROM
(SELECT student.name, takes.student_id, takes.class_id FROM takes
INNER JOIN student ON takes.student_id = student.student_id) AS t1
INNER JOIN 
(SELECT class.course, takes.class_id FROM takes
INNER JOIN class ON takes.class_id = class.class_id) AS t2
ON t1.class_id = t2.class_id;
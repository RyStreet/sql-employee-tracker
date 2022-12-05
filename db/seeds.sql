INSERT INTO departments (id, department_name)
VALUES (1, "Executive"),
       (2, "Legal"),
       (3, "Sales"),
       (4, "Marketing"),
       (5, "Research and Development");

INSERT INTO roles (id, title, salary, department_id)
VALUES (101, "CEO", 90.0, 1),
       (102, "CFO", 90.0, 1),
       (201, "Legal Head", 80.0, 2),
       (202, "Lawyer", 120.0, 2),
       (301, "Sales Manager", 85.0, 3),
       (302, "Sales Lead", 70.0, 3),
       (401, "Marketing Manager", 85.0, 4),
       (402, "Social Media Lead", 75.0, 4),
       (501, "Dev Ops Manager", 90.0, 5),
       (502, "Full-Stack Engineer", 87.0, 5);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (111, "Don", "Corleone", 101, NULL),
       (112, "Bonny", "Parker", 102, NULL),
       (211, "Kim", "Wexler", 201, NULL),
       (212, "James", "McGil", 202, 211),
       (311, "Anthony", "Soprano", 301, NULL),
       (312, "Christopher", "Moltisanti", 302, 311),
       (411, "Doc", "Caligari", 401, NULL),
       (412, "Kevin", "Flynn", 402, 411),
       (511, "Agent", "Smith", 501, NULL),
       (512, "Reagen", "Cypher", 502, 511);


USE LaPadariePrime; 


CREATE TABLE combo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(8, 2) NOT NULL
);


CREATE TABLE subscription (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    FK_idCombo int NOT NULL,
    FOREIGN KEY (FK_idCombo) REFERENCES combo(id)
);


CREATE TABLE client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    FK_idSubscription int NOT NULL,
    FOREIGN KEY (FK_idSubscription) REFERENCES subscription(id)
);


CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
    price DECIMAL(8, 2) NOT NULL
);


CREATE TABLE combo_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
	FK_idCombo int NOT NULL,
	FK_idProduct int NOT NULL,
    quantity int NOT NULL,
    FOREIGN KEY (FK_idCombo) REFERENCES combo(id),
    FOREIGN KEY (FK_idProduct) REFERENCES product(id)
);
USE GerenciamentoDeBolsas;
CREATE TABLE Instituto (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255)
);

USE GerenciamentoDeBolsas;
CREATE TABLE Professor (
	matricula INT NOT NULL PRIMARY KEY,
	cpf CHAR(11) NOT NULL UNIQUE,
	nome VARCHAR(255),
	id_instituto INT NOT NULL,
	FOREIGN KEY (id_instituto) REFERENCES Instituto(id)
);

USE GerenciamentoDeBolsas;
CREATE TABLE Aluno (
	matricula INT NOT NULL PRIMARY KEY,
	cpf CHAR(11) NOT NULL UNIQUE,
	nome VARCHAR(255),
	id_instituto INT NOT NULL,
	FOREIGN KEY (id_instituto) REFERENCES Instituto(id)
);

USE GerenciamentoDeBolsas;
CREATE TABLE GrupoBolsa (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255),
	remuneracao SMALLINT,
	quantidade_total TINYINT,
	quantidade_restante TINYINT,
	data_inicio DATE,
	data_fim DATE
);

USE GerenciamentoDeBolsas;
CREATE TABLE Orientador (
	matricula_professor INT NOT NULL,
	id_bolsa INT NOT NULL,
	CONSTRAINT PFK_Orientador PRIMARY KEY (matricula_professor, id_bolsa),
	FOREIGN KEY (matricula_professor) REFERENCES Professor(matricula),
	FOREIGN KEY (id_bolsa) REFERENCES GrupoBolsa(id)
);

USE GerenciamentoDeBolsas;
CREATE TABLE Bolsista (
	matricula_aluno INT NOT NULL,
	id_bolsa INT NOT NULL,
	CONSTRAINT PFK_Bolsista PRIMARY KEY (matricula_aluno, id_bolsa),
	FOREIGN KEY (matricula_aluno) REFERENCES Aluno(matricula),
	FOREIGN KEY (id_bolsa) REFERENCES GrupoBolsa(id)
);

USE GerenciamentoDeBolsas;
CREATE TABLE ProcessoSeletivo (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	data_inicio DATE,
	data_fim DATE,
	id_bolsa INT,
	FOREIGN KEY (id_bolsa) REFERENCES GrupoBolsa(id)
);

USE GerenciamentoDeBolsas;
CREATE TABLE Administrador (
	matricula_professor INT NOT NULL,
	id_processoSeletivo INT NOT NULL,
	CONSTRAINT PFK_Administrador PRIMARY KEY (matricula_professor, id_processoSeletivo),
	FOREIGN KEY (matricula_professor) REFERENCES Professor(matricula),
	FOREIGN KEY (id_processoSeletivo) REFERENCES ProcessoSeletivo(id)
);

USE GerenciamentoDeBolsas;
CREATE TABLE Candidatura (
	matricula_aluno INT NOT NULL,
	id_processoSeletivo INT NOT NULL,
	data DATETIME,
	CONSTRAINT PFK_Candidatura PRIMARY KEY (matricula_aluno, id_processoSeletivo),
	FOREIGN KEY (matricula_aluno) REFERENCES Aluno(matricula),
	FOREIGN KEY (id_processoSeletivo) REFERENCES ProcessoSeletivo(id)
);

CREATE DATABASE GerenciamentoDeBolsas;

-- INSTITUTO
CREATE TABLE Instituto (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(255)
);
INSERT INTO Instituto (nome) VALUES ('Institute of Technology');
INSERT INTO Instituto (nome) VALUES ('College of Engineering');
INSERT INTO Instituto (nome) VALUES ('School of Business');
INSERT INTO Instituto (nome) VALUES ('Faculty of Arts');
INSERT INTO Instituto (nome) VALUES ('Department of Sciences');

-- PROFESSOR
CREATE TABLE Professor (
	matricula INT PRIMARY KEY,
	cpf CHAR(11) NOT NULL UNIQUE,
	nome VARCHAR(255),
	id_instituto INT NOT NULL,
	FOREIGN KEY (id_instituto) REFERENCES Instituto(id)
);
INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES (12345, '12345678901', 'John Doe', 1);
INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES (67890, '98765432109', 'Jane Smith', 2);
INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES (54321, '56789012345', 'David Johnson', 3);
INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES (98765, '90123456789', 'Emily Davis', 4);
INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES (11111, '11111111111', 'Robert Wilson', 5);
-- CREATE UNIQUE INDEX cpf_idx ON Professor USING BTREE (cpf);
-- CREATE UNIQUE INDEX instituto_cpf_idx ON Professor USING BTREE (id_instituto, cpf);
-- CREATE UNIQUE INDEX instituto_matricula_idx ON Professor USING BTREE (id_instituto, matricula);

-- ALUNO
CREATE TABLE Aluno (
	matricula INT PRIMARY KEY,
	cpf CHAR(11) NOT NULL UNIQUE,
	nome VARCHAR(255),
	id_instituto INT NOT NULL,
	FOREIGN KEY (id_instituto) REFERENCES Instituto(id)
);
INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES (12345, '12345678901', 'John Doe', 1);
INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES (67890, '98765432109', 'Jane Smith', 2);
INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES (54321, '56789012345', 'David Johnson', 3);
INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES (98765, '90123456789', 'Emily Davis', 4);
INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES (11111, '11111111111', 'Robert Wilson', 5);
CREATE UNIQUE INDEX cpf_idx ON Aluno USING BTREE (cpf);
CREATE UNIQUE INDEX instituto_cpf_idx ON Aluno USING BTREE (id_instituto, cpf);
CREATE UNIQUE INDEX instituto_matricula_idx ON Aluno USING BTREE (id_instituto, matricula);

-- GRUPO BOLSA	
CREATE TABLE GrupoBolsa (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(255),
	remuneracao SMALLINT,
	quantidade_total SMALLINT,
	quantidade_restante SMALLINT,
	data_inicio DATE,
	data_fim DATE
);
INSERT INTO GrupoBolsa (nome, remuneracao, quantidade_total, quantidade_restante, data_inicio, data_fim) VALUES ('Research Scholarship', 500, 10, 9, '2023-07-01', '2023-12-31');
INSERT INTO GrupoBolsa (nome, remuneracao, quantidade_total, quantidade_restante, data_inicio, data_fim) VALUES ('STEM Fellowship', 1000, 5, 4, '2023-09-01', '2024-08-31');
INSERT INTO GrupoBolsa (nome, remuneracao, quantidade_total, quantidade_restante, data_inicio, data_fim) VALUES ('Arts Grant', 750, 8, 7, '2023-08-15', '2023-11-30');
INSERT INTO GrupoBolsa (nome, remuneracao, quantidade_total, quantidade_restante, data_inicio, data_fim) VALUES ('Business Internship', 800, 6, 5, '2023-07-15', '2024-02-28');
INSERT INTO GrupoBolsa (nome, remuneracao, quantidade_total, quantidade_restante, data_inicio, data_fim) VALUES ('Science Research Grant', 1200, 3, 2, '2023-10-01', '2024-03-31');

CREATE INDEX data_inicio_idx ON GrupoBolsa USING BTREE (data_inicio);
CREATE INDEX data_fim_idx ON GrupoBolsa USING BTREE (data_fim);
--CREATE INDEX matriculaOrientador_data_inicio_idx ON GrupoBolsa USING BTREE (matriculaOrientador, data_inicio, data_fim);

-- ORIENTADOR
CREATE TABLE Orientador (
	matricula_professor INT NOT NULL,
	id_bolsa INT NOT NULL,
	PRIMARY KEY (matricula_professor, id_bolsa),
	FOREIGN KEY (matricula_professor) REFERENCES Professor(matricula),
	FOREIGN KEY (id_bolsa) REFERENCES GrupoBolsa(id)
);
INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES (12345, 1);
INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES (67890, 2);
INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES (54321, 3);
INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES (98765, 4);
INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES (11111, 5);


-- BOLSISTA
CREATE TABLE Bolsista (
	matricula_aluno INT NOT NULL,
	id_bolsa INT NOT NULL,
	PRIMARY KEY (matricula_aluno, id_bolsa),
	FOREIGN KEY (matricula_aluno) REFERENCES Aluno(matricula),
	FOREIGN KEY (id_bolsa) REFERENCES GrupoBolsa(id)
);
INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES (12345, 1);
INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES (67890, 2);
INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES (54321, 3);
INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES (98765, 4);
INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES (11111, 5);


-- PROCESSO SELETIVO
CREATE TABLE ProcessoSeletivo (
	id SERIAL PRIMARY KEY,
	data_inicio DATE,
	data_fim DATE,
	ativo boolean DEFAULT true,
	id_bolsa INT,
	FOREIGN KEY (id_bolsa) REFERENCES GrupoBolsa(id)
);
INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES (1, '2023-06-01', '2023-07-15', 1);
INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES (2, '2023-08-01', '2023-09-30', 2);
INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES (3, '2023-07-15', '2023-08-31', 3);
INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES (4, '2023-09-01', '2023-10-31', 4);
INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES (5, '2023-10-15', '2023-12-15', 5);
INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa, ativo) VALUES (6, '2023-01-01', '2023-01-15', 5, false);

CREATE INDEX id_bolsa_idx ON ProcessoSeletivo USING BTREE (id_bolsa);
CREATE INDEX data_fim_processo_seletivo_idx ON ProcessoSeletivo USING BTREE (data_fim);
CREATE INDEX data_inicio_data_fim_idx ON ProcessoSeletivo USING BTREE (data_inicio, data_fim);

-- ADMINISTRADOR
CREATE TABLE Administrador (
	matricula_professor INT NOT NULL,
	id_processoSeletivo INT NOT NULL,
	PRIMARY KEY (matricula_professor, id_processoSeletivo),
	FOREIGN KEY (matricula_professor) REFERENCES Professor(matricula),
	FOREIGN KEY (id_processoSeletivo) REFERENCES ProcessoSeletivo(id)
);
INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (12345, 1);
INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (67890, 2);
INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (54321, 3);
INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (98765, 4);
INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (11111, 5);
INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (67890, 6);


-- CANDIDATURA
CREATE TABLE Candidatura (
	matricula_aluno INT NOT NULL,
	id_processoSeletivo INT NOT NULL,
	data TIMESTAMP,
	PRIMARY KEY (matricula_aluno, id_processoSeletivo),
	FOREIGN KEY (matricula_aluno) REFERENCES Aluno(matricula),
	FOREIGN KEY (id_processoSeletivo) REFERENCES ProcessoSeletivo(id)
);
INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (12345, 1, '2023-06-10 09:30:00');
-- INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (12345, 2, '2023-06-10 09:30:00');
INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (12345, 6, '2023-06-10 09:30:00');
INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (67890, 1, '2023-06-12 14:45:00');
INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (54321, 2, '2023-08-05 11:00:00');
INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (98765, 3, '2023-07-25 16:20:00');
INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (11111, 5, '2023-10-20 10:15:00');
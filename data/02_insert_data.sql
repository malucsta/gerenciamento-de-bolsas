-- INSTITUTO
USE GerenciamentoDeBolsas;
INSERT INTO Instituto (id, nome) VALUES (1, 'Institute of Technology');
INSERT INTO Instituto (id, nome) VALUES (2, 'College of Engineering');
INSERT INTO Instituto (id, nome) VALUES (3, 'School of Business');
INSERT INTO Instituto (id, nome) VALUES (4, 'Faculty of Arts');
INSERT INTO Instituto (id, nome) VALUES (5, 'Department of Sciences');


-- PROFESSOR
USE GerenciamentoDeBolsas;
INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES (12345, '12345678901', 'John Doe', 1);
INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES (67890, '98765432109', 'Jane Smith', 2);
INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES (54321, '56789012345', 'David Johnson', 3);
INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES (98765, '90123456789', 'Emily Davis', 4);
INSERT INTO Professor (matricula, cpf, nome, id_instituto) VALUES (11111, '11111111111', 'Robert Wilson', 5);

-- ALUNO
USE GerenciamentoDeBolsas;
INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES (12345, '12345678901', 'John Doe', 1);
INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES (67890, '98765432109', 'Jane Smith', 2);
INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES (54321, '56789012345', 'David Johnson', 3);
INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES (98765, '90123456789', 'Emily Davis', 4);
INSERT INTO Aluno (matricula, cpf, nome, id_instituto) VALUES (11111, '11111111111', 'Robert Wilson', 5);

-- GRUPO BOLSA
USE GerenciamentoDeBolsas;
INSERT INTO GrupoBolsa (id, nome, remuneracao, quantidade_total, quantidade_restante, data_inicio, data_fim) VALUES (1, 'Research Scholarship', 500, 10, 10, '2023-07-01', '2023-12-31');
INSERT INTO GrupoBolsa (id, nome, remuneracao, quantidade_total, quantidade_restante, data_inicio, data_fim) VALUES (2, 'STEM Fellowship', 1000, 5, 5, '2023-09-01', '2024-08-31');
INSERT INTO GrupoBolsa (id, nome, remuneracao, quantidade_total, quantidade_restante, data_inicio, data_fim) VALUES (3, 'Arts Grant', 750, 8, 8, '2023-08-15', '2023-11-30');
INSERT INTO GrupoBolsa (id, nome, remuneracao, quantidade_total, quantidade_restante, data_inicio, data_fim) VALUES (4, 'Business Internship', 800, 6, 6, '2023-07-15', '2024-02-28');
INSERT INTO GrupoBolsa (id, nome, remuneracao, quantidade_total, quantidade_restante, data_inicio, data_fim) VALUES (5, 'Science Research Grant', 1200, 3, 3, '2023-10-01', '2024-03-31');

-- ORIENTADOR
USE GerenciamentoDeBolsas;
INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES (12345, 1);
INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES (67890, 2);
INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES (54321, 3);
INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES (98765, 4);
INSERT INTO Orientador (matricula_professor, id_bolsa) VALUES (11111, 5);

-- BOLSISTA
USE GerenciamentoDeBolsas;
INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES (10001, 1);
INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES (10002, 2);
INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES (10003, 3);
INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES (10004, 4);
INSERT INTO Bolsista (matricula_aluno, id_bolsa) VALUES (10005, 5);

-- PROCESSO SELETIVO
USE GerenciamentoDeBolsas;
INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES (1, '2023-06-01', '2023-07-15', 1);
INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES (2, '2023-08-01', '2023-09-30', 2);
INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES (3, '2023-07-15', '2023-08-31', 3);
INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES (4, '2023-09-01', '2023-10-31', 4);
INSERT INTO ProcessoSeletivo (id, data_inicio, data_fim, id_bolsa) VALUES (5, '2023-10-15', '2023-12-15', 5);

-- ADMINISTRADOR
USE GerenciamentoDeBolsas;
INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (12345, 1);
INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (67890, 2);
INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (54321, 3);
INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (98765, 4);
INSERT INTO Administrador (matricula_professor, id_processoSeletivo) VALUES (11111, 5);

-- CANDIDATURA
USE GerenciamentoDeBolsas;
INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (10001, 1, '2023-06-10 09:30:00');
INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (10002, 1, '2023-06-12 14:45:00');
INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (10003, 2, '2023-08-05 11:00:00');
INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (10004, 3, '2023-07-25 16:20:00');
INSERT INTO Candidatura (matricula_aluno, id_processoSeletivo, data) VALUES (10005, 5, '2023-10-20 10:15:00');

import Aluno from "../entities/aluno";

export default interface IAlunoRepository {
    getAll(): Promise<any>
}
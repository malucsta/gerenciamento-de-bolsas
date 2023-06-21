export default interface GrupoBolsa {
    id: number,
    nome: string,
    remuneracao: number,
    quantidadeTotal: number,
    quantidadeRestante: number,
    dataInicio: Date,
    dataFim: Date
}
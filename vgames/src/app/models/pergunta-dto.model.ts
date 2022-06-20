import { RespostaDTO } from "./resposta-dto.model";

export class PerguntaDTO {
    
    resposta:RespostaDTO = new RespostaDTO();	
	pergunta:string = "";
	perguntaVoz:string = "";
	nivel:number;
}

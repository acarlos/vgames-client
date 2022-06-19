import { RespostaDTO } from "./resposta-dto.model";

export class PerguntaDTO {
    
    resposta:RespostaDTO = new RespostaDTO();	
	pergunta:string = "";	
	nivel:number;
}

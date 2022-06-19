import { Component, OnInit } from '@angular/core';
import { PerguntaDTO } from '../models/pergunta-dto.model';
import { RespostaDTO } from '../models/resposta-dto.model';
import { SherlockDTO } from '../models/shelock-dto.model';
import { JogoService } from '../services/jogo.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  constructor(private jogoService: JogoService){}

  title = 'vgames';
  sherlockDTO: SherlockDTO = new SherlockDTO();
  resposta: string;
  public respostaVazia: boolean = true;

  getStartGame(){
    this.jogoService.getStartGame().subscribe(data => {
      this.sherlockDTO=data;
      console.log(this.sherlockDTO);
    });
  }

  pergunta() {
    this.jogoService.getPergunta(this.sherlockDTO.indice +1).subscribe(data => {
      this.sherlockDTO=data;
    });
  }

  responda() {
    this.sherlockDTO = new SherlockDTO();
    this.jogoService.setResposta(this.resposta).subscribe(data => {
      this.sherlockDTO=data;
      this.resposta = "";
      this.respostaVazia = true;
    });
  }

  isRespostaPreenchida(): void {
    if (typeof this.resposta != 'undefined' && this.resposta) {
      this.respostaVazia = false;
    } else {
      this.respostaVazia = true;
    }
  }

  getRespostaPreenchida(): boolean {
    return this.respostaVazia;
  }

  ngOnInit(): void {
    this.getStartGame();
  }
}

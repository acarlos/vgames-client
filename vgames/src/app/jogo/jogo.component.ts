import { Component, OnInit } from '@angular/core';
import { PerguntaDTO } from '../models/pergunta-dto.model';
import { RespostaDTO } from '../models/resposta-dto.model';
import { SherlockDTO } from '../models/shelock-dto.model';
import { JogoService } from '../services/jogo.service';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  constructor(private jogoService: JogoService) { }

  title = 'vgames';
  sherlockDTO: SherlockDTO = new SherlockDTO();
  resposta: string;
  public respostaVazia: boolean = true;
  public jogoIniciado: boolean = false;
  public gravadorOn: boolean = false;

  getStartGame() {
    console.log('start')
    this.sherlockDTO = new SherlockDTO();
    this.resposta = "";
    this.respostaVazia = true;
    this.jogoService.getStartGame().subscribe(data => {
      this.sherlockDTO = data;
      console.log(this.sherlockDTO);
    });
  }

  pergunta() {
    this.jogoService.getPergunta(this.sherlockDTO.indice + 1).subscribe(data => {
      this.sherlockDTO = data;
      let audioElement = <HTMLAudioElement>document.getElementById('perguntaVoz');
      audioElement.src = data.perguntaDTO.perguntaVoz;
      audioElement.play();
      if (!this.sherlockDTO.jogo) {
        this.jogoIniciado = false;
      }
    });
  }

  responda() {
    var textInVoice = <HTMLInputElement>document.getElementById("resposta");
    this.resposta = textInVoice.value;
    this.jogoService.setResposta(this.resposta).subscribe(data => {
      this.sherlockDTO = data;
      let audioElement = <HTMLAudioElement>document.getElementById('sentencaVoz');
      audioElement.src = data.perguntaDTO.resposta.sentencaVoz;
      audioElement.play();
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

  isJogoIniciado(): Boolean {
    return this.jogoIniciado;
  }

  startGame(): void {
    if (this.sherlockDTO.indice > 0) {
      this.getStartGame();
    }
    this.jogoIniciado = true;
  }

  ngOnInit(): void {
    this.getStartGame();
  }

  recognition = new webkitSpeechRecognition();

  iniciarAudicaoPergunta() {
    this.gravadorOn = true;
    var textInVoice = <HTMLInputElement>document.getElementById("resposta");
    this.recognition.continuous = true;
    this.recognition.start();
    this.recognition.onend = function (event) {
      if (textInVoice.value == "") {
        textInVoice.value = "";
      }
      textInVoice.focus();
    }
    this.recognition.onresult = function (event) {
      textInVoice.blur();
      var texto = "";
      for (var i = event.resultIndex; event.results.length > i; ++i) {
        if (event.results[i].isFinal) {
          texto += event.results[i][0].transcript;
        }
      }
      textInVoice.value = texto;
    }
  }

  pararAudicaoResposta() {
    this.recognition.stop();
    this.respostaVazia = false;
    this.gravadorOn = false;
  }

  getGravadorOn():boolean{
    return this.gravadorOn; 
  }

}

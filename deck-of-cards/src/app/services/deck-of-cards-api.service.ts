import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeckResponse } from '../interfaces/deck-response';

@Injectable({
  providedIn: 'root'
})
export class DeckOfCardsApiService {

  private deckOfCardApiBaseUrl: string = 'https://deckofcardsapi.com/api/';

  private brandNewDeckUrl: string = this.deckOfCardApiBaseUrl + 'deck/new/';

  private brandNewDeckAndShuffleUrl: string = this.deckOfCardApiBaseUrl + 'deck/new/shuffle/?deck_count=1';

  private drawACardUrl: string = this.deckOfCardApiBaseUrl + 'deck/<<deck_id>>/draw/?count=<<nrOfCardsToDraw>>'; 

  constructor(private httpClient: HttpClient) {
  }

  public shuffleTheCards(): Observable<DeckResponse> {
    return this.httpClient.get<DeckResponse>(this.brandNewDeckAndShuffleUrl);
  }

  public brandNewDeck(): Observable<DeckResponse> {
    return this.httpClient.get<DeckResponse>(this.brandNewDeckUrl);
  }

  public drawACard(deck_id: string, nrOfCardsToDraw: number) {
    let drawACardUrl = this.drawACardUrl.replace('<<deck_id>>', deck_id).replace('<<nrOfCardsToDraw>>', nrOfCardsToDraw.toString());
    return this.httpClient.get<DeckResponse>(drawACardUrl);
  }

}

import { Component, OnInit} from '@angular/core';
import { MatDialogRef, MatDialog} from '@angular/material/dialog';
import { DeckOfCardsApiService } from '../../services/deck-of-cards-api.service';
import { MatSliderChange } from '@angular/material/slider';
import { CardResponse } from '../../interfaces/card-response';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})
export class CardGameComponent implements OnInit {
  private currentDeckId: string | null = null;
  private nrOfCardsToDraw: number = 2;
  private cardsDrawn: CardResponse[] | null = null;

  public isDeckDrawn(): boolean {
    return this.currentDeckId != null && this.currentDeckId.length > 0;
  }


  constructor(private dialog: MatDialog, private apiService: DeckOfCardsApiService) {
  }

  ngOnInit() {
  }

  refreshDeck() {
    this.apiService.brandNewDeck().subscribe(response => {
      this.currentDeckId = response.deck_id;
      this.openDialog();
      this.cardsDrawn = null;
    })
  }

  drawCards() {
    this.apiService.drawACard(this.currentDeckId, this.nrOfCardsToDraw).subscribe(response =>
    {
      console.info(response);
      this.cardsDrawn = response.cards;
    });
  }


  updateNrOfCardsToDraw(e: MatSliderChange) {
    this.nrOfCardsToDraw = e.value;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CardsShuffledConfirmationDialogComponent, { width: '250px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


@Component({
  selector: 'cards-shuffled-confirmation-dialog',
  template: `<div> A new deck of cards has been shuffled </div>
    <div mat-dialog-actions>      
      <button mat-button [mat-dialog-close] cdkFocusInitial> Ok </button>
    </div>
  `,
})
export class CardsShuffledConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CardsShuffledConfirmationDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

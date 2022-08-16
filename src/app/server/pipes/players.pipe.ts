import { Pipe, PipeTransform } from '@angular/core';
import { Player } from 'src/app/player/player';

@Pipe({
  name: 'players'
})
export class PlayersPipe implements PipeTransform {
  transform(players?: Player[]): string {
    if (!players?.length)
      return '';

    return players.map(player => player.name).join(', ')
  }
}

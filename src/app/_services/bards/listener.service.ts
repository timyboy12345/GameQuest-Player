import { Injectable } from '@angular/core';
import * as PN from 'pubnub/dist/web/pubnub.js';
import * as PubNub from 'pubnub';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { BardsQuestion } from '../../_interfaces/bards_question.interface';
import { Player } from '../../_interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {
  private readonly pubNub: PubNub;

  constructor() {
    this.pubNub = new PN({
      publishKey: environment.PUBNUB_PUBLISH_KEY,
      subscribeKey: environment.PUBNUB_SUBSCRIBE_KEY,
    });
  }

  public setPlayerUuid(uuid: string) {
    this.pubNub.setUUID(uuid);
  }

  public subscribe(channel: string) {
    this.pubNub.subscribe({
      channels: [channel],
      withPresence: true
    });
  }

  public listen(): Observable<PubNub.MessageEvent> {
    return new Observable((observer) => {
      this.pubNub.addListener({
        message(messageEvent) {
          observer.next(messageEvent);
        }
      });
    });
  }

  public sendQuestion(player: Player, question: BardsQuestion, channel: string) {
    this.publish({
      player,
      question,
      type: MessageTypes.NEW_QUESTION
    }, channel);
  }

  public playerJoined(player: Player, channel: string) {
    return this.publish({
      player,
      type: MessageTypes.PLAYER_JOINED
    }, channel);
  }

  public endGame(channel: string) {
    return this.publish({
      type: MessageTypes.GAME_ENDED
    }, channel);
  }

  public startGame(channel: string) {
    return this.publish({
      type: MessageTypes.GAME_STARTED
    }, channel);
  }

  private publish(message: { type?: MessageTypes, question?: BardsQuestion, player?: Player }, channel: string) {
    return this.pubNub.publish({
      channel,
      message
    });
  }
}

export enum MessageTypes {
  'NEW_QUESTION' = 'NEW_QUESTION',
  'PLAYER_JOINED' = 'PLAYER_JOINED',
  'GAME_STARTED' = 'GAME_STARTED',
  'GAME_ENDED' = 'GAME_ENDED',
}

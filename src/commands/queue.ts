import {Message} from 'discord.js';
import {TYPES} from '../types';
import {inject, injectable} from 'inversify';
import QueueManager from '../managers/queue';
import Command from '.';

@injectable()
export default class implements Command {
  public name = 'queue';
  public aliases = ['q'];
  public examples = [
    ['queue', 'shows current queue']
  ];

  private readonly queueManager: QueueManager;

  constructor(@inject(TYPES.Managers.Queue) queueManager: QueueManager) {
    this.queueManager = queueManager;
  }

  public async execute(msg: Message, _: string []): Promise<void> {
    const queue = this.queueManager.get(msg.guild!.id);

    await msg.channel.send('`' + JSON.stringify(queue.getCurrent()) + '`');

    await msg.channel.send('`' + JSON.stringify(queue.get().slice(0, 10)) + '`');
  }
}

import { Injectable } from '@nestjs/common';
import { BotService } from '../bot/services/bot.service';
import { GuildsService } from '../guilds/services/guild.service';

import {
	AutoModerationActionType,
	AutoModerationRuleEventType,
	AutoModerationRuleTriggerType,
} from '@discordjs/core';

@Injectable()
export class AutoModService {
	constructor(
        private readonly bot: BotService,
        private readonly guilds: GuildsService,
	// eslint-disable-next-line no-empty-function
	) {}

	public async enableRule(guildId: string, rule: string, actions: AutoModerationActionType) {
		switch (rule) {
		case 'mentionspam':
			// eslint-disable-next-line no-case-declarations
			const rule = await this.bot.api.guilds.createAutoModerationRule(guildId, {
				name: 'Evelyn | Mention Spam',
				enabled: true,
				event_type: AutoModerationRuleEventType.MessageSend,
				trigger_type: AutoModerationRuleTriggerType.MentionSpam,
				trigger_metadata: {
					mention_total_limit: 2,
					mention_raid_protection_enabled: true,
				},
				actions: [
					{
						type: actions,
					},
				],
			});

			return await this.guilds.update(rule.guild_id, {
				automod: {
					mentionspam: {
						enabled: true,
						ruleId: rule.id,
					},
				},
			});
		}
	}
}

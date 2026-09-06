import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const discordGuilds = pgTable(
  "discord_guilds",
  {
    id: serial("id").primaryKey(),
    guildId: text("guild_id").notNull(),
    ownerId: text("owner_id"),
    channelIds: jsonb("channel_ids")
      .$type<Record<string, string>>()
      .notNull()
      .default({}),
    roleIds: jsonb("role_ids").$type<Record<string, string>>().notNull().default({}),
    config: jsonb("config")
      .$type<Record<string, unknown>>()
      .notNull()
      .default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    guildUnique: unique("discord_guilds_guild_id_unique").on(table.guildId),
  }),
);

export const discordWarnings = pgTable("discord_warnings", {
  id: serial("id").primaryKey(),
  guildId: text("guild_id").notNull(),
  userId: text("user_id").notNull(),
  moderatorId: text("moderator_id").notNull(),
  reason: text("reason").notNull(),
  warningNumber: integer("warning_number").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const discordTickets = pgTable("discord_tickets", {
  id: serial("id").primaryKey(),
  guildId: text("guild_id").notNull(),
  channelId: text("channel_id").notNull(),
  ticketNumber: integer("ticket_number").notNull(),
  type: text("type").notNull(),
  ownerId: text("owner_id").notNull(),
  claimedBy: text("claimed_by"),
  priority: text("priority").notNull().default("normal"),
  status: text("status").notNull().default("open"),
  lastActivityAt: timestamp("last_activity_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  closedAt: timestamp("closed_at", { withTimezone: true }),
});

export const discordGiveaways = pgTable("discord_giveaways", {
  id: serial("id").primaryKey(),
  guildId: text("guild_id").notNull(),
  channelId: text("channel_id").notNull(),
  messageId: text("message_id").notNull(),
  prize: text("prize").notNull(),
  winnerCount: integer("winner_count").notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
  ended: boolean("ended").notNull().default(false),
  createdBy: text("created_by").notNull(),
});

export type DiscordGuild = typeof discordGuilds.$inferSelect;
export type DiscordWarning = typeof discordWarnings.$inferSelect;
export type DiscordTicket = typeof discordTickets.$inferSelect;
export type DiscordGiveaway = typeof discordGiveaways.$inferSelect;
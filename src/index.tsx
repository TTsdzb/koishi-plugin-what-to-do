import { Context, Schema } from "koishi";

export const name = "what-to-do";

export interface Config {
  list: {
    name: string;
    pic?: string;
  }[];
  shortcut: string;
}

export const Config: Schema<Config> = Schema.object({
  list: Schema.array(
    Schema.object({
      name: Schema.string().required(),
      pic: Schema.string(),
    })
  ).required(),
  shortcut: Schema.string().default(
    "^(今天|明天|后天|早晨|上午|下午|晚上)做什么$"
  ),
}).i18n({
  "zh-CN": require("./locales/zh-CN")._config,
});

export function apply(ctx: Context, config: Config) {
  // Register i18n
  ctx.i18n.define("zh-CN", require("./locales/zh-CN"));

  const nickname = ctx.root.config.nickname
    ? ctx.root.config.nickname instanceof Array
      ? ctx.root.config.nickname.length === 0
        ? "Koishi"
        : ctx.root.config.nickname[0]
      : ctx.root.config.nickname
    : "Koishi";
  const shortcut = new RegExp(config.shortcut);

  ctx.command("what-to-do [time:string]").action(({ session }, time) => {
    if (config.list.length === 0) return <i18n path=".nothingToDo" />;

    const choice = config.list[Math.floor(Math.random() * config.list.length)];

    return (
      <>
        <quote id={session.messageId} />
        <i18n path=".recommend">
          <>{nickname}</>
          <>{time ? time : ""}</>
        </i18n>
        <p>{choice.name}</p>
        {choice.pic ? <img src={choice.pic} /> : ""}
      </>
    );
  });

  ctx.middleware((session, next) => {
    const match = shortcut.exec(session.content);
    if (match) {
      session.execute(`what-to-do ${match[1] ? match[1] : ""}`);
    } else {
      next();
    }
  });
}

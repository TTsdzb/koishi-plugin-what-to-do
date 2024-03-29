import { Context, Schema } from "koishi";
import random from "random";

export const name = "what-to-do";

export interface Config {
  botName: string;
  list: {
    name: string;
    pic?: string;
  }[];
}

export const Config: Schema<Config> = Schema.object({
  botName: Schema.string().default("Koishi"),
  list: Schema.array(
    Schema.object({
      name: Schema.string().required(),
      pic: Schema.string(),
    })
  ).required(),
}).i18n({
  "zh-CN": require("./locales/zh-CN")._config,
});

export function apply(ctx: Context, config: Config) {
  // Register i18n
  ctx.i18n.define("zh-CN", require("./locales/zh-CN"));

  ctx
    .command("what-to-do [time:string]")
    .action(({ session }, time) => {
      if (config.list.length === 0) return <i18n path=".nothingToDo" />;

      const choice = random.choice(config.list);

      return (
        <>
          <quote id={session.messageId} />
          <i18n path=".recommend">
            <>{config.botName}</>
            <>{time ? time : ""}</>
          </i18n>
          <p>{choice.name}</p>
          {choice.pic ? <img src={choice.pic} /> : ""}
        </>
      );
    })
    .shortcut(/^(今天|明天|后天|早晨|上午|下午|晚上)做什么$/i, {
      args: ["$1"],
    });
}

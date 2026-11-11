# 游诺（Questnori）· 无尽冬日（Whiteout Survival）

游诺（Questnori）的无尽冬日游戏项目。让人工智能（AI）通过实际游戏界面，帮助玩家完成重复操作，并将验证过的经验沉淀为可复用技能（Skill）。

游诺按游戏分别维护仓库；本仓库只收录无尽冬日相关技能。当前交付是首个经过实测的操作技能，尚未实现云端托管、全天候运行或多账号调度。

## 首个技能：无尽冬日快速进入登录入口

换设备启动无尽冬日（Whiteout Survival）后，新手剧情可能挡在旧账号登录之前。本技能推进必要引导，打开账号登录方式列表后停止。

实测路线：跳过剧情 → 伐木、点火 → 建造厨房和炉灶 → 分配厨师 → 跳过后续剧情 → 领取首次点火奖励 → 关闭任务面板 → 头像 → 设置（Settings）→ 账号（Account）→ 切换账号（Change Account）。

2026-11-11 的桌面实测中，暖炉 1 级即可进入登录界面，不必完成第一章。没有验证所有游戏版本，也没有实际恢复旧账号。

## 使用

将 `skills/whiteout-login-fast` 复制到本机 `~/.codex/skills/`，在支持电脑操作工具（cua_repl）的环境中调用 `$whiteout-login-fast`。技能提供连接、识图决策和操作流程，具体内容见 [技能说明](skills/whiteout-login-fast/SKILL.md)。

附带的 [操作记录脚本](skills/whiteout-login-fast/scripts/tutorial-session.mjs) 在工具运行环境中加载，接受已连接的应用对象，保存操作前后的截图与点击日志。它不是独立手机脚本，也不是无视觉判断的固定坐标连点器。

## 当前边界

- 已实测 macOS 游戏应用，未验证 Android/iPhone 自动操作。
- 不充值、不消费钻石，到登录方式列表即停止。
- 不保存账号密码或自动绑定旧账号。
- 本仓库仅包含技能代码和文字路线；运行生成的截图与账号记录留在本地。

## 文件

- `skills/whiteout-login-fast/SKILL.md`：技能入口。
- `skills/whiteout-login-fast/references/route.md`：实测路线与易错步骤。
- `skills/whiteout-login-fast/scripts/tutorial-session.mjs`：操作与截图记录助手。

本项目不是游戏官方产品，与游戏发行方无隶属关系。

// 在 cua_repl 中加载；只使用宿主提供的 CUA 应用对象，不是独立 Node 点击器。
import {mkdir, writeFile, appendFile} from 'node:fs/promises';
import {join} from 'node:path';

export async function createTutorialSession({app, emitImage, outputDir}) {
  if (!app || !emitImage || !outputDir) throw new Error('需要 app、emitImage 和 outputDir');
  await mkdir(outputDir, {recursive:true});
  let sequence = 0;
  let observed = false;
  let stopped = false;
  const log = entry => appendFile(join(outputDir, 'events.jsonl'), JSON.stringify({time:new Date().toISOString(), ...entry})+'\n');
  async function capture(label='观察') {
    const bytes = await app.getScreenshot({emit:false});
    const file = `${String(++sequence).padStart(3,'0')}.png`;
    await writeFile(join(outputDir,file),bytes);
    await log({type:'screenshot',label,file});
    await emitImage(bytes);
    observed = true;
    return {file,label};
  }
  async function clickObserved({label,x,y}) {
    if(stopped) throw new Error('已到达登录入口，停止游戏操作');
    if(!observed) throw new Error('先 capture 并由操作者识别当前画面');
    if(!label || !Number.isFinite(x) || !Number.isFinite(y) || x<0 || y<0) throw new Error('需要操作名称和有效坐标');
    observed = false;
    await log({type:'attempt',label,x,y});
    try {
      await app.click([x,y]);
      await app.getAXState({emit:false});
      return await capture(label+'：操作后');
    } catch(error) {
      await log({type:'error',label,error:String(error)});
      throw error;
    }
  }
  async function finish() {
    await capture('账号登录方式已显示');
    stopped = true;
    await log({type:'stop',reason:'login-entry-visible'});
  }
  return {capture,clickObserved,finish};
}

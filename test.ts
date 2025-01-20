import { spawn } from 'child_process';
import path from "path";
import { logger } from './src/utils';
const config_path = path.join(__dirname, 'src/helpers/config.ts');
const wrap_sol_path = path.join(__dirname, 'src/helpers/wrap_sol.ts');
const unwrap_sol_path = path.join(__dirname, 'src/helpers/unwrap_sol.ts');   
const create_token_path = path.join(__dirname, 'src/token/create.ts');
const burn_token_path = path.join(__dirname, 'src/token/burn.ts');
const copy_trade_path = path.join(__dirname, 'src/grpc-copy-bot/src/streaming/copy-trade.ts');
const pumpfun_sniper_path = path.join(__dirname, 'src/grpc-pf-sniper/src/streaming/snipe-create.ts');
async function runSHScript(scriptPath: string) {
    return new Promise((resolve, reject) => {
        const child = spawn('ts-node', [scriptPath, " -h"], {
            stdio: 'inherit',
            shell: true,
        });
      
        child.on('close', (code) => {
            //console.log(`Child process for ${scriptPath} exited with code ${code}`);
            resolve(code); // Resolve the promise when the process exits
        });
      
        child.on('error', (err) => {
            //console.error(`Error running ${scriptPath}:`, err);
            reject(err); // Reject the promise on error
        });
    });
  }
/**
 * please run this before using the cli
 */

async function test(){
    logger.info("Testing helper scripts...");
    await runSHScript(config_path);
    await runSHScript(wrap_sol_path);
    await runSHScript(unwrap_sol_path);
    logger.info("Testing Memecoin scripts...");
    await runSHScript(create_token_path);
    await runSHScript(burn_token_path);
    logger.info("Testing grpc Streaming scripts...");
    await runSHScript(copy_trade_path);
    await runSHScript(pumpfun_sniper_path);

    logger.info("All tests passed!");
}
test();


//if u need working copy_trade_path, plz contact here: https://t.me/shiny0103

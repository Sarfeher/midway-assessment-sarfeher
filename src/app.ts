import { AppError } from './app.error';
import { details, list } from './commands';
import { Store } from './stores/store.type';
import { RecipeType } from './recipe';

type Command = (store: Store<RecipeType[]>, args: string[]) => Promise<void>

export async function createApp(store: Store<RecipeType[]>, args: string[], ) {
  const [, , command, ...restArgs] = args;
  
  const commands: Record<string, Command> = {
    'list': list,
    'details': details
  }

  if (command === 'list' && restArgs.length !== 0) {
    throw new AppError('The list command should not have any argument.');
  }

  if(command in commands) {
    const commandFunction = commands[command] 
    await commandFunction(store, restArgs);
  } else {
    throw new AppError(`Unknown command: ${command}, Available commands are: ${Object.keys(commands).join(", ")}`);
  }
}
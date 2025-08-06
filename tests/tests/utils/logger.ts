import fs from 'fs';
import path from 'path';

export class Logger {
  private stream: fs.WriteStream;

  constructor(filename: string = 'resultado.log') {
    const filepath = path.resolve(process.cwd(), filename);
    this.stream = fs.createWriteStream(filepath, { flags: 'w' });
    this.log(`📝 Log iniciado em ${new Date().toISOString()}`);
  }

  log(message: string) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${message}`;
    console.log(line);
    this.stream.write(line + '\n');
  }

  error(message: string, err: unknown) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ❌ ${message} | Erro: ${String(err)}`;
    console.error(line);
    this.stream.write(line + '\n');
  }

  close() {
    this.log('✅ Log finalizado');
    this.stream.end();
  }
}
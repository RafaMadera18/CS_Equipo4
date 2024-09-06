import { Terminal } from "@xterm/xterm";
import { FitAddon } from '@xterm/addon-fit';

export class TerminalEmulator {
    private readonly terminal: Terminal;
    private readonly fitAddon: FitAddon;
    private readonly promptString: string;
    private line: string = "";
    private inputEnabled: boolean = false;

    public constructor(readonly container: HTMLElement, prompt?: string) {
        this.terminal = new Terminal({ cursorBlink: true });

        this.fitAddon = new FitAddon();
        this.terminal.loadAddon(this.fitAddon);

        this.terminal.open(container);

        this.fitAddon.fit();

        this.promptString = prompt ?? "";
        this.listenToInput();
    }

    public write(data: string, addToLine?: boolean): void {
        this.terminal.write(data);
        if (addToLine) {
            this.line += data;
        }
    }

    public writeLine(data: string): void {
        this.terminal.write(data);
        this.newLine();
    }

    public backspace(): void {
        this.write('\b \b');
        // TODO: Remove at cursor pos
        this.line = this.line.slice(0, -1);
    }

    public newLine(): void {
        this.write('\r\n');
        this.line = "";
    }

    public fit(): void {
        this.fitAddon.fit();
    }

    public prompt(): Promise<string> {
        this.inputEnabled = true;
        this.writePrompt();

        return new Promise((resolve) => {
            this.resolveLine = resolve;
        });
    }

    private resolveLine: ((value: string) => void) | null = null;

    private onNewLine() {
        if (this.resolveLine == null) {
            return;
        }

        this.resolveLine(this.line);
        this.resolveLine = null;
        this.inputEnabled = false;
        this.newLine();
    }

    private writePrompt(): void {
        this.newLine();
        this.write(this.promptString);
    }

    private listenToInput(): void {
        this.terminal.onData((data: string) => {
            if (!this.inputEnabled) {
                return;
            }

            const multiline = data.indexOf("\r") >= 0;

            data = data.split("\r")[0];

            switch (data) {
                case '\r': // Enter
                case '\u0003': // Ctrl+C
                    this.onNewLine();
                    return;
                case '\u007F': // Backspace
                    if (this.terminal.buffer.active.cursorX > this.promptString.length) {
                        this.backspace();
                    }
                    break;
                case '\x1b[A': // Up arrow
                case '\x1b[B': // Down arrow
                    break;
                case '\x1b[C': // Right arrow
                    if (this.cursorIsInBounds(1)) {
                        this.write(data);
                    }
                    break;
                case '\x1b[D': // Left arrow
                    if (this.cursorIsInBounds(-1)) {
                        this.write(data);
                    }
                    break;
                default:
                    this.write(data, true);
            }

            if (multiline) {
                this.onNewLine();
            }
        });
    }

    private cursorIsInBounds(offset: number) {
        const index = this.terminal.buffer.active.cursorX - this.promptString.length + offset;
        return index >= 0 && index <= this.line.length;
    }
}
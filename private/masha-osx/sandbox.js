// A pretend shell over a pretend home folder. Pure functions so bun test can drive them;
// index.html wires them to a <pre>. Nothing here touches the real file system.
(function (root) {
  const HOME = "/Users/masha";

  function create() {
    // A folder is an object; a file is a string.
    const fs = {
      Users: {
        masha: {
          Desktop: { "Screenshot 2026-11-04 at 17.20.11.png": "(png)" },
          Documents: { "cv.txt": "Masha Madani\nInformatikerin EFZ\nZürich\n", "shopping.txt": "milk\nbread\noat milk\napples\n" },
          Downloads: { "report.pdf": "(pdf)", "photo.jpg": "(jpg)" },
          Playground: {},
          ".zshrc": 'alias ll="ls -la"\n',
          "notes.txt": "first line\nsecond line\nthird line\n",
        },
      },
    };
    return { fs, cwd: HOME, prev: HOME, clipboard: "", history: [] };
  }

  function parts(p) { return p.split("/").filter(Boolean); }
  function resolve(state, p) {
    if (!p || p === "~") return HOME;
    if (p.startsWith("~/")) p = HOME + p.slice(1);
    const base = p.startsWith("/") ? [] : parts(state.cwd);
    const out = base.slice();
    for (const seg of parts(p)) {
      if (seg === ".") continue;
      if (seg === "..") { out.pop(); continue; }
      out.push(seg);
    }
    return "/" + out.join("/");
  }
  function node(state, abs) {
    let n = state.fs;
    for (const seg of parts(abs)) {
      if (n === null || typeof n !== "object" || !(seg in n)) return undefined;
      n = n[seg];
    }
    return n;
  }
  function parentOf(state, abs) {
    const ps = parts(abs);
    const name = ps.pop();
    return { dir: node(state, "/" + ps.join("/")), name };
  }
  function isDir(n) { return n !== null && typeof n === "object"; }
  function pretty(state, abs) { return abs === HOME ? "~" : abs.startsWith(HOME + "/") ? "~" + abs.slice(HOME.length) : abs; }

  // Split a line on | but not inside quotes. Then split each command into words with quotes honoured.
  function splitPipes(line) {
    const out = []; let cur = ""; let q = null;
    for (const ch of line) {
      if (q) { cur += ch; if (ch === q) q = null; continue; }
      if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
      if (ch === "|") { out.push(cur); cur = ""; continue; }
      cur += ch;
    }
    out.push(cur);
    return out.map((s) => s.trim()).filter(Boolean);
  }
  function words(cmd) {
    const out = []; let cur = ""; let q = null; let has = false;
    for (const ch of cmd) {
      if (q) { if (ch === q) { q = null; } else cur += ch; continue; }
      if (ch === '"' || ch === "'") { q = ch; has = true; continue; }
      if (/\s/.test(ch)) { if (cur || has) { out.push(cur); cur = ""; has = false; } continue; }
      cur += ch;
    }
    if (cur || has) out.push(cur);
    return out;
  }

  const HELP = [
    "pwd            where am I",
    "ls [-la] [dir] list files",
    "cd [dir]       change folder (.., ~, -)",
    "cat file       print a file",
    "head/tail file first or last lines (-n N)",
    "mkdir [-p] dir make a folder",
    "touch file     make an empty file",
    "echo text      print; > file writes, >> file appends",
    "cp a b         copy a file",
    "mv a b         move or rename",
    "rm [-r] x      delete (no undo, even here)",
    "grep [-i] w    lines containing w (file or pipe)",
    "wc -l          count lines",
    "sort, uniq -c  sort lines, count duplicates",
    "pbcopy/pbpaste the pretend clipboard",
    "say text       the Mac speaks (if your browser allows)",
    "history        what you typed",
    "clear          wipe the screen",
    "a | b          pipe a's output into b",
  ].join("\n");

  // Runs one command with stdin text; returns { out, err, clear?, say? }.
  function runOne(state, cmd, stdin) {
    const w = words(cmd);
    if (w.length === 0) return { out: "" };
    const name = w[0];
    const flags = w.slice(1).filter((a) => a.startsWith("-") && a.length > 1);
    const args = w.slice(1).filter((a) => !(a.startsWith("-") && a.length > 1));
    const flag = (f) => flags.some((x) => x.slice(1).includes(f));
    const readFile = (p) => {
      const abs = resolve(state, p); const n = node(state, abs);
      if (n === undefined) return { err: `${name}: ${p}: No such file or directory` };
      if (isDir(n)) return { err: `${name}: ${p}: Is a directory` };
      return { text: n };
    };
    switch (name) {
      case "help": return { out: HELP };
      case "pwd": return { out: state.cwd };
      case "clear": return { out: "", clear: true };
      case "history": return { out: state.history.map((h, i) => `${String(i + 1).padStart(5)}  ${h}`).join("\n") };
      case "whoami": return { out: "masha" };
      case "date": return { out: new Date().toString() };
      case "echo": return { out: args.join(" ") };
      case "ls": {
        const target = resolve(state, args[0] || ".");
        const n = node(state, target);
        if (n === undefined) return { err: `ls: ${args[0]}: No such file or directory` };
        if (!isDir(n)) return { out: args[0] };
        let names = Object.keys(n).sort((a, b) => a.localeCompare(b));
        if (!flag("a")) names = names.filter((k) => !k.startsWith("."));
        if (flag("l")) {
          const rows = flag("a") ? ["drwxr-xr-x  masha  staff   .", "drwxr-xr-x  masha  staff   .."] : [];
          for (const k of names) {
            const v = n[k];
            rows.push(isDir(v) ? `drwxr-xr-x  masha  staff   ${k}` : `-rw-r--r--  masha  staff   ${String(v.length).padStart(4)} ${k}`);
          }
          return { out: `total ${names.length}\n` + rows.join("\n") };
        }
        return { out: names.map((k) => (isDir(n[k]) ? k + "/" : k)).join("\n") };
      }
      case "cd": {
        let target = args[0];
        if (target === "-") target = state.prev;
        const abs = resolve(state, target);
        const n = node(state, abs);
        if (n === undefined) return { err: `cd: no such file or directory: ${args[0]}` };
        if (!isDir(n)) return { err: `cd: not a directory: ${args[0]}` };
        state.prev = state.cwd; state.cwd = abs;
        return { out: "" };
      }
      case "cat": {
        if (args.length === 0) return { out: stdin || "" };
        const outs = []; for (const p of args) { const r = readFile(p); if (r.err) return r; outs.push(r.text); }
        return { out: outs.join("").replace(/\n$/, "") };
      }
      case "head": case "tail": {
        const nIdx = flags.findIndex((f) => f === "-n");
        let count = 10;
        if (nIdx >= 0) { count = parseInt(args[0], 10) || 10; args.shift(); }
        let text = stdin || "";
        if (args[0]) { const r = readFile(args[0]); if (r.err) return r; text = r.text; }
        const lines = text.replace(/\n$/, "").split("\n");
        return { out: (name === "head" ? lines.slice(0, count) : lines.slice(-count)).join("\n") };
      }
      case "wc": {
        let text = stdin || "";
        if (args[0]) { const r = readFile(args[0]); if (r.err) return r; text = r.text; }
        const lines = text === "" ? 0 : text.replace(/\n$/, "").split("\n").length;
        const wordsN = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        if (flag("l")) return { out: `${String(lines).padStart(8)}${args[0] ? " " + args[0] : ""}` };
        if (flag("w")) return { out: `${String(wordsN).padStart(8)}${args[0] ? " " + args[0] : ""}` };
        return { out: `${String(lines).padStart(8)}${String(wordsN).padStart(8)}${String(text.length).padStart(8)}${args[0] ? " " + args[0] : ""}` };
      }
      case "grep": {
        if (args.length === 0) return { err: "usage: grep [-i] [-c] pattern [file]" };
        const pat = args[0];
        let text = stdin || "";
        if (args[1]) { const r = readFile(args[1]); if (r.err) return r; text = r.text; }
        const re = new RegExp(pat.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flag("i") ? "i" : "");
        const lines = text.replace(/\n$/, "").split("\n").filter((l) => re.test(l));
        if (flag("c")) return { out: String(lines.length) };
        return { out: lines.join("\n") };
      }
      case "sort": {
        let text = stdin || "";
        if (args[0]) { const r = readFile(args[0]); if (r.err) return r; text = r.text; }
        const lines = text.replace(/\n$/, "").split("\n").filter((l) => l !== "");
        lines.sort((a, b) => a.localeCompare(b));
        if (flag("r")) lines.reverse();
        return { out: lines.join("\n") };
      }
      case "uniq": {
        const lines = (stdin || "").replace(/\n$/, "").split("\n");
        const out = []; let last = null; let n = 0;
        const flush = () => { if (last !== null) out.push(flag("c") ? `${String(n).padStart(4)} ${last}` : last); };
        for (const l of lines) { if (l === last) { n++; } else { flush(); last = l; n = 1; } }
        flush();
        return { out: out.join("\n") };
      }
      case "mkdir": {
        if (args.length === 0) return { err: "usage: mkdir [-p] directory" };
        for (const p of args) {
          const abs = resolve(state, p);
          const segs = parts(abs);
          let cur = state.fs;
          for (let i = 0; i < segs.length; i++) {
            const s = segs[i];
            const last = i === segs.length - 1;
            if (!(s in cur)) {
              if (!last && !flag("p")) return { err: `mkdir: ${p}: No such file or directory` };
              cur[s] = {};
            } else if (!isDir(cur[s])) return { err: `mkdir: ${p}: Not a directory` };
            else if (last && !flag("p")) return { err: `mkdir: ${p}: File exists` };
            cur = cur[s];
          }
        }
        return { out: "" };
      }
      case "touch": {
        if (args.length === 0) return { err: "usage: touch file" };
        for (const p of args) {
          const { dir, name: fn } = parentOf(state, resolve(state, p));
          if (!isDir(dir)) return { err: `touch: ${p}: No such file or directory` };
          if (!(fn in dir)) dir[fn] = "";
        }
        return { out: "" };
      }
      case "cp": case "mv": {
        if (args.length < 2) return { err: `usage: ${name} source target` };
        const src = resolve(state, args[0]); const sn = node(state, src);
        if (sn === undefined) return { err: `${name}: ${args[0]}: No such file or directory` };
        if (isDir(sn) && name === "cp" && !flag("r")) return { err: `cp: ${args[0]} is a directory (not copied).` };
        let dst = resolve(state, args[1]); const dn = node(state, dst);
        if (isDir(dn)) dst = dst + "/" + parts(src).pop();
        const { dir, name: fn } = parentOf(state, dst);
        if (!isDir(dir)) return { err: `${name}: ${args[1]}: No such file or directory` };
        dir[fn] = isDir(sn) ? JSON.parse(JSON.stringify(sn)) : sn;
        if (name === "mv") { const p = parentOf(state, src); delete p.dir[p.name]; }
        return { out: "" };
      }
      case "rm": {
        if (args.length === 0) return { err: "usage: rm [-r] file" };
        for (const p of args) {
          const abs = resolve(state, p);
          if (abs === HOME || abs === "/" || abs === "/Users") return { err: `rm: ${p}: the sandbox refuses, and so should you` };
          const n = node(state, abs);
          if (n === undefined) return { err: `rm: ${p}: No such file or directory` };
          if (isDir(n) && !flag("r")) return { err: `rm: ${p}: is a directory` };
          const { dir, name: fn } = parentOf(state, abs);
          delete dir[fn];
        }
        return { out: "" };
      }
      case "pbcopy": state.clipboard = stdin || ""; return { out: "" };
      case "pbpaste": return { out: state.clipboard.replace(/\n$/, "") };
      case "say": return { out: "", say: args.length ? args.join(" ") : (stdin || "") };
      case "open": return { out: `(this would open ${args[0] || "."} in Finder or an app; the sandbox only pretends)` };
      case "man": return { out: `No manual in the sandbox. Type help, or in the real Terminal: man ${args[0] || "command"} (q to leave).` };
      case "sudo": return { err: "sudo: not in the sandbox. Nothing here needs it, and neither does brew." };
      case "vim": case "vi": return { out: "You opened vim. The way out is :q! then Return. (The sandbox let you off.)" };
      case "nano": return { out: "nano needs a real Terminal. Ctrl+O saves, Ctrl+X leaves." };
      default: return { err: `zsh: command not found: ${name}` };
    }
  }

  // Runs a whole line: pipes, and > / >> redirection on the last command.
  function run(state, line) {
    line = line.trim();
    if (!line) return { out: "" };
    state.history.push(line);
    let redirect = null; let append = false;
    const m = line.match(/^(.*?)\s*(>>|>)\s*(\S+)\s*$/);
    if (m) { line = m[1]; redirect = m[3]; append = m[2] === ">>"; }
    const stages = splitPipes(line);
    let stdin = "";
    let result = { out: "" };
    for (const stage of stages) {
      result = runOne(state, stage, stdin);
      if (result.err) return result;
      stdin = result.out ? result.out + "\n" : "";
    }
    if (redirect) {
      const abs = resolve(state, redirect);
      const { dir, name: fn } = parentOf(state, abs);
      if (!isDir(dir)) return { err: `zsh: no such file or directory: ${redirect}` };
      const text = result.out ? result.out + "\n" : "";
      dir[fn] = append && typeof dir[fn] === "string" ? dir[fn] + text : text;
      return { out: "", say: result.say };
    }
    return result;
  }

  root.Sandbox = { create, run, resolve, node, pretty, HOME };
})(typeof window !== "undefined" ? window : globalThis);

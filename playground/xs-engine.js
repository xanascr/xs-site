(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  function __accessProp(key) {
    return this[key];
  }
  var __toCommonJS = (from) => {
    var entry = (__moduleCache ??= new WeakMap).get(from), desc;
    if (entry)
      return entry;
    entry = __defProp({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function") {
      for (var key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(entry, key))
          __defProp(entry, key, {
            get: __accessProp.bind(from, key),
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
          });
    }
    __moduleCache.set(from, entry);
    return entry;
  };
  var __moduleCache;
  var __returnValue = (v) => v;
  function __exportSetter(name, newValue) {
    this[name] = __returnValue.bind(null, newValue);
  }
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {
        get: all[name],
        enumerable: true,
        configurable: true,
        set: __exportSetter.bind(all, name)
      });
  };

  // entry.js
  var exports_entry = {};
  __export(exports_entry, {
    playgroundRun: () => playgroundRun
  });

  // xs-src/lexer.js
  var KEYWORDS = new Set([
    "PARTIU",
    "ACABOU",
    "CRIA",
    "SE",
    "LIGA",
    "SO",
    "SENAO",
    "REPETE",
    "NA",
    "MORAL",
    "CHAMA",
    "ESSE",
    "CARA",
    "VOLTA",
    "IMPORTA",
    "EXPORTA",
    "SOLTA",
    "O",
    "GRITO",
    "FALA",
    "BAIXO",
    "AGORA",
    "VAI",
    "ESPERA",
    "AI",
    "SORTEIA",
    "PARSEIA",
    "OUVE",
    "AQUI",
    "VERDADEIRO",
    "FALSO",
    "NULO",
    "TENTA",
    "PEGA",
    "ERRO",
    "ASSINCRONO",
    "VOA",
    "CONTINUA",
    "CLASSE",
    "HERDA",
    "CONSTRUTOR",
    "ISTO",
    "NOVA",
    "METODO",
    "ESCOLHE",
    "CASO",
    "PADRAO",
    "COMBINA",
    "SERVIDOR",
    "PARA",
    "TAMANHO",
    "DIVIDE",
    "TEXTO",
    "ENCONTRA",
    "DECODIFICA",
    "URL",
    "JUNTAR",
    "TESTE",
    "AFIRMA",
    "ASSUNTO",
    "TAREFA",
    "TABELA",
    "MACRO",
    "TIPO",
    "CRUD"
  ]);
  function lex2(input, file = "input.xs") {
    const tokens = [];
    let i = 0;
    let line = 1;
    let col = 1;
    function loc() {
      return { line, column: col, file };
    }
    function push(tok) {
      tok.loc = loc();
      tokens.push(tok);
    }
    const isAlpha = (c) => /[a-zA-Z_]/.test(c);
    const isNum = (c) => /[0-9]/.test(c);
    const isAlnum = (c) => c && /^[a-zA-Z0-9_]$/.test(c);
    while (i < input.length) {
      const c = input[i];
      if (c === `
`) {
        i++;
        line++;
        col = 1;
        continue;
      }
      if (/\s/.test(c)) {
        i++;
        col++;
        continue;
      }
      if (c === '"' || c === "'") {
        const q = c;
        i++;
        col++;
        let val = "";
        while (i < input.length && input[i] !== q) {
          if (input[i] === `
`) {
            line++;
            col = 1;
          } else
            col++;
          val += input[i++];
        }
        i++;
        col++;
        push({ type: "STRING", value: val });
        continue;
      }
      if (c === "`") {
        i++;
        col++;
        let val = "";
        const parts = [];
        while (i < input.length && input[i] !== "`") {
          if (input[i] === "$" && input[i + 1] === "{") {
            parts.push({ type: "TEMPLATE_STR", value: val });
            val = "";
            i += 2;
            col += 2;
            let expr = "";
            let depth = 1;
            while (i < input.length && depth > 0) {
              if (input[i] === "{")
                depth++;
              if (input[i] === "}")
                depth--;
              if (depth > 0) {
                if (input[i] === `
`) {
                  line++;
                  col = 1;
                } else
                  col++;
                expr += input[i++];
              }
            }
            i++;
            col++;
            parts.push({ type: "TEMPLATE_EXPR", value: expr });
          } else {
            val += input[i++];
            col++;
          }
        }
        parts.push({ type: "TEMPLATE_STR", value: val });
        i++;
        col++;
        push({ type: "TEMPLATE", parts });
        continue;
      }
      if (c === "/" && input[i + 1] === "/") {
        while (i < input.length && input[i] !== `
`)
          i++;
        continue;
      }
      if (isNum(c)) {
        let num = c;
        i++;
        col++;
        while (isNum(input[i])) {
          num += input[i++];
          col++;
        }
        push({ type: "NUMBER", value: Number(num) });
        continue;
      }
      if (isAlpha(c)) {
        let id = c;
        i++;
        col++;
        while (isAlnum(input[i])) {
          id += input[i++];
          col++;
        }
        if (KEYWORDS.has(id)) {
          push({ type: id, value: id });
        } else if (id.endsWith("?")) {
          push({ type: "IDENT", value: id });
        } else {
          push({ type: "IDENT", value: id });
        }
        continue;
      }
      const two = input.slice(i, i + 2);
      if ([
        "=>",
        "&&",
        "||",
        "==",
        "!=",
        ">=",
        "<=",
        "+=",
        "-=",
        "*=",
        "/=",
        "%=",
        "->",
        "~=",
        "++",
        "--",
        "//",
        "/*"
      ].includes(two)) {
        push({ type: two, value: two });
        i += 2;
        col += 2;
        continue;
      }
      if ("(){}[];,=:+.-*/<>!%?".includes(c)) {
        push({ type: c, value: c });
        i++;
        col++;
        continue;
      }
      const err = new Error(`Caractere inválido: "${c}" (código: ${c.charCodeAt(0)})`);
      err.loc = loc();
      throw err;
    }
    push({ type: "EOF" });
    return tokens;
  }

  // xs-src/ast.js
  var _loc = null;
  function setLoc(loc) {
    _loc = loc;
  }
  function loc() {
    const l = _loc;
    _loc = null;
    return l;
  }
  var Program = (body) => ({ type: "Program", body, loc: loc() });
  var VarDecl = (id, init, typeHint) => ({ type: "VarDecl", id, init, typeHint, loc: loc() });
  var Assign = (left, right) => ({ type: "Assign", left, right, loc: loc() });
  var Binary = (op, left, right) => ({ type: "Binary", op, left, right, loc: loc() });
  var Unary = (op, arg) => ({ type: "Unary", op, arg, loc: loc() });
  var IfStmt = (test, cons, alt) => ({ type: "IfStmt", test, cons, alt, loc: loc() });
  var ForStmt = (init, test, update, body) => ({ type: "ForStmt", init, test, update, body, loc: loc() });
  var Block = (body) => ({ type: "Block", body, loc: loc() });
  var Call = (callee, args) => ({ type: "Call", callee, args, loc: loc() });
  var Member = (obj, prop) => ({ type: "Member", obj, prop, loc: loc() });
  var FunctionDecl = (name, params, body) => ({ type: "FunctionDecl", name, params, body, loc: loc() });
  var ReturnStmt = (arg) => ({ type: "ReturnStmt", arg, loc: loc() });
  var ExportStmt = (name) => ({ type: "ExportStmt", name, loc: loc() });
  var ImportExpr = (path) => ({ type: "ImportExpr", path, loc: loc() });
  var Ident = (name) => ({ type: "Ident", name, loc: loc() });
  var Num = (value) => ({ type: "Num", value, loc: loc() });
  var Str = (value) => ({ type: "Str", value, loc: loc() });
  var Bool = (value) => ({ type: "Bool", value, loc: loc() });
  var Nil = () => ({ type: "Nil", loc: loc() });
  var ArrayExpr = (items) => ({ type: "ArrayExpr", items, loc: loc() });
  var ObjectExpr = (props) => ({ type: "ObjectExpr", props, loc: loc() });
  var ArrowFunction = (params, body, isAsync = false) => ({ type: "ArrowFunction", params, body, isAsync, loc: loc() });
  var TryCatchStmt = (tryBlock, catchParam, catchBlock) => ({ type: "TryCatchStmt", tryBlock, catchParam, catchBlock, loc: loc() });
  var IndexExpr = (obj, index) => ({ type: "IndexExpr", obj, index, loc: loc() });
  var ImportStmt = (path, alias) => ({ type: "ImportStmt", path, alias, loc: loc() });
  var WhileStmt = (test, body) => ({ type: "WhileStmt", test, body, loc: loc() });
  var BreakStmt = () => ({ type: "BreakStmt", loc: loc() });
  var ContinueStmt = () => ({ type: "ContinueStmt", loc: loc() });
  var Ternary = (test, cons, alt) => ({ type: "Ternary", test, cons, alt, loc: loc() });
  var UpdateExpr = (op, arg, prefix) => ({ type: "UpdateExpr", op, arg, prefix, loc: loc() });
  var ClassDecl = (name, superClass, methods) => ({ type: "ClassDecl", name, superClass, methods, loc: loc() });
  var Method = (name, params, body, isConstructor) => ({ type: "Method", name, params, body, isConstructor, loc: loc() });
  var ThisExpr = () => ({ type: "ThisExpr", loc: loc() });
  var NewExpr = (callee, args) => ({ type: "NewExpr", callee, args, loc: loc() });
  var SwitchStmt = (test, cases) => ({ type: "SwitchStmt", test, cases, loc: loc() });
  var SwitchCase = (test, body) => ({ type: "SwitchCase", test, body, loc: loc() });
  var MatchExpr = (test, cases) => ({ type: "MatchExpr", test, cases, loc: loc() });
  var MatchCase = (pattern, body, guard) => ({ type: "MatchCase", pattern, body, guard, loc: loc() });
  var PatternLiteral = (value) => ({ type: "PatternLiteral", value, loc: loc() });
  var PatternIdent = (name) => ({ type: "PatternIdent", name, loc: loc() });
  var PatternArray = (elements) => ({ type: "PatternArray", elements, loc: loc() });
  var PatternObject = (props) => ({ type: "PatternObject", props, loc: loc() });
  var PatternRest = () => ({ type: "PatternRest", loc: loc() });
  var TestStmt = (name, body) => ({ type: "TestStmt", name, body, loc: loc() });
  var AssertStmt = (test, expected) => ({ type: "AssertStmt", test, expected, loc: loc() });
  var TaskDecl = (name, body) => ({ type: "TaskDecl", name, body, loc: loc() });
  var TableDecl = (name, props) => ({ type: "TableDecl", name, props, loc: loc() });
  var TableProp = (name, type) => ({ name, type, loc: loc() });
  var MacroDecl = (name, params, body) => ({ type: "MacroDecl", name, params, body, loc: loc() });

  // xs-src/errors.js
  var SOURCE_LINES = [];
  var SOURCE_FILE = "input.xs";
  var SOURCE_CODE = "";
  function setSource(code, file) {
    SOURCE_CODE = code;
    SOURCE_FILE = file || "input.xs";
    SOURCE_LINES = code.split(`
`);
  }

  class XSError extends Error {
    constructor(message, options = {}) {
      super(message);
      this.name = "XSError";
      this.loc = options.loc || null;
      this.hint = options.hint || "";
      this.help = options.help || "";
      this.code = options.code || "";
      this.severity = options.severity || "error";
    }
    toString() {
      return formatError(this);
    }
  }
  function formatError(err) {
    const loc2 = err.loc;
    const lines = [];
    lines.push("");
    lines.push(`\x1B[1;31m╔═══ XanaScript ${err.severity.toUpperCase()} \x1B[0m`);
    lines.push(`\x1B[1;31m║\x1B[0m ${err.message}`);
    if (err.code) {
      lines.push(`\x1B[1;31m║\x1B[0m \x1B[2mCódigo: ${err.code}\x1B[0m`);
    }
    if (loc2 && loc2.line) {
      const line = loc2.line;
      const col = loc2.column || 1;
      const context = 2;
      const start = Math.max(0, line - context - 1);
      const end = Math.min(SOURCE_LINES.length, line + context);
      lines.push(`\x1B[1;31m║\x1B[0m`);
      lines.push(`\x1B[1;31m║\x1B[0m \x1B[2m--> ${SOURCE_FILE}:${line}:${col}\x1B[0m`);
      lines.push(`\x1B[1;31m║\x1B[0m`);
      for (let i = start;i < end; i++) {
        const lineNum = i + 1;
        const prefix = lineNum === line ? "\x1B[1;31m║\x1B[0m" : "\x1B[2;31m║\x1B[0m";
        const numStr = String(lineNum).padStart(4, " ");
        const marker = lineNum === line ? "\x1B[1;31m>\x1B[0m" : " ";
        const content = SOURCE_LINES[i] || "";
        lines.push(`${prefix} ${marker} ${numStr} \x1B[0m│ ${content}`);
        if (lineNum === line && col > 0) {
          const arrow = " ".repeat(col - 1) + "\x1B[1;31m^\x1B[0m";
          lines.push(`${prefix}      \x1B[2m│\x1B[0m ${arrow}`);
        }
      }
    }
    if (err.hint) {
      lines.push(`\x1B[1;31m║\x1B[0m`);
      lines.push(`\x1B[1;33m║   ${err.hint}\x1B[0m`);
    }
    if (err.help) {
      lines.push(`\x1B[1;34m║   ${err.help}\x1B[0m`);
    }
    lines.push(`\x1B[1;31m╚══════════════════════════════════\x1B[0m`);
    lines.push("");
    return lines.join(`
`);
  }
  function expected(found, expected2, loc2) {
    return new XSError(`Esperado \`${expected2}\`, encontrado \`${found}\``, {
      loc: loc2,
      hint: `XanaScript esperava "${expected2}" aqui`,
      help: `Tente adicionar "${expected2}" neste local`,
      code: "E001"
    });
  }
  function undefinedVar(name, loc2) {
    return new XSError(`Variável \`${name}\` não foi definida`, {
      loc: loc2,
      hint: `Você esqueceu de declarar "${name}" com CRIA?`,
      help: `Adicione \`CRIA ${name} = valor\` antes de usar`,
      code: "E002"
    });
  }
  function notAFunction(name, loc2) {
    return new XSError(`\`${name}\` não é uma função`, {
      loc: loc2,
      hint: `Você está tentando chamar "${name}" como função, mas não é`,
      help: `Verifique se "${name}" foi declarada com CHAMA ESSE CARA`,
      code: "E003"
    });
  }
  function invalidSyntax(detail, loc2) {
    return new XSError(`Sintaxe inválida: ${detail}`, {
      loc: loc2,
      hint: "Verifique a sintaxe ao redor deste ponto",
      code: "E005"
    });
  }

  // xs-src/parser.js
  var PRECEDENCE = {
    "?": 0,
    "||": 1,
    "&&": 2,
    "==": 3,
    "!=": 3,
    "~=": 3,
    "<": 4,
    "<=": 4,
    ">": 4,
    ">=": 4,
    "+": 5,
    "-": 5,
    "*": 6,
    "/": 6,
    "%": 6
  };
  function parse(tokens) {
    let i = 0;
    const peek = () => tokens[i];
    const next = () => tokens[i++];
    const expect = (t) => {
      const tok = next();
      if (tok.type !== t) {
        const err = expected(tok.type, t, tok.loc);
        err.message = `Esperado \`${t}\`, encontrado \`${tok.type}\``;
        if (tok.value)
          err.message += ` (\`${tok.value}\`)`;
        throw err;
      }
      setLoc(tok.loc);
      return tok;
    };
    const matchSeq = (...types) => {
      for (let k = 0;k < types.length; k++) {
        if (tokens[i + k]?.type !== types[k])
          return false;
      }
      return true;
    };
    function matchPhrase(name, parts) {
      if (!matchSeq(...parts))
        return null;
      const tok = tokens[i];
      parts.forEach(() => next());
      setLoc(tok.loc);
      return Ident(name);
    }
    function parseProgram() {
      const body = [];
      if (peek().type === "PARTIU") {
        expect("PARTIU");
        expect("(");
        expect(")");
        setLoc(peek().loc);
        while (peek().type !== "ACABOU") {
          body.push(parseStmt());
        }
        expect("ACABOU");
        expect("(");
        expect(")");
      } else {
        setLoc(peek().loc);
        while (peek().type !== "EOF") {
          body.push(parseStmt());
        }
      }
      expect("EOF");
      return Program(body);
    }
    function parseFunction() {
      expect("CHAMA");
      expect("ESSE");
      expect("CARA");
      const nameTok = expect("IDENT");
      const name = nameTok.value;
      setLoc(nameTok.loc);
      expect("(");
      const params = [];
      if (peek().type !== ")") {
        do {
          const p = expect("IDENT");
          params.push(p.value);
          if (peek().type !== ",")
            break;
          next();
        } while (true);
      }
      expect(")");
      const body = parseBlock();
      return FunctionDecl(name, params, body);
    }
    function parseReturn() {
      expect("VOLTA");
      setLoc(peek().loc);
      let arg = null;
      if (peek().type !== "}" && peek().type !== "EOF" && peek().type !== ")")
        arg = parseExpr();
      optionalSemicolon();
      return ReturnStmt(arg);
    }
    function parseExport() {
      expect("EXPORTA");
      const nameTok = expect("IDENT");
      setLoc(nameTok.loc);
      optionalSemicolon();
      return ExportStmt(nameTok.value);
    }
    function parseStmt() {
      setLoc(peek().loc);
      if (peek().type === "EXPORTA")
        return parseExport();
      if (matchSeq("CHAMA", "ESSE", "CARA"))
        return parseFunction();
      if (peek().type === "VOLTA")
        return parseReturn();
      if (peek().type === "CRIA")
        return parseVarDecl();
      if (matchSeq("SE", "LIGA", "SO"))
        return parseIf();
      if (matchSeq("REPETE", "NA", "MORAL"))
        return parseFor();
      if (matchSeq("REPETE", "AI"))
        return parseWhile();
      if (peek().type === "TENTA")
        return parseTryCatch();
      if (peek().type === "VOA") {
        next();
        expect("(");
        expect(")");
        optionalSemicolon();
        return BreakStmt();
      }
      if (peek().type === "CONTINUA") {
        next();
        expect("(");
        expect(")");
        optionalSemicolon();
        return ContinueStmt();
      }
      if (peek().type === "IMPORTA")
        return parseImport();
      if (peek().type === "CLASSE")
        return parseClass();
      if (peek().type === "ESCOLHE")
        return parseSwitch();
      if (peek().type === "COMBINA")
        return parseMatch();
      if (peek().type === "TESTE")
        return parseTest();
      if (peek().type === "TAREFA")
        return parseTask();
      if (peek().type === "AFIRMA")
        return parseAssert();
      if (peek().type === "ASSUNTO")
        return parseAssertEqual();
      if (peek().type === "TABELA")
        return parseTable();
      if (peek().type === "MACRO")
        return parseMacro();
      const expr = parseExpr();
      optionalSemicolon();
      return expr;
    }
    function parseTest() {
      expect("TESTE");
      const nameTok = expect("STRING");
      setLoc(nameTok.loc);
      const body = parseBlock();
      return TestStmt(nameTok.value, body);
    }
    function parseAssert() {
      expect("AFIRMA");
      expect("(");
      setLoc(peek().loc);
      const test = parseExpr();
      expect(")");
      optionalSemicolon();
      return AssertStmt(test, null);
    }
    function parseAssertEqual() {
      expect("ASSUNTO");
      expect("(");
      setLoc(peek().loc);
      const a = parseExpr();
      expect(",");
      const b = parseExpr();
      expect(")");
      optionalSemicolon();
      return Call(Ident("ASSUNTO"), [a, b]);
    }
    function parseTask() {
      expect("TAREFA");
      const nameTok = expect("IDENT");
      setLoc(nameTok.loc);
      const body = parseBlock();
      return TaskDecl(nameTok.value, body);
    }
    function parseTable() {
      expect("TABELA");
      const nameTok = expect("IDENT");
      setLoc(nameTok.loc);
      expect("{");
      const props = [];
      while (peek().type !== "}") {
        const propName = expect("IDENT").value;
        expect(":");
        const typeTok = next();
        const val = typeTok.value || typeTok.type;
        props.push(TableProp(propName, val));
        if (peek().type === ",")
          next();
      }
      expect("}");
      return TableDecl(nameTok.value, props);
    }
    function parseMacro() {
      expect("MACRO");
      const nameTok = expect("IDENT");
      setLoc(nameTok.loc);
      expect("(");
      const params = [];
      if (peek().type !== ")") {
        do {
          params.push(expect("IDENT").value);
          if (peek().type !== ",")
            break;
          next();
        } while (true);
      }
      expect(")");
      const body = parseBlock();
      return MacroDecl(nameTok.value, params, body);
    }
    function parseBlock() {
      expect("{");
      setLoc(peek().loc);
      const body = [];
      while (peek().type !== "}")
        body.push(parseStmt());
      expect("}");
      return Block(body);
    }
    function parseVarDecl(expectSemi = true) {
      expect("CRIA");
      const idTok = expect("IDENT");
      setLoc(idTok.loc);
      const id = idTok.value;
      let type = null;
      if (peek().type === ":") {
        next();
        type = expect("IDENT").value;
      }
      expect("=");
      const init = parseExpr();
      if (expectSemi)
        optionalSemicolon();
      return { ...VarDecl(id, init), typeHint: type };
    }
    function parseIf() {
      expect("SE");
      expect("LIGA");
      expect("SO");
      expect("(");
      setLoc(peek().loc);
      const test = parseExpr();
      expect(")");
      const cons = parseBlock();
      let alt = null;
      if (peek().type === "SENAO") {
        next();
        if (matchSeq("SE", "LIGA", "SO")) {
          alt = parseIf();
        } else {
          alt = parseBlock();
        }
      }
      return IfStmt(test, cons, alt);
    }
    function parseFor() {
      expect("REPETE");
      expect("NA");
      expect("MORAL");
      expect("(");
      setLoc(peek().loc);
      let init = null;
      if (peek().type !== ";") {
        if (peek().type === "CRIA") {
          init = parseVarDecl(false);
        } else {
          init = parseExpr();
        }
      }
      expect(";");
      const test = parseExpr();
      expect(";");
      const update = parseExpr();
      expect(")");
      const body = parseBlock();
      return ForStmt(init, test, update, body);
    }
    function parseWhile() {
      expect("REPETE");
      expect("AI");
      expect("(");
      setLoc(peek().loc);
      const test = parseExpr();
      expect(")");
      const body = parseBlock();
      return WhileStmt(test, body);
    }
    function parseImport() {
      expect("IMPORTA");
      setLoc(peek().loc);
      let target;
      if (peek().type === "STRING") {
        target = next().value;
      } else {
        target = expect("IDENT").value;
      }
      let alias = null;
      if (peek().type === "IDENT" && peek().value?.toLowerCase() === "as") {
        next();
        alias = expect("IDENT").value;
      }
      optionalSemicolon();
      return ImportStmt(target, alias);
    }
    function parseClass() {
      expect("CLASSE");
      const nameTok = expect("IDENT");
      setLoc(nameTok.loc);
      const name = nameTok.value;
      let superClass = null;
      if (peek().type === "HERDA") {
        next();
        superClass = expect("IDENT").value;
      }
      expect("{");
      const methods = [];
      while (peek().type !== "}") {
        if (peek().type === "CONSTRUTOR") {
          next();
          setLoc(peek().loc);
          expect("(");
          const params = [];
          if (peek().type !== ")") {
            do {
              params.push(expect("IDENT").value);
              if (peek().type !== ",")
                break;
              next();
            } while (true);
          }
          expect(")");
          const body = parseBlock();
          methods.push(Method(null, params, body, true));
        } else if (peek().type === "METODO") {
          next();
          const nameTok2 = expect("IDENT");
          setLoc(nameTok2.loc);
          expect("(");
          const params = [];
          if (peek().type !== ")") {
            do {
              params.push(expect("IDENT").value);
              if (peek().type !== ",")
                break;
              next();
            } while (true);
          }
          expect(")");
          const body = parseBlock();
          methods.push(Method(nameTok2.value, params, body, false));
        } else if (peek().type === "IDENT") {
          const nameTok2 = expect("IDENT");
          setLoc(nameTok2.loc);
          expect("(");
          const params = [];
          if (peek().type !== ")") {
            do {
              params.push(expect("IDENT").value);
              if (peek().type !== ",")
                break;
              next();
            } while (true);
          }
          expect(")");
          const body = parseBlock();
          methods.push(Method(nameTok2.value, params, body, false));
        } else {
          const err = invalidSyntax("Esperado método ou CONSTRUTOR na classe", peek().loc);
          throw err;
        }
      }
      expect("}");
      return ClassDecl(name, superClass, methods);
    }
    function parseSwitch() {
      expect("ESCOLHE");
      expect("(");
      setLoc(peek().loc);
      const test = parseExpr();
      expect(")");
      expect("{");
      const cases = [];
      while (peek().type !== "}") {
        if (peek().type === "CASO") {
          next();
          setLoc(peek().loc);
          const value = parseExpr();
          expect(":");
          const body = parseStmt();
          cases.push(SwitchCase(value, body));
        } else if (peek().type === "PADRAO") {
          next();
          expect(":");
          setLoc(peek().loc);
          const body = parseStmt();
          cases.push(SwitchCase(null, body));
        } else {
          const err = invalidSyntax("Esperado CASO ou PADRAO no ESCOLHE", peek().loc);
          throw err;
        }
      }
      expect("}");
      return SwitchStmt(test, cases);
    }
    function parseMatch() {
      expect("COMBINA");
      expect("(");
      setLoc(peek().loc);
      const test = parseExpr();
      expect(")");
      expect("{");
      const cases = [];
      while (peek().type !== "}") {
        if (peek().type === "CASO") {
          next();
          setLoc(peek().loc);
          const pattern = parsePattern();
          let guard = null;
          if (peek().type === "=>") {
            next();
            const body = parseExpr();
            cases.push(MatchCase(pattern, body, guard));
          } else if (peek().type === "->") {
            next();
            const body = parseExpr();
            cases.push(MatchCase(pattern, body, guard));
          } else {
            expect(":");
            const body = parseStmt();
            cases.push(MatchCase(pattern, body, guard));
          }
          if (peek().type === ",")
            next();
        } else if (peek().type === "PADRAO") {
          next();
          setLoc(peek().loc);
          if (peek().type === "=>") {
            next();
            const body = parseExpr();
            cases.push(MatchCase(null, body, null));
          } else if (peek().type === "->") {
            next();
            const body = parseExpr();
            cases.push(MatchCase(null, body, null));
          } else {
            expect(":");
            const body = parseStmt();
            cases.push(MatchCase(null, body, null));
          }
        } else {
          const err = invalidSyntax("Esperado CASO ou PADRAO no COMBINA", peek().loc);
          throw err;
        }
      }
      expect("}");
      return MatchExpr(test, cases);
    }
    function parsePattern() {
      setLoc(peek().loc);
      const t = peek();
      if (t.type === "NUMBER") {
        next();
        return PatternLiteral(t.value);
      }
      if (t.type === "STRING") {
        next();
        return PatternLiteral(t.value);
      }
      if (t.type === "VERDADEIRO") {
        next();
        return PatternLiteral(true);
      }
      if (t.type === "FALSO") {
        next();
        return PatternLiteral(false);
      }
      if (t.type === "NULO") {
        next();
        return PatternLiteral(null);
      }
      if (t.type === "[") {
        next();
        const elements = [];
        while (peek().type !== "]") {
          if (peek().type === "...") {
            next();
            elements.push(PatternRest());
            break;
          }
          elements.push(parsePattern());
          if (peek().type !== ",")
            break;
          next();
        }
        expect("]");
        return PatternArray(elements);
      }
      if (t.type === "{") {
        next();
        const props = [];
        while (peek().type !== "}") {
          const keyTok = expect("IDENT");
          setLoc(keyTok.loc);
          if (peek().type === ":") {
            next();
            props.push({ key: keyTok.value, pattern: parsePattern() });
          } else {
            props.push({ key: keyTok.value, pattern: PatternIdent(keyTok.value) });
          }
          if (peek().type !== ",")
            break;
          next();
        }
        expect("}");
        return PatternObject(props);
      }
      if (t.type === "IDENT" && t.value === "_") {
        next();
        return PatternIdent("_");
      }
      if (t.type === "IDENT") {
        next();
        return PatternIdent(t.value);
      }
      const err = invalidSyntax("Pattern inesperado: " + t.type, t.loc);
      throw err;
    }
    function optionalSemicolon() {
      if (peek().type === ";")
        next();
    }
    function parseExpr() {
      return parseAssignment();
    }
    function parseAssignment() {
      let left = parseBinary(0);
      const compoundOps = { "+=": "+", "-=": "-", "*=": "*", "/=": "/", "%=": "%" };
      if (peek().type === "=" || compoundOps[peek().type]) {
        const op = next().type;
        const right = parseAssignment();
        if (left.type !== "Ident" && left.type !== "Member" && left.type !== "IndexExpr") {
          const err = invalidSyntax("Lado esquerdo inválido para atribuição", peek().loc);
          throw err;
        }
        if (op === "=")
          return Assign(left, right);
        return Assign(left, Binary(compoundOps[op], left, right));
      }
      return left;
    }
    function parseBinary(minPrec) {
      let left = parseUnary();
      setLoc(peek().loc);
      while (true) {
        const op = peek().type;
        const prec = PRECEDENCE[op];
        if (prec === undefined || prec < minPrec)
          break;
        next();
        if (op === "?") {
          const cons = parseExpr();
          expect(":");
          const alt = parseBinary(prec);
          left = Ternary(left, cons, alt);
        } else {
          const right = parseBinary(prec + 1);
          left = Binary(op, left, right);
        }
      }
      return left;
    }
    function parseUnary() {
      if (peek().type === "-" || peek().type === "!") {
        const op = next().type;
        setLoc(peek().loc);
        return Unary(op, parseUnary());
      }
      return parseCall();
    }
    function parseCall() {
      setLoc(peek().loc);
      let expr = parsePrimary();
      while (true) {
        if (peek().type === "(") {
          next();
          const args = [];
          if (peek().type !== ")") {
            do {
              args.push(parseExpr());
              if (peek().type !== ",")
                break;
              next();
            } while (true);
          }
          expect(")");
          expr = Call(expr, args);
        } else if (peek().type === ".") {
          next();
          const propTok = expect("IDENT");
          expr = Member(expr, propTok.value);
        } else if (peek().type === "[") {
          next();
          const index = parseExpr();
          expect("]");
          expr = IndexExpr(expr, index);
        } else if (peek().type === "++" || peek().type === "--") {
          const op = next().type;
          expr = UpdateExpr(op, expr, false);
        } else
          break;
      }
      return expr;
    }
    function parseArrowFunction() {
      let isAsync = false;
      if (peek().type === "ASSINCRONO") {
        next();
        isAsync = true;
      }
      expect("(");
      const params = [];
      if (peek().type !== ")") {
        do {
          params.push(expect("IDENT").value);
          if (peek().type !== ",")
            break;
          next();
        } while (true);
      }
      expect(")");
      expect("=>");
      let body;
      if (peek().type === "{") {
        body = parseBlock();
      } else {
        body = parseExpr();
      }
      return ArrowFunction(params, body, isAsync);
    }
    function parseTryCatch() {
      expect("TENTA");
      setLoc(peek().loc);
      const tryBlock = parseBlock();
      expect("PEGA");
      expect("(");
      const errTok = expect("IDENT");
      expect(")");
      const catchBlock = parseBlock();
      return TryCatchStmt(tryBlock, errTok.value, catchBlock);
    }
    function parsePrimary() {
      const phrase = matchPhrase("SOLTA_O_GRITO", ["SOLTA", "O", "GRITO"]) || matchPhrase("FALA_BAIXO", ["FALA", "BAIXO"]) || matchPhrase("AGORA_VAI", ["AGORA", "VAI"]) || matchPhrase("ESPERA_AI", ["ESPERA", "AI"]) || matchPhrase("OUVE_AQUI", ["OUVE", "AQUI"]) || matchPhrase("CRIA_SERVIDOR", ["CRIA", "SERVIDOR"]) || matchPhrase("PARA_SERVIDOR", ["PARA", "SERVIDOR"]) || matchPhrase("DIVIDE_TEXTO", ["DIVIDE", "TEXTO"]) || matchPhrase("DECODIFICA_URL", ["DECODIFICA", "URL"]);
      if (phrase)
        return phrase;
      const t = peek();
      setLoc(t.loc);
      if (t.type === "SORTEIA") {
        next();
        return Ident("SORTEIA");
      }
      if (t.type === "PARSEIA") {
        next();
        return Ident("PARSEIA");
      }
      if (t.type === "VERDADEIRO") {
        next();
        return Bool(true);
      }
      if (t.type === "FALSO") {
        next();
        return Bool(false);
      }
      if (t.type === "NULO") {
        next();
        return Nil();
      }
      if (t.type === "ISTO") {
        next();
        return ThisExpr();
      }
      if (t.type === "NOVA") {
        next();
        const callee = parseCall();
        return NewExpr(callee, []);
      }
      if (t.type === "IMPORTA") {
        next();
        let target;
        if (peek().type === "STRING") {
          target = next().value;
        } else {
          target = expect("IDENT").value;
        }
        return ImportExpr(target);
      }
      if (peek().type === "TENTA") {
        return parseTryCatch();
      }
      if (t.type === "(") {
        let j = i;
        while (tokens[j] && tokens[j].type !== ")") {
          j++;
        }
        if (tokens[j + 1]?.type === "=>") {
          return parseArrowFunction();
        }
      }
      if (t.type === "{") {
        next();
        const props = [];
        if (peek().type !== "}") {
          do {
            const keyTok = expect("IDENT");
            expect(":");
            const value = parseExpr();
            props.push({ key: keyTok.value, value });
            if (peek().type !== ",")
              break;
            next();
          } while (true);
        }
        expect("}");
        return ObjectExpr(props);
      }
      if (t.type === "[") {
        next();
        const items = [];
        if (peek().type !== "]") {
          do {
            items.push(parseExpr());
            if (peek().type !== ",")
              break;
            next();
          } while (true);
        }
        expect("]");
        return ArrayExpr(items);
      }
      if (t.type === "TEMPLATE") {
        next();
        const parts = t.parts.map((p) => {
          if (p.type === "TEMPLATE_STR")
            return Str(p.value);
          const lexed = lex(p.value);
          const exprAst = parse(lexed);
          if (exprAst.body.length === 1)
            return exprAst.body[0];
          return exprAst;
        });
        if (parts.length === 1)
          return parts[0];
        let result = parts[0];
        for (let k = 1;k < parts.length; k++) {
          result = Binary("+", result, parts[k]);
        }
        return result;
      }
      if (t.type === "NUMBER") {
        next();
        return Num(t.value);
      }
      if (t.type === "STRING") {
        next();
        return Str(t.value);
      }
      if (t.type === "IDENT") {
        next();
        return Ident(t.value);
      }
      if (t.type === "(") {
        next();
        const e = parseExpr();
        expect(")");
        return e;
      }
      const err = invalidSyntax("Token inesperado: " + (t.type + (t.value ? ` (${t.value})` : "")), t.loc);
      throw err;
    }
    return parseProgram();
  }

  // xs-src/macros.js
  function expandMacros(node, macros) {
    if (!node || typeof node !== "object")
      return node;
    if (!macros || macros.size === 0)
      return node;
    switch (node.type) {
      case "Program": {
        const collected = new Map;
        for (const stmt of node.body) {
          if (stmt.type === "MacroDecl") {
            collected.set(stmt.name, stmt);
          }
        }
        return expandInNode({ ...node, body: node.body.map((stmt) => {
          if (stmt.type === "MacroDecl")
            return null;
          return expandInNode(stmt, collected);
        }).filter(Boolean) }, collected);
      }
      case "Block": {
        return { ...node, body: node.body.map((s) => expandInNode(s, macros)).filter(Boolean) };
      }
      case "VarDecl": {
        return { ...node, init: expandInNode(node.init, macros) };
      }
      case "Call": {
        if (node.callee.type === "Ident") {
          const macro = macros.get(node.callee.name);
          if (macro) {
            return expandMacroCall(macro, node.args, macros);
          }
        }
        return { ...node, callee: expandInNode(node.callee, macros), args: node.args.map((a) => expandInNode(a, macros)) };
      }
      case "Binary":
        return { ...node, left: expandInNode(node.left, macros), right: expandInNode(node.right, macros) };
      case "Unary":
        return { ...node, arg: expandInNode(node.arg, macros) };
      case "Assign":
        return { ...node, right: expandInNode(node.right, macros) };
      case "IfStmt":
        return { ...node, test: expandInNode(node.test, macros), cons: expandInNode(node.cons, macros), alt: node.alt ? expandInNode(node.alt, macros) : null };
      case "ForStmt":
        return { ...node, init: node.init ? expandInNode(node.init, macros) : null, test: expandInNode(node.test, macros), update: node.update ? expandInNode(node.update, macros) : null, body: expandInNode(node.body, macros) };
      case "WhileStmt":
        return { ...node, test: expandInNode(node.test, macros), body: expandInNode(node.body, macros) };
      case "FunctionDecl":
        return { ...node, body: expandInNode(node.body, macros) };
      case "ReturnStmt":
        return { ...node, arg: node.arg ? expandInNode(node.arg, macros) : null };
      case "Ternary":
        return { ...node, test: expandInNode(node.test, macros), cons: expandInNode(node.cons, macros), alt: expandInNode(node.alt, macros) };
      case "ArrayExpr":
        return { ...node, items: node.items.map((i) => expandInNode(i, macros)) };
      case "ObjectExpr":
        return { ...node, props: node.props.map((p) => ({ ...p, value: expandInNode(p.value, macros) })) };
      case "Member":
        return { ...node, obj: expandInNode(node.obj, macros) };
      case "IndexExpr":
        return { ...node, obj: expandInNode(node.obj, macros), index: expandInNode(node.index, macros) };
      default:
        return node;
    }
  }
  function expandInNode(node, macros) {
    if (!node || typeof node !== "object")
      return node;
    return expandMacros(node, macros);
  }
  function expandMacroCall(macro, args, macros) {
    const paramScope = {};
    macro.params.forEach((p, i) => {
      paramScope[p] = args[i] || Nil();
    });
    let expandedBody = replaceIdents(macro.body, paramScope);
    if (expandedBody.type === "Block" && expandedBody.body?.length === 1) {
      expandedBody = expandedBody.body[0];
    }
    return expandMacros(expandedBody, macros);
  }
  function replaceIdents(node, scope) {
    if (!node || typeof node !== "object")
      return node;
    if (node.type === "Ident") {
      if (scope[node.name] !== undefined) {
        return scope[node.name];
      }
      return node;
    }
    if (Array.isArray(node.body)) {
      return { ...node, body: node.body.map((s) => replaceIdents(s, scope)) };
    }
    const result = { ...node };
    for (const [key, val] of Object.entries(node)) {
      if (key === "type" || key === "loc")
        continue;
      if (Array.isArray(val)) {
        result[key] = val.map((v) => replaceIdents(v, scope));
      } else if (typeof val === "object" && val !== null) {
        result[key] = replaceIdents(val, scope);
      }
    }
    return result;
  }

  // xs-src/optimizer.js
  function collectMacros(node) {
    const macros = new Map;
    if (!node || node.type !== "Program")
      return macros;
    for (const stmt of node.body) {
      if (stmt.type === "MacroDecl") {
        macros.set(stmt.name, stmt);
      }
    }
    return macros;
  }
  function optimize(node) {
    const macros = collectMacros(node);
    if (macros.size > 0) {
      node = expandMacros(node, macros);
    }
    if (!node || typeof node !== "object")
      return node;
    switch (node.type) {
      case "Program": {
        node.body = node.body.map((s) => optimize(s)).filter(Boolean);
        return node;
      }
      case "Block": {
        node.body = node.body.map((s) => optimize(s)).filter(Boolean);
        return node;
      }
      case "VarDecl": {
        if (node.init)
          node.init = optimize(node.init);
        return node;
      }
      case "Assign": {
        node.right = optimize(node.right);
        return node;
      }
      case "IfStmt": {
        node.test = optimize(node.test);
        node.cons = optimize(node.cons);
        if (node.alt)
          node.alt = optimize(node.alt);
        if (node.test.type === "Bool") {
          if (node.test.value === true)
            return node.cons;
          if (node.test.value === false)
            return node.alt || { type: "Nil" };
        }
        return node;
      }
      case "ForStmt": {
        if (node.init)
          node.init = optimize(node.init);
        node.test = optimize(node.test);
        if (node.update)
          node.update = optimize(node.update);
        node.body = optimize(node.body);
        return node;
      }
      case "WhileStmt": {
        node.test = optimize(node.test);
        node.body = optimize(node.body);
        return node;
      }
      case "FunctionDecl": {
        node.body = optimize(node.body);
        return node;
      }
      case "ReturnStmt": {
        if (node.arg)
          node.arg = optimize(node.arg);
        return node;
      }
      case "Ternary": {
        node.test = optimize(node.test);
        node.cons = optimize(node.cons);
        node.alt = optimize(node.alt);
        if (node.test.type === "Bool") {
          return node.test.value ? node.cons : node.alt;
        }
        return node;
      }
      case "Call": {
        node.callee = optimize(node.callee);
        node.args = node.args.map((a) => optimize(a));
        return node;
      }
      case "Unary": {
        node.arg = optimize(node.arg);
        if (node.arg.type === "Num" && node.op === "-") {
          return { type: "Num", value: -node.arg.value };
        }
        if (node.arg.type === "Bool" && node.op === "!") {
          return { type: "Bool", value: !node.arg.value };
        }
        return node;
      }
      case "Binary": {
        node.left = optimize(node.left);
        node.right = optimize(node.right);
        const isBothNum = node.left.type === "Num" && node.right.type === "Num";
        const isBothBool = node.left.type === "Bool" && node.right.type === "Bool";
        if (isBothNum) {
          switch (node.op) {
            case "+":
              return { type: "Num", value: node.left.value + node.right.value };
            case "-":
              return { type: "Num", value: node.left.value - node.right.value };
            case "*":
              return { type: "Num", value: node.left.value * node.right.value };
            case "/":
              return { type: "Num", value: node.left.value / node.right.value };
            case "%":
              return { type: "Num", value: node.left.value % node.right.value };
            case "==":
              return { type: "Bool", value: node.left.value === node.right.value };
            case "!=":
              return { type: "Bool", value: node.left.value !== node.right.value };
            case ">":
              return { type: "Bool", value: node.left.value > node.right.value };
            case "<":
              return { type: "Bool", value: node.left.value < node.right.value };
            case ">=":
              return { type: "Bool", value: node.left.value >= node.right.value };
            case "<=":
              return { type: "Bool", value: node.left.value <= node.right.value };
          }
        }
        if (isBothBool) {
          switch (node.op) {
            case "==":
              return { type: "Bool", value: node.left.value === node.right.value };
            case "!=":
              return { type: "Bool", value: node.left.value !== node.right.value };
            case "&&":
              return { type: "Bool", value: node.left.value && node.right.value };
            case "||":
              return { type: "Bool", value: node.left.value || node.right.value };
          }
        }
        if (node.op === "+" && node.right.type === "Num" && node.right.value === 0)
          return node.left;
        if (node.op === "+" && node.left.type === "Num" && node.left.value === 0)
          return node.right;
        if (node.op === "*" && node.right.type === "Num" && node.right.value === 1)
          return node.left;
        if (node.op === "*" && node.left.type === "Num" && node.left.value === 1)
          return node.right;
        if (node.op === "*" && (node.right.type === "Num" && node.right.value === 0))
          return { type: "Num", value: 0 };
        if (node.op === "*" && (node.left.type === "Num" && node.left.value === 0))
          return { type: "Num", value: 0 };
        return node;
      }
      case "Member":
      case "IndexExpr": {
        node.obj = optimize(node.obj);
        if (node.index)
          node.index = optimize(node.index);
        return node;
      }
      case "ArrayExpr": {
        node.items = node.items.map((i) => optimize(i));
        return node;
      }
      case "ObjectExpr": {
        node.props = node.props.map((p) => ({ key: p.key, value: optimize(p.value) }));
        return node;
      }
      case "TryCatchStmt": {
        node.tryBlock = optimize(node.tryBlock);
        node.catchBlock = optimize(node.catchBlock);
        return node;
      }
      default:
        return node;
    }
  }

  // browser-orm.js
  var TIPOS_MAP = {
    TEXTO: "string",
    NUMERO: "number",
    BOOLEANO: "boolean",
    DATA: "string",
    QUALQUER: "any"
  };
  function criarRepositorio(nomeTabela, props) {
    let dados = [];
    let proxId = 1;
    function validar(entrada, parcial) {
      const erros = [];
      for (const p of props) {
        const val = entrada[p.name];
        if (val === undefined && !parcial) {
          erros.push('Campo "' + p.name + '" (' + p.type + ") obrigatorio");
          continue;
        }
        if (val === undefined)
          continue;
        const tipoEsperado = TIPOS_MAP[p.type] || "any";
        if (tipoEsperado === "string" && typeof val !== "string")
          erros.push('Campo "' + p.name + '" espera TEXTO, recebeu ' + typeof val);
        else if (tipoEsperado === "number" && typeof val !== "number")
          erros.push('Campo "' + p.name + '" espera NUMERO, recebeu ' + typeof val);
        else if (tipoEsperado === "boolean" && typeof val !== "boolean")
          erros.push('Campo "' + p.name + '" espera BOOLEANO, recebeu ' + typeof val);
      }
      return erros;
    }
    return {
      criar(entrada) {
        const erros = validar(entrada);
        if (erros.length > 0)
          throw new Error(`Erros de validacao:
` + erros.join(`
`));
        const item = { id: proxId++, ...entrada, criadoEm: new Date().toISOString() };
        dados.push(item);
        return item;
      },
      listar() {
        return [...dados];
      },
      buscar(id) {
        return dados.find((d) => d.id === id) || null;
      },
      atualizar(id, mudancas) {
        const idx = dados.findIndex((d) => d.id === id);
        if (idx === -1)
          throw new Error("Registro " + id + " nao encontrado em " + nomeTabela);
        const erros = validar(mudancas, true);
        if (erros.length > 0)
          throw new Error(`Erros de validacao:
` + erros.join(`
`));
        dados[idx] = { ...dados[idx], ...mudancas, atualizadoEm: new Date().toISOString() };
        return dados[idx];
      },
      deletar(id) {
        const idx = dados.findIndex((d) => d.id === id);
        if (idx === -1)
          throw new Error("Registro " + id + " nao encontrado em " + nomeTabela);
        return dados.splice(idx, 1)[0];
      },
      buscarOnde(filtro) {
        return dados.filter((d) => {
          for (const k of Object.keys(filtro)) {
            if (d[k] !== filtro[k])
              return false;
          }
          return true;
        });
      },
      select(campos) {
        return dados.map((d) => {
          const o = {};
          for (const c of campos)
            o[c] = d[c];
          return o;
        });
      },
      contar() {
        return dados.length;
      },
      limpar() {
        dados = [];
      }
    };
  }

  // xs-src/interpreter.js
  class ReturnSignal {
    constructor(value) {
      this.value = value;
    }
  }

  class BreakSignal {
  }

  class ContinueSignal {
  }

  class AssertionError extends Error {
    constructor(message) {
      super(message);
      this.name = "AssertionError";
    }
  }
  var TABELAS = {};
  async function interpret(node, env) {
    switch (node.type) {
      case "Program": {
        let result;
        for (const stmt of node.body) {
          result = await interpret(stmt, env);
        }
        return result;
      }
      case "Block": {
        let result;
        for (const stmt of node.body) {
          result = await interpret(stmt, env);
        }
        return result;
      }
      case "VarDecl": {
        const val = await interpret(node.init, env);
        env[node.id] = val;
        return val;
      }
      case "Assign": {
        const val = await interpret(node.right, env);
        if (node.left.type === "Member") {
          const obj = await interpret(node.left.obj, env);
          obj[node.left.prop] = val;
        } else if (node.left.type === "IndexExpr") {
          const obj = await interpret(node.left.obj, env);
          const idx = await interpret(node.left.index, env);
          obj[idx] = val;
        } else {
          env[node.left.name] = val;
        }
        return val;
      }
      case "Num":
        return node.value;
      case "Str":
        return node.value;
      case "Bool":
        return node.value;
      case "Nil":
        return null;
      case "Ident": {
        if (!(node.name in env)) {
          const err = undefinedVar(node.name, node.loc);
          throw err;
        }
        return env[node.name];
      }
      case "UpdateExpr": {
        const v = await interpret(node.arg, env);
        const nv = node.op === "++" ? v + 1 : v - 1;
        if (node.arg.type === "Ident") {
          env[node.arg.name] = nv;
        } else if (node.arg.type === "Member") {
          const obj = await interpret(node.arg.obj, env);
          obj[node.arg.prop] = nv;
        } else if (node.arg.type === "IndexExpr") {
          const obj = await interpret(node.arg.obj, env);
          const idx = await interpret(node.arg.index, env);
          obj[idx] = nv;
        }
        return node.prefix ? nv : v;
      }
      case "Unary": {
        const v = await interpret(node.arg, env);
        switch (node.op) {
          case "-":
            return -v;
          case "!":
            return !v;
        }
        break;
      }
      case "Binary": {
        if (node.op === "&&") {
          const l2 = await interpret(node.left, env);
          if (!l2)
            return l2;
          return interpret(node.right, env);
        }
        if (node.op === "||") {
          const l2 = await interpret(node.left, env);
          if (l2)
            return l2;
          return interpret(node.right, env);
        }
        if (node.op === "~=") {
          const l2 = String(await interpret(node.left, env));
          const r2 = String(await interpret(node.right, env));
          return new RegExp(r2).test(l2);
        }
        const l = await interpret(node.left, env);
        const r = await interpret(node.right, env);
        switch (node.op) {
          case "+":
            return l + r;
          case "-":
            return l - r;
          case "*":
            return l * r;
          case "/":
            return l / r;
          case "%":
            return l % r;
          case "==":
            return l == r;
          case "!=":
            return l != r;
          case ">":
            return l > r;
          case "<":
            return l < r;
          case ">=":
            return l >= r;
          case "<=":
            return l <= r;
        }
        break;
      }
      case "IfStmt": {
        const test = await interpret(node.test, env);
        if (test) {
          return interpret(node.cons, env);
        }
        if (node.alt) {
          return interpret(node.alt, env);
        }
        return null;
      }
      case "ForStmt": {
        if (node.init) {
          await interpret(node.init, env);
        }
        while (await interpret(node.test, env)) {
          let continued = false;
          try {
            await interpret(node.body, env);
          } catch (e) {
            if (e instanceof BreakSignal)
              break;
            if (e instanceof ContinueSignal) {
              continued = true;
            } else
              throw e;
          }
          if (node.update) {
            await interpret(node.update, env);
          }
          if (continued)
            continue;
        }
        return null;
      }
      case "WhileStmt": {
        while (await interpret(node.test, env)) {
          try {
            await interpret(node.body, env);
          } catch (e) {
            if (e instanceof BreakSignal)
              break;
            if (e instanceof ContinueSignal)
              continue;
            throw e;
          }
        }
        return null;
      }
      case "FunctionDecl": {
        const fn = async (...args) => {
          const scope = Object.create(env);
          node.params.forEach((p, i) => {
            scope[p] = args[i];
          });
          try {
            return await interpret(node.body, scope);
          } catch (e) {
            if (e instanceof ReturnSignal) {
              return e.value;
            }
            throw e;
          }
        };
        env[node.name] = fn;
        return fn;
      }
      case "ReturnStmt": {
        let val = null;
        if (node.arg) {
          val = await interpret(node.arg, env);
        }
        throw new ReturnSignal(val);
      }
      case "BreakStmt": {
        throw new BreakSignal;
      }
      case "ContinueStmt": {
        throw new ContinueSignal;
      }
      case "Call": {
        const fn = await interpret(node.callee, env);
        const args = [];
        for (const a of node.args) {
          args.push(await interpret(a, env));
        }
        if (node.callee.type === "Ident") {
          const name = node.callee.name;
          if (name === "TAMANHO")
            return args[0]?.length;
          if (name === "DIVIDE_TEXTO")
            return args[0]?.split(args[1]);
          if (name === "ENCONTRA")
            return String(args[0])?.match(new RegExp(args[1]));
          if (name === "DECODIFICA_URL")
            return decodeURIComponent(args[0]);
          if (name === "JUNTAR")
            return args[0]?.join(args[1]);
          if (name === "AGORA")
            return Date.now();
        }
        if (typeof fn !== "function") {
          const err = notAFunction(node.callee.name || "expressão", node.loc);
          throw err;
        }
        return await fn(...args);
      }
      case "Member": {
        const obj = await interpret(node.obj, env);
        return obj[node.prop];
      }
      case "ImportExpr": {
        return await env.__IMPORT__(node.path);
      }
      case "ImportStmt": {
        const mod = await env.__IMPORT__(node.path);
        if (node.alias) {
          env[node.alias] = mod;
        }
        return mod;
      }
      case "ExportStmt":
        return null;
      case "ArrayExpr": {
        const arr = [];
        for (const item of node.items) {
          arr.push(await interpret(item, env));
        }
        return arr;
      }
      case "ObjectExpr": {
        const obj = {};
        for (const p of node.props) {
          obj[p.key] = await interpret(p.value, env);
        }
        return obj;
      }
      case "ArrowFunction": {
        const fn = async (...args) => {
          const scope = Object.create(env);
          node.params.forEach((p, i) => {
            scope[p] = args[i];
          });
          return interpret(node.body, scope);
        };
        return fn;
      }
      case "TryCatchStmt": {
        try {
          return await interpret(node.tryBlock, env);
        } catch (e) {
          if (e instanceof ReturnSignal || e instanceof BreakSignal || e instanceof ContinueSignal)
            throw e;
          const scope = Object.create(env);
          scope[node.catchParam] = e;
          return interpret(node.catchBlock, scope);
        }
      }
      case "IndexExpr": {
        const obj = await interpret(node.obj, env);
        const index = await interpret(node.index, env);
        return obj[index];
      }
      case "Ternary": {
        const test = await interpret(node.test, env);
        if (test) {
          return interpret(node.cons, env);
        }
        return interpret(node.alt, env);
      }
      case "ClassDecl": {
        const cls = function(...args) {
          const instance = {};
          instance.__proto__ = cls.prototype;
          if (cls.prototype.__constructor) {
            const scope = Object.create(env);
            scope["ISTO"] = instance;
            cls.prototype.params.forEach((p, i) => {
              scope[p] = args[i];
            });
            interpret(cls.prototype.__constructor, scope);
          }
          return instance;
        };
        cls.prototype = {};
        if (node.superClass) {
          const parent = env[node.superClass];
          if (parent) {
            cls.prototype.__proto__ = parent.prototype;
          }
        }
        for (const method of node.methods) {
          if (method.isConstructor) {
            cls.prototype.__constructor = method.body;
            cls.prototype.params = method.params;
          } else {
            cls.prototype[method.name] = async function(...args) {
              const scope = Object.create(env);
              scope["ISTO"] = this;
              method.params.forEach((p, i) => {
                scope[p] = args[i];
              });
              try {
                return await interpret(method.body, scope);
              } catch (e) {
                if (e instanceof ReturnSignal)
                  return e.value;
                throw e;
              }
            };
          }
        }
        env[node.name] = cls;
        return cls;
      }
      case "ThisExpr": {
        if (!("ISTO" in env)) {
          throw new XSError("`ISTO` usado fora de um método", {
            loc: node.loc,
            hint: "ISTO só funciona dentro de METODO ou CONSTRUTOR",
            help: "Use ISTO apenas dentro de métodos de classe",
            code: "E006"
          });
        }
        return env["ISTO"];
      }
      case "NewExpr": {
        const cls = await interpret(node.callee, env);
        if (typeof cls !== "function") {
          throw new XSError("NOVA só funciona com classes", {
            loc: node.loc,
            hint: "O identificador após NOVA deve ser uma CLASSE",
            help: "Defina uma classe com CLASSE antes de usar NOVA",
            code: "E007"
          });
        }
        const args = [];
        for (const a of node.args) {
          args.push(await interpret(a, env));
        }
        return new cls(...args);
      }
      case "SwitchStmt": {
        const test = await interpret(node.test, env);
        for (const c of node.cases) {
          if (c.test === null) {
            return interpret(c.body, env);
          }
          const val = await interpret(c.test, env);
          if (test == val) {
            return interpret(c.body, env);
          }
        }
        return null;
      }
      case "MatchExpr": {
        const test = await interpret(node.test, env);
        for (const c of node.cases) {
          if (c.pattern === null) {
            return interpret(c.body, env);
          }
          const bindings = {};
          if (matchPattern(test, c.pattern, bindings)) {
            const scope = Object.create(env);
            Object.assign(scope, bindings);
            return interpret(c.body, scope);
          }
        }
        return null;
      }
      case "TestStmt": {
        try {
          await interpret(node.body, env);
          env.__testResults.push({ name: node.name, passed: true, error: null });
        } catch (e) {
          if (e instanceof AssertionError) {
            env.__testResults.push({ name: node.name, passed: false, error: e.message });
          } else if (e instanceof ReturnSignal || e instanceof BreakSignal || e instanceof ContinueSignal) {
            throw e;
          } else {
            env.__testResults.push({ name: node.name, passed: false, error: e.message });
          }
        }
        return null;
      }
      case "AssertStmt": {
        const val = await interpret(node.test, env);
        if (!val) {
          throw new AssertionError(`AFIRMA falhou em ${node.loc?.line || "?"}:${node.loc?.column || "?"}`);
        }
        return val;
      }
      case "TaskDecl": {
        env.__tasks = env.__tasks || {};
        env.__tasks[node.name] = async () => {
          return interpret(node.body, env);
        };
        return null;
      }
      case "TableDecl": {
        const repo = criarRepositorio(node.name, node.props, env.__dir || process.cwd());
        TABELAS[node.name] = repo;
        env[node.name] = repo;
        env[`CRIA_${node.name}`] = (dados) => repo.criar(dados);
        env[`LISTA_${node.name.toUpperCase()}`] = () => repo.listar();
        env[`BUSCA_${node.name.toUpperCase()}`] = (id) => repo.buscar(id);
        env[`ATUALIZA_${node.name.toUpperCase()}`] = (id, dados) => repo.atualizar(id, dados);
        env[`DELETA_${node.name.toUpperCase()}`] = (id) => repo.deletar(id);
        return repo;
      }
      case "MacroDecl":
        return null;
      default:
        throw new XSError(`Node não suportado: ${node.type}`, {
          loc: node.loc,
          code: "E999"
        });
    }
  }
  function matchPattern(value, pattern, bindings) {
    if (!pattern)
      return false;
    switch (pattern.type) {
      case "PatternLiteral":
        return value === pattern.value;
      case "PatternIdent":
        if (pattern.name === "_")
          return true;
        bindings[pattern.name] = value;
        return true;
      case "PatternArray": {
        if (!Array.isArray(value))
          return false;
        let pi = 0;
        for (const el of pattern.elements) {
          if (el.type === "PatternRest") {
            bindings["..."] = value.slice(pi);
            return true;
          }
          if (pi >= value.length)
            return false;
          if (!matchPattern(value[pi], el, bindings))
            return false;
          pi++;
        }
        return pi === value.length;
      }
      case "PatternObject": {
        if (typeof value !== "object" || value === null)
          return false;
        for (const prop of pattern.props) {
          if (!(prop.key in value))
            return false;
          if (!matchPattern(value[prop.key], prop.pattern, bindings))
            return false;
        }
        return true;
      }
      default:
        return false;
    }
  }

  // entry.js
  async function playgroundRun(code) {
    const output = [];
    const env = {
      SOLTA_O_GRITO: (...a) => {
        const text = a.map(String).join(" ");
        output.push(text);
      },
      FALA_BAIXO: (...a) => {
        const text = a.map(String).join(" ");
        output.push(text);
      },
      AGORA: () => Date.now(),
      AGORA_VAI: async (url) => {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
          return await res.json();
        } catch (e) {
          output.push("> AGORA_VAI: " + e.message + " (simulated)");
          return { simulated: true };
        }
      },
      ESPERA_AI: (ms) => new Promise((r) => setTimeout(r, ms)),
      SORTEIA: (a, b) => Math.floor(Math.random() * (b - a + 1)) + a,
      PARSEIA: JSON.parse,
      TAMANHO: (arr) => arr && arr.length !== undefined ? arr.length : 0,
      ENCONTRA: (str, pat) => String(str).match(new RegExp(pat)),
      DIVIDE_TEXTO: (str, sep) => String(str).split(sep),
      JUNTAR: (arr, sep) => arr.join(sep),
      DECODIFICA_URL: decodeURIComponent,
      OUVE_AQUI: () => null,
      CRIA_SERVIDOR: () => output.push("> Servidor (simulado)"),
      PARA_SERVIDOR: () => {},
      __IMPORT__: async () => {
        output.push("> Import (simulado)");
        return {};
      }
    };
    setSource(code, "input.xs");
    try {
      const tokens = lex2(code, "input.xs");
      let ast = parse(tokens);
      ast = optimize(ast);
      await interpret(ast, env);
    } catch (e) {
      if (e.name === "XSError") {
        output.push("Error: " + e.message);
        if (e.hint)
          output.push("Hint: " + e.hint);
      } else {
        output.push("Error: " + e.message);
      }
    }
    return output.join(`
`);
  }
  window.playgroundRun = playgroundRun;
})();

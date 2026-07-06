export const TIPOS_MAP = {
  TEXTO: "string",
  NUMERO: "number",
  BOOLEANO: "boolean",
  DATA: "string",
  QUALQUER: "any",
};

export function criarRepositorio(nomeTabela, props) {
  let dados = [];
  let proxId = 1;

  function validar(entrada, parcial) {
    const erros = [];
    for (const p of props) {
      const val = entrada[p.name];
      if (val === undefined && !parcial) {
        erros.push('Campo "' + p.name + '" (' + p.type + ') obrigatorio');
        continue;
      }
      if (val === undefined) continue;
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
      if (erros.length > 0) throw new Error("Erros de validacao:\n" + erros.join("\n"));
      const item = { id: proxId++, ...entrada, criadoEm: new Date().toISOString() };
      dados.push(item);
      return item;
    },
    listar() { return [...dados]; },
    buscar(id) { return dados.find(d => d.id === id) || null; },
    atualizar(id, mudancas) {
      const idx = dados.findIndex(d => d.id === id);
      if (idx === -1) throw new Error("Registro " + id + " nao encontrado em " + nomeTabela);
      const erros = validar(mudancas, true);
      if (erros.length > 0) throw new Error("Erros de validacao:\n" + erros.join("\n"));
      dados[idx] = { ...dados[idx], ...mudancas, atualizadoEm: new Date().toISOString() };
      return dados[idx];
    },
    deletar(id) {
      const idx = dados.findIndex(d => d.id === id);
      if (idx === -1) throw new Error("Registro " + id + " nao encontrado em " + nomeTabela);
      return dados.splice(idx, 1)[0];
    },
    buscarOnde(filtro) {
      return dados.filter(d => {
        for (const k of Object.keys(filtro)) {
          if (d[k] !== filtro[k]) return false;
        }
        return true;
      });
    },
    select(campos) { return dados.map(d => { const o = {}; for (const c of campos) o[c] = d[c]; return o; }); },
    contar() { return dados.length; },
    limpar() { dados = []; },
  };
}

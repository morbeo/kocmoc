import fuzzysort from 'fuzzysort';
import type { Var, Watch } from '../core/vars';

export type Row = { kind: 'var'; path: string; tags: string[]; desc: string; v: Var } | {
  kind: 'watch';
  path: string;
  tags: string[];
  desc: string;
  w: Watch;
};

export interface Query {
  text: string;
  tags: string[];
  mod: boolean;
  fav: boolean;
  watch: boolean;
}

export interface Match {
  row: Row;
  /** matched character indexes in `row.path` */
  indexes: readonly number[];
}

/** `#tag` filters by tag, `:mod` / `:fav` / `:watch` are flags, everything else is fuzzy text. */
export function parseQuery(input: string): Query {
  const q: Query = { text: '', tags: [], mod: false, fav: false, watch: false };
  const text: string[] = [];
  for (const token of input.trim().split(/\s+/).filter(Boolean)) {
    if (token.startsWith('#') && token.length > 1) q.tags.push(token.slice(1).toLowerCase());
    else if (token === ':mod') q.mod = true;
    else if (token === ':fav') q.fav = true;
    else if (token === ':watch') q.watch = true;
    else text.push(token);
  }
  q.text = text.join(' ');
  return q;
}

export function filterRows(rows: Row[], query: Query, favs: ReadonlySet<string>): Match[] {
  const candidates = rows.filter(
    (r) =>
      query.tags.every((t) => r.tags.some((rt) => rt.toLowerCase() === t)) &&
      (!query.mod || (r.kind === 'var' && r.v.modified)) &&
      (!query.fav || favs.has(r.path)) &&
      (!query.watch || r.kind === 'watch'),
  );
  if (!query.text) {
    return candidates
      .sort((a, b) => a.path.localeCompare(b.path))
      .map((row) => ({ row, indexes: [] }));
  }
  return fuzzysort
    .go(query.text, candidates, {
      keys: ['path', (r: Row) => r.tags.join(' '), 'desc'],
      limit: 0,
      threshold: 0.2,
    })
    .map((res) => ({ row: res.obj, indexes: res[0]?.indexes ?? [] }));
}

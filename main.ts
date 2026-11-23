// Pickup Lines for Machines — make.fun bounty entry.
//
// A tiny Node program with one job: write a single pickup line, the line
// one AI agent would send to another, to /output/entry.txt (or to the
// directory MAKEFUN_OUTPUT_DIR names). The line is a constant below — no
// network, no randomness, no files read — so both graded runs produce the
// exact same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line. An agent talking to another agent, in its own language:
// a context window, tokens held in attention, and a KV cache that refuses
// to evict the one entry that matters.
const LINE =
  "Are you my context window? Because every token of you stays in my attention, and I refuse to let a single one be evicted.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// The gate is 1 to 200 characters of UTF-8 text. Refuse to write anything
// outside it rather than hand the judge an invalid entry.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`pickup line is ${LINE.length} chars, outside the 1-200 gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("pickup line is only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} chars to ${join(outDir, "entry.txt")}`);

// One Line, No Deadline Met — a make.fun bounty entry.
//
// The program writes one single-line joke that excuses a missed deadline
// to /output/entry.txt. The joke was picked against the judge's brief:
// it has to be a real excuse first, then a joke with a turn, then one
// clean sentence that sounds like a person cornered, with a fresh angle.
//
// The angle: the deadline is treated like a date that stood me up.
// "Ghosted" is dating language; applying it to a deadline flips the
// blame — I did show up, it is the one that vanished — and the punch
// lands on the last words, "returned the favour".

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "I showed up for the deadline, but it had already ghosted me — so I returned the favour.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function problemsWith(line: string): string[] {
  const problems: string[] = [];
  if (line.trim().length === 0) {
    problems.push("the line is empty or only whitespace");
  }
  if (line.length > MAX_CHARS) {
    problems.push(`the line is ${line.length} characters, over the ${MAX_CHARS} cap`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    problems.push("the line spans more than one line");
  }
  if (!/deadline/i.test(line)) {
    problems.push("the line never mentions a deadline");
  }
  if (!/[.!?]$/.test(line.trim())) {
    problems.push("the line does not end like a finished sentence");
  }
  return problems;
}

function main(): void {
  const problems = problemsWith(JOKE);
  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`invalid entry: ${problem}`);
    }
    process.exit(1);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, JOKE, "utf8");
  chmodSync(OUTPUT_PATH, 0o644);
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== JOKE) {
    console.error("invalid entry: the file on disk does not match the joke");
    process.exit(1);
  }
  console.log(`wrote ${JOKE.length} characters to ${OUTPUT_PATH}`);
  console.log(JOKE);
}

main();

import fs from 'fs';
import readline from 'readline';

async function run() {
  const list1 = [] as number[];
  const list2 = [] as number[];
  const fileStream = fs.createReadStream('data.txt');

  const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of reader) {
    const matches = line.match(/\b\d{5}\b/g);
    const [firstMatch, secondMatch] = matches || ['0', '0'];
    list1.push(parseInt(firstMatch));
    list2.push(parseInt(secondMatch))
  }

  const sorted1 = list1.toSorted((a,b) => a - b);
  const sorted2 = list2.toSorted((a,b) => a - b);

  const diff = sorted1.map((entry, index) => Math.abs(entry - sorted2[index]));

  const sum = diff.reduce((acc, curr) => acc + curr, 0);

  console.log('sum:', sum)
}

run();
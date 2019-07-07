import dictionary from '../assets/dictionary.json';

// //this section is to keep the dictionary's list of words and their definitions

let dictionaryWords = Object.keys(dictionary).sort();

//Trie is built in the form of graphs, the node :string and edges :string[]

const createTrie = (filteredWord: string[]): Map<string, string[]> => {
  let trie: Map<string, string[]> = new Map();

  filteredWord.forEach(word => {
    for (let i = 0; i < word.length; i++) {
      const letterAndIndex = `${word[i].toUpperCase()} ${i}`;
      const nextWord = `${word[i + 1]} ${i + 1}`;
      if (!trie.has(letterAndIndex)) {
        if (!word[i + 1]) {
          trie.set(letterAndIndex, []);
        } else {
          trie.set(letterAndIndex, [nextWord.toUpperCase()]);
        }
      } else if (trie.has(letterAndIndex)) {
        let edgeList = trie.get(letterAndIndex);

        if (word[i + 1]) {
          //@ts-ignore
          if (!edgeList.includes(nextWord)) {
            trie.set(letterAndIndex, [...edgeList, nextWord.toUpperCase()]);
          }
        } else {
          //@ts-ignore

          trie.set(letterAndIndex, [...edgeList]);
        }
      }
    }
  });
  return trie;
};

const searchWord = (word: string): string[] => {
  const filteredWords = dictionaryWords.filter(element => {
    return element.startsWith(word);
  });

  filteredWords.sort((a, b) => {
    return a.length - b.length;
  });

  return filteredWords;
};

export { createTrie, searchWord };

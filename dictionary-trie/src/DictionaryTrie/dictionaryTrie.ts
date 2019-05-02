import dictionary from '../assets/dictionary.json';

//this section is to keep the dictionary's list of words and their definitions

let dictionaryWords = Object.keys(dictionary).sort();

//this is a function that creates an empty trie
const trieInitializer = () => {
  let dictionaryTrie = { value: '*', completed: false };
  return dictionaryTrie;
};

//this function will take in a string and add to the trie

const trieFiller = (word: string, trie: any, counter: number = 0) => {
  console.log(word);
  if (!trie.value) {
    trie.value = word[counter - 1];
  }
  if (!trie[word[counter]]) {
    trie[word[counter]] = { completed: false, value: null };
  }
  counter++;
  if (counter === word.length) {
    trie[word[counter - 1]].completed = true;
    return;
  }
  trieFiller(word, trie[word[counter - 1]], counter);
};

let newTrie = trieInitializer();

dictionaryWords.forEach(words => {
  if (words[0] + words[1] === 're') {
    trieFiller(words, newTrie);
  }
});

export default newTrie;

// utils/latinToCyrillic.js
export function latinToCyrillic(text) {
    const latinCyrillicMap = {
      // Mapping jadvali yuqoridagi kabi
      'Sh': 'Ш', 'sh': 'ш',
      'Ch': 'Ч', 'ch': 'ч',
      "G'": 'Ғ', "g'": 'ғ',
      "O'": 'Ў', "o'": 'ў',
      'Yo': 'Ё', 'yo': 'ё',
      'Ya': 'Я', 'ya': 'я',
      'Yu': 'Ю', 'yu': 'ю',
      'Ts': 'Ц', 'ts': 'ц',
      'Kh': 'Х', 'kh': 'х',
      'Ng': 'Нг', 'ng': 'нг',
      'A': 'А', 'a': 'а',
      'B': 'Б', 'b': 'б',
      'D': 'Д', 'd': 'д',
      'E': 'Е', 'e': 'е',
      'F': 'Ф', 'f': 'ф',
      'G': 'Г', 'g': 'г',
      'H': 'Ҳ', 'h': 'ҳ',
      'I': 'И', 'i': 'и',
      'J': 'Ж', 'j': 'ж',
      'K': 'К', 'k': 'к',
      'L': 'Л', 'l': 'л',
      'M': 'М', 'm': 'м',
      'N': 'Н', 'n': 'н',
      'O': 'О', 'o': 'о',
      'P': 'П', 'p': 'п',
      'Q': 'Қ', 'q': 'қ',
      'R': 'Р', 'r': 'р',
      'S': 'С', 's': 'с',
      'T': 'Т', 't': 'т',
      'U': 'У', 'u': 'у',
      'V': 'В', 'v': 'в',
      'Y': 'Й', 'y': 'й',
      'Z': 'З', 'z': 'з',
      '’': '', "'": '',
      '‘': '',
      '“': '',
      '”': '',
      ' ': ' ',
      ',': ',',
      '.': '.',
      '!': '!',
      '?': '?',
      ':': ':',
      ';': ';',
      '-': '-',
      '_': '_',
      '(': '(',
      ')': ')',
      '"': '"',
      '`': '`',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '0': '0',
    };
  
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
  
    const orderedKeys = Object.keys(latinCyrillicMap).sort((a, b) => b.length - a.length);
  
    let convertedText = text;
  
    orderedKeys.forEach(key => {
      const escapedKey = escapeRegExp(key);
      const regex = new RegExp(escapedKey, 'g');
      convertedText = convertedText.replace(regex, latinCyrillicMap[key]);
    });
  
    return convertedText;
  }
  
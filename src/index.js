module.exports = function check(str, bracketsConfig) {

    let bracesDictionary = {};
    let stack = [str[0]];                                             
    let i;
  //в цикле заполняем словарь символами открытия, закрытия
    for (i = 0; i < bracketsConfig.length; i++) {                       
      bracesDictionary[bracketsConfig[i][0]] = { open: bracketsConfig[i][0], close: bracketsConfig[i][1]};
      bracesDictionary[bracketsConfig[i][1]] = { open: bracketsConfig[i][0], close: bracketsConfig[i][1]};
    }

    function isMirrorBrace(b) //проверка, если символы открытия и закрытия одинаковы
    {
      return bracesDictionary[b].open === bracesDictionary[b].close
    }

    function isOneTypeBrace(b1, b2) //проверка, что символы одного типа
    {
      return  bracesDictionary[b1].open === bracesDictionary[b2].open
    }
  
    function isOpenBrace(b) //открывающий символ
    {                                        
      return bracesDictionary[b].open === b
    }

    function isCloseBrace(b) //закрывающий символ
    {                                     
      return bracesDictionary[b].close === b
    }
  
    for (i = 1; i < str.length; i = i + 1) {
      const stackEmpty = stack.length === 0; //True, если длина stack = 0
      const currentBrace = str[i];           //присваиваем currentBrace i символ строки
      const prevBrace = stack[stack.length - 1]; //предыдущее значение stack
  
      if (stackEmpty) {  //если stackEmpty - true
        if (isMirrorBrace(currentBrace) || isOpenBrace(currentBrace)) {  //если одинаковый символ или открывающий
          stack.push(currentBrace);  //добавляем 1 элемент в конец stack
        }
        else {
          return false; // иначе возвращаем false
        }
      }
  
      if (!stackEmpty) { //если stackEmpty - false
        if(isMirrorBrace(currentBrace) && currentBrace === prevBrace) {   // если текущий элемент = предыдущему и зеркальность True
          stack.pop(); //удаляем 1 элемент из конца
        }
        else if (isOpenBrace(currentBrace)) { // если открывающий элемент = true
          stack.push(currentBrace); //добавляем 1 элемент в конец stack
        }
        else if (isCloseBrace(currentBrace) && isOneTypeBrace(currentBrace, prevBrace)) { // если текущий элемент - закрывающий
          stack.pop();  //удаляем 1 элемент из конца
        }
        else {
          return false
        }
      }
    }
  
    return stack.length === 0  //если длина stack =0 , истина
}

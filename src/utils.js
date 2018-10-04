
export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;
  
   
     const result = [...arr];
    let itemToAdd = payload;
  
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
      for (var t=0; t < result[0].instruments.length; t++) {
          if (result[0].instruments[t].muted === false) {
      // console.log('result  ', result[0].instruments[t].label);
            // result[0].stepinstruments.push(result[0].instruments[t].label)
          }
      }
      
    }
    return result;
  };
  
  export const generateItems = (count, creator) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(creator(i));
    }
    return result;
  };

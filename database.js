const fs = require('fs');

const save = (item) => {
  return fs.readFile('./database.json', 'utf8', (error, data) => {
    if (error) return false;

    if (!data) {
      data = [];
    } else {
      data = JSON.parse(data);
    }
 
    item.id = data.length + 1;

    data.push(item);

    fs.writeFile('./database.json', JSON.stringify(data), (error) => {
      if (error) return false;
    });

    return true;
  });
}

module.exports = { save };

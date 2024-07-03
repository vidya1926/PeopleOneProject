import fs from 'fs';
import path from 'path';

interface Data {
  managerName?: string;
  adminName?: string;
  courseAdmin?: string;

}

const fileName = '../data/adminGroupsData.json';

export function updateFieldsInJSON(newData: Data): void {
  const filepath = path.join(__dirname, fileName);

  let existingData: Data = {};


  try {
    const data = fs.readFileSync(filepath, 'utf8');
    existingData = JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);

    return;
  }

  const updatedData: Data = {
    ...existingData,
    ...newData
  };
  const jsonData: string = JSON.stringify(updatedData, null, 2);

  fs.writeFile(filepath, jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('JSON file has been updated.');
    }
  });






}

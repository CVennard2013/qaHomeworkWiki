import {Google} from './baseGooglePage';
const google=new Google();
const fs=require('fs');

test('do search', async () => {
    await google.navigate(); 
    await google.search('dogs'); 
    let text = await google.getResults(); 
    expect(text).toContain('dogs'); 
    await fs.writeFile(`${__dirname}/google.png`,
    await google.driver.takeScreenshot(), "base64", 
    (e) => {
        if (e) console.error(e)
        else console.log('a pictures worth a thousand words')
    }); 
    fs.writeFile(`${__dirname}/googleResults.txt`, text, (e) => {
        if (e) console.error(e)
        else console.log('save succesful')
    });
    await google.driver.quit(); 
}); 
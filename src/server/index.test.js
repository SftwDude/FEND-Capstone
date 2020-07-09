import "babel-polyfill";
import {GetPicture} from './mockAPIfunctions/getPicture'

test("GetPicture should return an url to an image", async () => {
    await GetPicture("Cancun").then(resp => {
        expect(resp.hits[0].largeImageURL).toEqual("https://pixabay.com/get/57e2d74b4b51ad14f6da8c7dda7936791639dde057516c4870267fd69e4bc159bd_1280.jpg");
    });
});
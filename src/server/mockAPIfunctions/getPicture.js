const GetPicture = async (image) => {
    if (image) {
        return Promise.resolve({
            hits: [{largeImageURL: "https://pixabay.com/get/57e2d74b4b51ad14f6da8c7dda7936791639dde057516c4870267fd69e4bc159bd_1280.jpg" }]
        })
    }
    else
        return undefined
}

export { GetPicture }
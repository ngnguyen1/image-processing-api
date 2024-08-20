# Node.js Image Processing API

This is a Node.js API for image processing. It provides various functionalities to manipulate and process images using popular libraries such as Sharp and Jimp.

## Installation

To install and use this API, follow these steps:

1. Clone the repository: `git clone https://github.com/ngnguyen1/image-processing-api.git`
2. Navigate to the project directory: `cd image-processing-api`
3. Install the dependencies: `npm i`
4. Start the server: `npm start`

## Usage

Once the server is running, you can send HTTP requests to the API endpoints to perform image processing operations. Here are some examples:

### Resize an image

```js
POST /api/images
{
    "filename": "image-name.jpg",
    "width": 800,
    "height": 600
}
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

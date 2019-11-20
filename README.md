# Tinify Loader

[![NPM Version](https://img.shields.io/npm/v/tinify-loader.svg?style=flat-square)](http://npmjs.com/package/tinify-loader)

> Optimizes your images with [TinyPNG](https://tinypng.com)/[TinyJPG](https://tinyjpg.com) and persistently caches the results to avoid eating up your API rate limit.

TinyPNG uses smart lossy compression techniques to **reduce the file size** of your PNG files. By selectively decreasing the number of colors in the image, fewer bytes are required to store the data. The effect is nearly invisible but it makes a very large difference in file size! Similarly, TinyJPG reduces the file size of your JPEG images. Every uploaded image is **analyzed** to apply the best possible JPEG encoding. Based on the **content of your image** an optimal strategy is chosen. The result is a quality image without wasting storage or bandwidth!

TinyPNG/TinyJPG provides **500 free** compressions each month. If you reach your compression limit the API, you must upgrade your account by entering your payment details on the [API account](https://tinyjpg.com/developers) page.

Tinify Loader caches the results of your requests so you won't have to worry about hitting your free compression limit unless you work with a particularly large number of images.

---

#### Important:

This loader **only** handles optimization of your images.  
You still need a loader to handle images in your webpack bundle such as [url-loader](https://github.com/webpack/url-loader) or [file-loader](https://github.com/webpack/file-loader).

---

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Options](#options)

## Install

```
npm install tinify-loader --save-dev
```

## Setup

##### Get API Key

You can sign up for a developer account **for free** at [tinypng.com/developers](https://tinypng.com/developers).

![TinyPNG Sign Up](media/signup.png?raw=true)

<sup>(Fun fact: This screenshot was compressed with TinyPNG. Reducing its size from 213.2 KB to just 58.2 KB—that's a **73%** size reduction!)</sup>

Once you have setup your account, you'll be sent a link to login and view your API key and usage data on your [dashboard](https://tinypng.com/dashboard/developers).

## Usage

##### webpack.config.js
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g)$/,
        use: [
          {
            loader: 'tinify-loader',
            options: {
              apikey: TINYPNG_KEY
            }
          }
        ]
      }
    ]
  }
};
```

## Options

|Name|Type|Default|Description|
|:---|:---|:------|:----------|
|**`apikey`**|`{String}`|`undefined`|Developer API key from [TinyPNG](https://tinypng.com/developers)/[TinyJPG](https://tinyjpg.com/developers)|
|**`cache`**|`{String}`|`path.resolve('.cache/tinify')`|Path to directory where processed images will be cached.|

#### `options.apikey`
This is where you can directly provide your API key found on your TinyPNG/TinyJPG [dashboard](https://tinypng.com/dashboard/developers).

However, there are options for not storing your API key directly in your `webpack.config.js`. If this option is not provided, Tinify Loader will check for an environmental variable `process.env.TINYPNG_KEY`.

```
TINYPNG_KEY=l4P-GCBT8K3uJRmkUtd3K5WUcdVma3Cp webpack
```
<sup>Note: This is not a working API key.</sup>

You also have the option of placing your API key in file located at `~/.tinypng`. This can be the simplest solution for working with the Tinify Loader in multiple projects and also allows for easy interoperability with [tinypng-cli](https://www.npmjs.com/package/tinypng-cli).

#### `options.cache`

An absolute path to where you would like your cache files to be stored. If no value is provided, the default is `path.resolve('.cache/tinify')`.

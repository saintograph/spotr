<!-- TITLE/ -->

<h1>SPOTR</h1>

<!-- /TITLE -->



<!-- DESCRIPTION/ -->

A travel time estimation app for the Washington Metropolitan Area Transit

<!-- /DESCRIPTION -->

LIVE URL : [https://imminent-street.surge.sh/](https://imminent-street.surge.sh/)

Search example : 

From : Farragut North

Destination : Friendship Heights

## Usage

``` bash
# Setup
git clone https://github.com/winfredselwyn/spotr.git
cd spotr
npm install

# Once-off compiles
npm run compile

# Development build
npm start

# *note : development server does not load 'assets/flexboxgrid.min.css' and 'assets/reset.min.css' with index.html
# **note : Webpack and Gulp bundles everything into the assets folder. To run the contents within the folder as a PWA, SSL encryption needed.

```

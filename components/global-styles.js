import css from 'styled-jsx/css'

// html setup
const fontSize = '20px'
const lineHeight = 1.4
const baseFontWeight = 400
//breaking flex to mobile layout (units in px)
const breakFlex = 800

export default css`
    html {
        webkit-text-size-adjust: 100%;
    }
    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        src: url('static/fonts/Lato-Light.eot');
        src: local('Lato Light'), local('Lato-Light'),
            url('static/fonts/Lato-Light.eot?#iefix')
                format('embedded-opentype'),
            url('static/fonts/Lato-Light.woff2') format('woff2'),
            url('static/fonts/Lato-Light.woff') format('woff'),
            url('static/fonts/Lato-Light.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Lato';
        font-style: italic;
        font-weight: 300;
        src: url('static/fonts/Lato-LightItalic.eot');
        src: local('Lato Light Italic'), local('Lato-LightItalic'),
            local('Lato LightItalic'),
            url('static/fonts/Lato-LightItalic.eot?#iefix')
                format('embedded-opentype'),
            url('static/fonts/Lato-LightItalic.woff2') format('woff2'),
            url('static/fonts/Lato-LightItalic.woff') format('woff'),
            url('static/fonts/Lato-LightItalic.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        src: url('static/fonts/Lato-Regular.eot');
        src: local('Lato Regular'), local('Lato-Regular'),
            url('static/fonts/Lato-Regular.eot?#iefix')
                format('embedded-opentype'),
            url('static/fonts/Lato-Regular.woff2') format('woff2'),
            url('static/fonts/Lato-Regular.woff') format('woff'),
            url('static/fonts/Lato-Regular.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 500;
        src: url('static/fonts/Lato-Medium.eot');
        src: local('Lato Medium'), local('Lato-Medium'),
            url('static/fonts/Lato-Medium.eot?#iefix')
                format('embedded-opentype'),
            url('static/fonts/Lato-Medium.woff2') format('woff2'),
            url('static/fonts/Lato-Medium.woff') format('woff'),
            url('static/fonts/Lato-Medium.ttf') format('truetype');
    }
    body {
        font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
            sans-serif;
        font-size: ${fontSize};
        line-height: ${lineHeight};
        text-rendering: optimizeLegibility;
        -moz-font-feature-settings: 'liga' on;
        font-weight: ${baseFontWeight};
        font-style: normal;
        color: rgba(0, 0, 0, 0.9);
        box-sizing: border-box;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
        margin: 0;
        padding: 0;
    }
    blockquote,
    dd,
    dl,
    figure,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    menu,
    ol,
    p,
    pre,
    ul {
        margin: 0;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
    * {
        min-height: 0;
        min-width: 0;
    }
    li {
        list-style: none;
    }
    a {
        cursor: pointer;
        caret-color: transparent;
        text-decoration: none;
    }

    .main {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }
    .container {
        flex: 1;
        max-width: 1200px;
        margin: 0 auto;
    }
    .row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .center {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        text-align: center;
    }
    .column {
        flex-basis: 100%;
    }

    @media screen and (min-width: ${breakFlex}px) {
        .column {
            flex: 1;
        }
    }

    .italic {
        font-weight: 300;
        font-style: italic;
    }

    .light {
        font-weight: 300;
    }

    .normal,
    .regular {
        font-weight: 400;
    }

    .bold,
    .heavy {
        font-weight: 500;
    }

    .block {
        display: block;
    }
    .inline-block {
        display: inline-block;
    }
    .no-outline,
    .no-outline:active,
    .no-outline:focus,
    .no-outline:hover {
        outline: none;
    }
    .relative {
        position: relative;
    }
    .op75 {
        opacity: 0.75;
    }
    .op100 {
        opacity: 100;
    }
    .transparent {
        background-color: transparent;
    }
    .over-hidden {
        overflow: hidden;
    }
    .capitalize {
        text-transform: uppercase;
    }
    .mg-auto {
        margin-right: auto;
        margin-left: auto;
    }
    .mg-auto-left {
        margin-left: auto;
    }
    .mg-auto-right {
        margin-left: auto;
    }
    .wrap {
        flex-wrap: wrap;
    }
    .no-wrap {
        flex-wrap: no-wrap;
    }
    .flex-column {
        flex-direction: column;
    }
    .flex-row {
        flex-direction: row;
    }
    .space-around {
        justify-content: space-around;
    }
    .space-between {
        justify-content: space-between;
    }
    .flex1 {
        flex: 1;
    }
    .flex0 {
        flex: 0 0 auto;
    }
`

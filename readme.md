## About Beacon
Beacon is event information display system for *Xola* API.

### Live Demo
[Jack Daniel's Distillery Tours](http://beacon.articodestudio.com/?seller=570b666cc683b17a688b4567&env=sandbox&style=http://beacon.articodestudio.com/jack-daniels/style.css)

## Installation
Clone a copy of the main *Beacon* git repo by running:

```bash
git clone git://github.com/mightytroll/beacon.git
```

Enter the *Beacon* directory and run the build script:
```bash
cd beacon && npm run build
```
The built version of *Beacon* will be put in the `dist/` subdirectory, along with the minified copy and associated map file.

Deploy the content of `dist/` subdirectory to your web server.

## Usage
To display events information just pass *Xola* seller id as `GET` parameter.
```
http://example.com/?seller=<SELLER_ID>
```

## Customization
To override default *Beacon* styling just pass url to css file containing your custom styles as `GET` parameter.
```
http://example.com/?seller=<SELLER_ID>&style=<URL_TO_CSS_FILE>
```
###Examples

**Cover Picture**

```css
.seller-summary .background {
    background-image: url('http://example.com/cover.jpg');
}
```

**Logo**

```css
.seller-summary .logo {
    background-image: url('http://example.com/logo.png');
}
```

**Extra Column**

```css
.event-summary .misc {
    display: table-cell;
}
.event-summary .misc .text:after {
    visibility: visible;
    position: absolute;
    content: "21+";
}
```

## Contribution

### Sandbox Environment
To use `sandbox.xola.com` add `env=sanbox` parameter to your URL.
 ```
 http://example.com/?seller=<SELLER_ID>&env=sandbox
 ```

### Dev Environment
To use other domain for Xola API add `env=dev&baseUrl=<URL>` parameter to your URL.
 ```
 http://example.com/?seller=<SELLER_ID>&env=dev&baseUrl=http://localhost:8080
 ```
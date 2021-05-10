# 🐇 Formit

> A speedy way to create HTML forms.

* ⚡️ **Tiny**, around 1.35 KB gzipped
* 🙌 **Zero dependences**
* 🖌 **Styleless** by design, allowing you to add your own.


**[Check out the demo](http://formit.surge.sh/)**

## 🔧 Installation

```
npm install --save formit
```

Then, import it into your Javascript workflow:

```js
import Formit from 'formit'
```

The UMD build is also available via [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/form/dist/index.umd.js"></script>
```


## 🕹 Usage

Here's a quick example of how you can compose HTML forms with Formit:

#### 1. Prepare the HTML

Create somewhere for your Formit elements to render to:

```html
<form>
  <div id="Form"></div>
</form>
```

#### 2. Generate with Formit

Target your selector, and pass in the Formit elements you want to generate:

```js
Formit('#form', [
  {
    label: 'First name',
    type: 'text',
    placeholder: 'First',
    autofocus: true,
  },
  {
    label: 'Last name',
    placeholder: 'Last',
    type: 'text',
  },
  {
    type: 'submit',
    value: 'Go!'
  },
])
```

#### 3. Check out your rendered form

Aw yea! Your selector is now populated with ready-to-use form elements.

A cool feature of Formit is that it'll automatically generate unique IDs and associate the `<label>` (if generated) with the field.

```html
<div id="form">
  <div class="FormElements-FieldGroup FormElements-id-0">
    <label for="FormElements-0" class="FormElements-Label">
      <div class="FormElements-Label__text">First name</div>
      <input type="text" id="FormElements-0" placeholder="First" autofocus="true" class="FormElements-Field">
    </label>
  </div>
  <div class="FormElements-FieldGroup FormElements-id-1">
    <label for="FormElements-1" class="FormElements-Label">
    <div class="FormElements-Label__text">Last name</div>
    <input type="text" id="FormElements-1" placeholder="Last" class="FormElements-Field">
    </label>
  </div>
  <div class="FormElements-FieldGroup FormElements-id-2">
    <input type="submit" id="FormElements-2" value="Go!" class="FormElements-Field">
  </div>
</div>
```


## 📒 Notes

Tests and additional docs coming soon!


## ❤️  Thanks

A big thanks to [developit](https://github.com/developit) for his amazing tools and for being a source of inspiration.

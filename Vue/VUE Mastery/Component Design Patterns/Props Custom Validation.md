# Props: Custom Validation

## The Shortcomings of Most Prop Definitions

------

In the last lesson, we learned how to create props that were well documented and helped to prevent common bugs. However, after cleaning up our props in the last lesson, you might have noticed that our `image` prop is a little bit lacking.

**📄 BaseBanner.vue**

```javascript
export default {
  props: {
    image: {
      type; String,
      default: '/images/placeholder.png'	
    }
  }
}
```

While we have a default placeholder image that will help us when movie poster images are missing, the simple data-type-checking of `String` doesn’t quite cover it when it comes to validation. Simply passing any string won’t suffice; a simple error would result in a broken image.

- `/images/movie-poster.pn`
- `/imagesmovie-poster.png`
- `images/movie-poster.png`

For our `MoviePoster` component, beyond simply enforcing that the `image` prop is a `String`, let’s assume that we want to make sure that:

1. Images live in the `/images` directory
2. Images can only be PNG or JPEG format

When given these requirements, the first instinct might be to create a computed property that checks for these things and generates an error message if it fails. However, what if we could validate our props earlier than that? Let’s explore how we can do this with custom validations!

------

## Custom Validation for Props

While creating custom validations for props sounds complicated initially, Vue makes it quite easy for us to do so by providing the `validator` property. Here are the basics behind how it works:

**📄 MoviePoster.vue**

```javascript
export default {
  props: {
    image: {
      type: String,
      default: '/images/placeholder.png',
      // Validator takes an anonymous function 
      // that receives the passed-down value
      // as its first argument
      validator: propValue => {
        // Return a Boolean that will serve as your validation
        const propExists = propValue.length > 0

	return propExists
      }  
    }
  }
}
```

Equipped with this knowledge, let’s apply this to our `images` prop from our `MoviePoster` scenario!

**📄 MoviePoster.vue**

```javascript
export default {
  props: {
    image: {
      type: String,
      default: '/images/placeholder.png'	
    }
  }
}
```

------

### Requirement 1: Verify that all images come from the `/images` directory

Our first step is to setup a validator property that takes an anonymous function that receives the prop value as its sole argument.

**📄 MoviePoster.vue**

```javascript
export default {
  props: {
    image: {
      type; String,
      default: '/images/placeholder.png'	
      validator: propValue => {}
    }
  }
}
```

Next, we want to create a validation rule to verify that the value being passed down contains the `images` directory. We can do this using the standard [JavaScript `String` method `indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf), which allows us to check whether or not a string of characters exists on a given string by returning the index where it exists. If it doesn’t exist, it will return `-1`.

**📄 MoviePoster.vue**

```javascript
export default {
  props: {
    image: {
      type; String,
      default: '/images/placeholder.png'	
      validator: propValue => {
        const hasImagesDirectory = propValue.indexOf('/images/') > -1
      }
    }
  }
}
```

Now that we have our validation rule, all we need to do is return it to validate our prop.

**📄 MoviePoster.vue**

```javascript
export default {
  props: {
    image: {
      type; String,
      default: '/images/placeholder.png'	
      validator: propValue => {
         const hasImagesDirectory = propValue.indexOf('/images/') > -1

	 return hasImagesDirectory
      }
    }
  }
}
```

And with that, our prop will now throw an error if it doesn’t contain the image directory!

------

### Requirement 2: Image must either be PNG or JPEG format

Now that we have our validator set up, all we need to do for this requirement is setup another validation rule in our `validator` property. And to do this, we will utilize a helpful String method `endsWith` to check whether our URL path contains the correct extension.

**📄 MoviePoster.vue**

```javascript
export default {
  props: {
    image: {
      type; String,
      default: '/images/placeholder.png'	
      validator: propValue => {
         const hasImagesDirectory = propValue.indexOf('/images/') > -1
	 const isPNG = propValue.endsWith('.png')
	 const isJPEG = propValue.endsWith('.jpeg') || propValue.endsWith('.jpg')
	 const hasValidExtension = isPNG || isJPEG

	 return hasImagesDirectory
       }
     }
  }
}
```

Finally, we need to add these new validation rules to our return value.

**📄 MoviePoster.vue**

```javascript
export default {
  props: {
    image: {
      type; String,
      default: '/images/placeholder.png'	
      validator: propValue => {
         const hasImagesDirectory = propValue.indexOf('/images/') > -1
	 const isPNG = propValue.endsWith('.png')
	 const isJPEG = propValue.endsWith('.jpeg') || propValue.endsWith('.jpg')
	 const hasValidExtension = isPNG || isJPEG

	 return hasImagesDirectory && hasValidExtension
       }
     }
  }
}
```

Our `image` prop on our `MoviePoster` component is now good to go!

------

## Let’s ReVue

------

Custom prop validators can be extremely useful in providing additional guidance to developers when a prop has requiremets beyond simple data types. And with that, you are now empowered to create even better messaging for how component props should be used in your application!
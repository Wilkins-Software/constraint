# @wilkins-software/react-constraint-api

This is a typescript library which wraps the [HTML5 constraint validation API](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#validating_forms_using_javascript). The library provides a simple and easy-to-use interface for working with form constraints in react projects.

## Installation
To install the library, simply run the following command:

```sh
npm install @wilkins-software/react-constraint-api
```

## Usage
Here is a simple example of how to use the library to add some basic validation to form elements:

```tsx
import { Input } from '@wilkins-software/react-constraint-api'

const MyForm = () => {
  return (
    <Input 
    checker={(value) => value.endsWith('!')} 
    errorMessage={(value) => `${value} is invalid! The value must end in "!"`}
    
    />
  )
}

```


## License
This library is licensed under the MIT License.




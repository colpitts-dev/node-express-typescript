import pluralize from 'pluralize'

export const camelCase = text => {
  return text
    .replace(/\s(.)/g, function (w) {
      return w.toUpperCase()
    })
    .replace(/\s/g, '')
    .replace(/^(.)/, function (w) {
      return w.toLowerCase()
    })
}

export const camelCaps = text => {
  // (\w+)(?:\s+|$) mean at least of one character that build word
  // followed by any number of spaces `\s+` or end of the string `$`
  // capture the word as group and spaces will not create group `?:`
  return text.replace(/(\w+)(?:\s+|$)/g, function (_, word) {
    // uppercase first letter and add rest unchanged
    return word.charAt(0).toUpperCase() + word.substr(1)
  })
}

export default plop => {
  // helpers
  plop.setHelper('singularCamel', function (text) {
    return camelCase(pluralize.singular(text))
  })
  plop.setHelper('singularCaps', function (text) {
    return camelCaps(pluralize.singular(text))
  })
  plop.setHelper('pluralizeCamel', function (text) {
    return camelCase(pluralize(text))
  })
  plop.setHelper('pluralizeCaps', function (text) {
    return camelCaps(pluralize(text))
  })

  // model generator
  plop.setGenerator('model', {
    description: 'application model with unit test',
    prompts: [
      {
        type: 'input',
        name: 'model',
        message: 'Model name: ',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/models/{{singularCamel model}}.model.ts',
        templateFile: 'plop-templates/model/model.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{singularCamel model}}.model.test.ts',
        templateFile: 'plop-templates/model/model.test.ts.hbs',
      },
    ],
  })
  // controller generator
  plop.setGenerator('controller', {
    description:
      'restful api controller, service, and router with integration test',
    prompts: [
      {
        type: 'input',
        name: 'controller',
        message: 'Resource name: ',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/routes/v1/{{ pluralizeCamel controller }}/{{ pluralizeCamel controller }}.controller.ts',
        templateFile: 'plop-templates/controller/controller.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/routes/v1/{{ pluralizeCamel controller}}/{{ pluralizeCamel controller }}.service.ts',
        templateFile: 'plop-templates/controller/service.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/routes/v1/{{ pluralizeCamel controller}}/{{ pluralizeCamel controller }}.router.ts',
        templateFile: 'plop-templates/controller/router.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/routes/v1/{{ pluralizeCamel controller}}/{{ pluralizeCamel controller }}.router.test.ts',
        templateFile: 'plop-templates/controller/router.test.ts.hbs',
      },
      {
        // Add new router to express
        type: 'append',
        path: 'src/routes/v1/index.router.ts',
        pattern: `/* RESTFUL_IMPORT */`,
        template: `import {{ pluralizeCamel controller }}Router from './{{ pluralizeCamel controller }}/{{ pluralizeCamel controller }}.router';`,
      },
      {
        type: 'append',
        path: 'src/routes/v1/index.router.ts',
        pattern: `/* RESTFUL_API */`,
        template: `indexRouter.use('/{{ pluralizeCamel controller }}', {{ pluralizeCamel controller }}Router)`,
      },
    ],
  })
}

/* eslint-disable no-undef */
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

export const pascalCase = text => {
  return text.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase()
  })
}

export default plop => {
  // helpers
  plop.setHelper('singularCamel', function (text) {
    return camelCase(pluralize.singular(text))
  })
  plop.setHelper('singularPascal', function (text) {
    return pascalCase(pluralize.singular(text))
  })
  plop.setHelper('pluralizeCamel', function (text) {
    return camelCase(pluralize(text))
  })
  plop.setHelper('pluralizePascal', function (text) {
    return pascalCase(pluralize(text))
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

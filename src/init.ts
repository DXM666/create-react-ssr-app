import * as fs from 'fs'
import { promises } from 'fs'
import { join } from 'path'
import * as process from 'process'
import * as Shell from 'shelljs'

const prompts = require('prompts')
const logGreen = (text: string) => {
  console.log(`\x1B[32m ${text}`)
}
const logRed = (text: string) => {
  console.log(`\x1B[31m ${text}`)
}

interface Options {
  template?: string
}

const init = async (options?: Options) => {
  const argv = require('minimist')(process.argv.slice(2))
  const cwd = process.cwd()

  if (!argv._[0]) {
    logRed('未指定项目名称 请使用格式 npm init ssr-app')
    return
  }
  const targetDir = argv._[0]

  if (fs.existsSync(targetDir)) {
    logRed(`${targetDir} already existed, please delete it`)
    return
  }
  let template = options?.template ?? argv.template
  if (!template) {
    const answers = await prompts(
      {
        type: 'select',
        name: 'template',
        message: 'Select a framework:',
        choices: [
          {
            title: 'react-nestjs-ssr(Support Webpack)',
            value: 'react-nestjs-ssr'
          }
        ]
      },
      {
        onCancel: () => {
          logRed('退出选择')
          process.exit(0)
        }
      }
    )

    template = answers.template
  }

  logGreen(`${template} is creating...`)

  Shell.cp(
    '-r',
    `${join(__dirname, `../example/${template}`)}`,
    `${join(cwd, `./${targetDir}`)}`
  )
  await promises.writeFile(
    `${join(cwd, `./${targetDir}/.npmrc`)}`,
    `
    # for pnpm mode
    public-hoist-pattern[]=@babel/runtime
    ${
      template.includes('nestjs') ? 'public-hoist-pattern[]=@types/express' : ''
    }
    ${template.includes('react') ? 'public-hoist-pattern[]=ssr-react-dom' : ''}
    `
  )
  Shell.cp(
    '-r',
    `${join(__dirname, '../gitignore.tpl')}`,
    `${join(cwd, `./${targetDir}/.gitignore`)}`
  )

  logGreen(`${template} has created succeed `)

  console.log(`  cd ${targetDir}`)
  console.log('  npm install (or `yarn`)')
  console.log('  npm start (or `yarn start`)')
  console.log()
}

export { init }

const gulp = require('gulp')

const { spawn } = require('child_process')

// 启动Node服务任务
function startNodeServer (done) {
  const tscProcess = spawn('cmd.exe', ['/k', 'start', 'npx nodemon'], {
    stdio: 'inherit', // 这将使子进程的stdio继承自父进程，这样您可以在控制台中看到输出
    shell: true // 在某些系统中，可能需要启用shell来正确地解析命令和参数
  })

  // 监听子进程的错误和退出事件
  tscProcess.on('error', (err) => {
    console.error('nodemon进程发生错误:', err)
  })

  tscProcess.on('exit', (code, signal) => {
    if (code !== null) {
      console.log(`nodemon进程退出, 退出码 ${code}`)
    } else {
      console.log(`nodemon进程被信号 ${signal} 杀死`)
    }
  })
  done()
}

// 注册webpack编译任务
gulp.task('buildJs', (done) => {
  new Promise((resolve, reject) => {
    const tscProcess = spawn('npx webpack', ['--watch'], {
      stdio: 'inherit', // 这将使子进程的stdio继承自父进程，这样您可以在控制台中看到输出
      shell: true // 在某些系统中，可能需要启用shell来正确地解析命令和参数
    })

    // 监听子进程的错误和退出事件
    tscProcess.on('error', (err) => {
      console.error('webpack进程发生错误:', err)
    })

    tscProcess.on('exit', (code, signal) => {
      if (code !== null) {
        console.log(`webpack进程退出, 退出码 ${code}`)
      } else {
        console.log(`webpack进程被信号 ${signal} 杀死`)
      }
    })
    tscProcess.on('spawn', () => {
      resolve(done())
    })
  })
})

// 注册编译任务
gulp.task('buildTs', (done) => {
  new Promise((resolve, reject) => {
    const tscProcess = spawn(
      'cmd.exe',
      [
        '/k',
        'start',
        'npx tsc',
        '--watch',
        '--project',
        './tsconfig.server.json'
      ],
      {
        stdio: 'inherit', // 这将使子进程的stdio继承自父进程，这样您可以在控制台中看到输出
        shell: true // 在某些系统中，可能需要启用shell来正确地解析命令和参数
      }
    )

    // 监听子进程的错误和退出事件
    tscProcess.on('error', (err) => {
      console.error('tsc进程发生错误:', err)
    })

    tscProcess.on('exit', (code, signal) => {
      if (code !== null) {
        console.log(`tsc进程退出, 退出码 ${code}`)
      } else {
        console.log(`tsc进程被信号 ${signal} 杀死`)
      }
    })
    tscProcess.on('spawn', () => {
      resolve(done())
    })
  })
})

// 注册默认任务
gulp.task('default', gulp.series('buildJs', 'buildTs', startNodeServer))

// 注册启动服务任务
gulp.task('start', startNodeServer)

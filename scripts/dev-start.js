#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unused-vars */

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { execSync, spawn } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Port configuration
const PORTS = {
  nextjs: 3000,
  jsonServer: 3001,
}

/**
 * Kill processes using specific ports (Silent mode)
 */
function killPortProcesses() {
  console.log('🧹 Cleaning up ports...')

  let killedProcesses = 0

  Object.entries(PORTS).forEach(([service, port]) => {
    try {
      const result = execSync(`lsof -ti:${port}`, { encoding: 'utf8', stdio: 'pipe' })
      const pids = result.trim().split('\n').filter(Boolean)

      if (pids.length > 0) {
        console.log(`⚡ Killing ${service} processes on port ${port}: ${pids.join(', ')}`)
        pids.forEach((pid) => {
          try {
            execSync(`kill -9 ${pid}`, { stdio: 'pipe' })
            killedProcesses++
          } catch (err) {
            // Process might already be dead - that's fine
          }
        })
      }
    } catch (err) {
      // No processes found on this port - that's perfectly normal!
    }
  })

  // Additional cleanup for any stray json-server processes
  try {
    execSync('pkill -f "json-server"', { stdio: 'pipe' })
    killedProcesses++
  } catch (err) {
    // No json-server processes found - that's fine
  }

  if (killedProcesses === 0) {
    console.log('✅ Ports are clean - ready to start')
  } else {
    console.log(`✅ Port cleanup completed - killed ${killedProcesses} process(es)`)
  }
}

/**
 * Update service configuration files with correct ports
 */
function updateServiceConfig() {
  console.log('⚙️  Updating service configurations...')

  // Update jsonServerService.js
  const servicePath = join(rootDir, 'src/services/jsonServerService.js')
  let serviceContent = readFileSync(servicePath, 'utf8')
  serviceContent = serviceContent.replace(
    /const JSON_SERVER_BASE_URL = 'http:\/\/localhost:\d+'/,
    `const JSON_SERVER_BASE_URL = 'http://localhost:${PORTS.jsonServer}'`,
  )
  writeFileSync(servicePath, serviceContent)

  // Update package.json
  const packagePath = join(rootDir, 'package.json')
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))
  packageJson.scripts['json-server'] = `json-server --watch db.json --port ${PORTS.jsonServer}`
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))

  console.log('✅ Service configurations updated')
}

/**
 * Start development servers with proper error handling
 */
function startServers() {
  console.log('🚀 Starting development servers...')

  // Start JSON Server
  const jsonServer = spawn('npx', ['json-server', '--watch', 'db.json', '--port', PORTS.jsonServer.toString()], {
    cwd: rootDir,
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  jsonServer.stdout.on('data', (data) => {
    if (data.toString().includes('JSON Server started')) {
      console.log(`✅ JSON Server: http://localhost:${PORTS.jsonServer}`)
    }
  })

  jsonServer.stderr.on('data', (data) => {
    const error = data.toString()
    if (error.includes('EADDRINUSE')) {
      console.error(`❌ JSON Server port ${PORTS.jsonServer} still in use. Please try again.`)
      process.exit(1)
    }
  })

  // Wait a bit for JSON Server to start, then start Next.js
  setTimeout(() => {
    const nextjs = spawn('npx', ['next', 'dev', '--port', PORTS.nextjs.toString()], {
      cwd: rootDir,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    nextjs.stdout.on('data', (data) => {
      const output = data.toString()
      if (output.includes('Ready in')) {
        console.log(`✅ Next.js: http://localhost:${PORTS.nextjs}`)
        console.log('\n🎉 Development environment ready!')
        console.log(`📱 Frontend: http://localhost:${PORTS.nextjs}`)
        console.log(`🔌 API: http://localhost:${PORTS.jsonServer}`)
      }
      if (output.includes('using available port')) {
        const match = output.match(/port (\d+)/)
        if (match) {
          console.log(`⚡ Next.js auto-switched to port ${match[1]}`)
        }
      }
    })

    nextjs.stderr.on('data', (data) => {
      const error = data.toString()
      if (error.includes('Port') && error.includes('is in use')) {
        // Next.js will auto-switch ports, this is fine
      }
    })
  }, 2000)

  // Handle cleanup on exit
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development servers...')
    jsonServer.kill('SIGTERM')
    process.exit(0)
  })
}

/**
 * Main execution
 */
async function main() {
  console.log('🔧 Smart Development Environment Setup')
  console.log('=====================================')

  try {
    killPortProcesses()
    updateServiceConfig()

    // Small delay to ensure ports are fully released
    await new Promise((resolve) => setTimeout(resolve, 1000))

    startServers()
  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    process.exit(1)
  }
}

main()

import { render } from './render.js'

let currentRouterView = () => ''
let base = ''

export const createHashRouter = (baseUrl, routes) => {
  base = baseUrl
  const routesMap = new Map() // JS 中 Map 可以实现 LRU 算法
  routes.forEach((route) => {
    routesMap.set(route.path, route.component)
  })

  const go = (path) => {
    if (routesMap.has(path)) {
      window.location.hash = path
    } else throw new Error('url is not exist.')
  }

  const handleHashChange = e => {
    const path = window.location.hash.slice(1) // #/about => /about
    currentRouterView = routesMap.get(path ? path : '/') // 处理 url 没有 hash 时当作首页处理，127.0.0.1/ => 127.0.0.1/#/
    render()
  }

  window.addEventListener('load', handleHashChange)
  window.addEventListener('hashchange', handleHashChange)

  return { go }
}

export const createHistoryRouter = (baseUrl, routes) => {
  base = baseUrl
  const routesMap = new Map() // JS 中 Map 可以实现 LRU 算法
  routes.forEach((route) => {
    routesMap.set(route.path, route.component)
  })

  const go = (path) => {
    if (routesMap.has(path)) {
      let currentPath = base + path

      history.pushState({path}, null, currentPath)

      handleHistoryChange()
    } else throw new Error('url is not exist.')
  }

  const handleHistoryChange = e => {
    console.log('history changed')
    let path = window.location.href
    path = path.split('/').pop()
    currentRouterView = routesMap.get(path ? '/' + path : '/')
    render()
    init()
  }

  //初始化，改写a标签行为
  const init = () => {
    setTimeout(() => {
        document.querySelectorAll("a")
        .forEach((item,index)=>{
          item.addEventListener("click",function(e){
            // 阻止a标签的默认行为
            e.preventDefault()

            let path = '/' + this.getAttribute('href').split('/').pop()
            go(path)
        })
      })
    }, 0)
    
  }

  window.onload = () =>{
    handleHistoryChange();
  }
  window.addEventListener('popstate', handleHistoryChange)

  return { go }
}

export const RouterView = (props) => currentRouterView(props)
export const RouterLink = (props) => `<a href="${base}${props.url}">${props.text}</a>`

function createStore(state, stateChanger){
  const listeners=[]
  const subscribe=(listener)=>listeners.push(listener)
  const getState=()=>state
  const dispatch=(action)=>{
    stateChanger(state, action) 
    listeners.forEach((listener)=>listener())
  }
  return { getState, dispatch, subscribe }
}

const appState={
  title:{
    text:"React 小书",
    color:"red"
  },
  content:{
    text:"React 小书内容",
    color:'blue'
  }
}

//更改状态的函数
function stateChanger(state, action){
  switch(action.type){
    case "UPDATE_TITLE_TEXT":
      appState.title.text=action.text
      break
    case "UPDATE_TITLE_COLOR":
      appState.title.color=action.color
      break
    default:
      break
  }
}

function renderApp(appState){
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle(title){
  const titleDOM=document.getElementById("title")
  titleDOM.innerHTML=title.text
  titleDOM.style.color=title.color
}

function renderContent(content){
  const contentDOM=document.getElementById("content")
  contentDOM.innerHTML=content.text
  contentDOM.style.color=content.color
}

const store=createStore(appState, stateChanger)

//首次渲染页面
renderApp(store.getState())

store.dispatch({type:"UPDATE_TITLE_TEXT",text:"《store后的页面》"})
store.dispatch({type:"UPDATE_TITLE_COLOR",color:"blue"})

renderApp(store.getState())
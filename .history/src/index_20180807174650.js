function createStore(state, stateChanger){
  const getState=()=>state
  const dispatch=(action)=>stateChanger(state, action) 
  return { getState, dispatch }
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
function stateChange(state, action){
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

const store=cteateStore(appState, stateChanger)

//首次渲染页面
renderApp(appState)

dispatch({type:"UPDATE_TITLE_TEXT",text:"《更改后的页面》"})
dispatch({type:"UPDATE_TITLE_COLOR",color:"yellow"})

renderApp(appState)
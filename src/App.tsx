import { CountdownTimer } from './components/timer'

export const App = () => {
  return (
    <div className="app" onContextMenu={e => e.preventDefault()}>
      <img src="https://i.postimg.cc/1zSXZ47X/logo.png" alt="" width={250} height={250} draggable={false} />
      <CountdownTimer />
    </div>
  )
}

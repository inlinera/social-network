import { CountdownTimer } from './components/timer'

export const App = () => {
  return (
    <div className="app">
      <img src={'src/assets/logo.png'} alt="" width={250} height={250} draggable={false} />
      <CountdownTimer />
    </div>
  )
}

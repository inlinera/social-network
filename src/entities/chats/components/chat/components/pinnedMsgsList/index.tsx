import { PinnedMsgsProps } from '../pinnedMsgs'

export const PinnedMsgsList = ({ pin }: PinnedMsgsProps) => {
  return (
    <div>
      <div>
        <button>back</button>
      </div>
      <div>
        {pin.map(msg => {
          return (
            <div>
              <b>{msg.userId}</b>
              <p>{msg.message}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

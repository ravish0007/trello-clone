import Board from './Board'
import Topbar from './Topbar'

export default function Workspace ({ board, username, logOut }) {
  return (
    <div className='min-h-screen bg-sky-600'>
      <Topbar username={username} logOut={logOut} />
      <Board board={board} />
    </div>
  )
}

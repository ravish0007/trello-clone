import Board from './Board'
import Topbar from './Topbar'

export default function Workspace ({ board, user, logOut }) {
  return (
    <div className='min-h-screen bg-sky-600'>
      <Topbar user={user} logOut={logOut} />
      <Board board={board} />
    </div>
  )
}

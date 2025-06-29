import React, { useContext, useState, useRef, FC, MouseEvent, TouchEvent } from 'react'
import classNames from 'classnames'
import CardContextMenu from 'components/CardContextMenu'
import useOutsideClickListener from 'hooks/useOutsideClickListener'
import GameContext from 'contexts/gameContext'
import Badge from 'components/library/Badge'
import { CardColor, ICard, IGameContext } from 'interfaces/Game'
import 'components/Card.scss'

interface IProps {
  index: number
  card: ICard
}

const Card: FC<IProps> = ({ index, card }) => {
  const { setColor, isDuetGame } = useContext<IGameContext>(GameContext)
  const { cardId, color } = card
  const [enlarged, setEnlargement] = useState<boolean>(false)
  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  const container = useRef<HTMLDivElement>(null)
  useOutsideClickListener(container, () => setEnlargement(false))

  const showMenu = (e: MouseEvent|TouchEvent): void => {
    e.preventDefault()
    setEnlargement(false)
    setMenuVisible(true)
  }
/*
  const toggleMenu = (e: MouseEvent): void => {
    e.preventDefault()
    setMenuVisible(menuVisible => !menuVisible)
  }
*/
  const setCardColor = (color: CardColor) => setColor(card, color)
  const resetColor = () => setCardColor('')

  return (
    <div
      onContextMenu={showMenu}
      className={classNames('Card', {
        'selected': !!color,
        [color]: !!color,
        'duet': isDuetGame,
      })}
      ref={container}
      onDoubleClick={resetColor}
    >
      <Badge classname="card-id">{index}</Badge>
      <button onTouchStart={() => showMenu} onClick={() => showMenu} className="no-style">
        <img
          src={`/images/cards/card-${cardId}.jpg`}
          className={classNames('card-img', { 'enlarged': enlarged })}
          alt={`codename card-${cardId}`}
        />
      </button>

      {menuVisible && <CardContextMenu
        hideMenu={() => setMenuVisible(false)}
        setColor={setCardColor}
      />}
    </div>
  )
}

export default Card

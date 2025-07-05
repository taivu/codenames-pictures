import { useState, useRef, useEffect, FC, FormEvent } from 'react'
import SpyCard from 'components/SpyCard'
import { ISpyCard } from 'interfaces/SpyMaster'
import 'routes/SpyMaster.scss'
import { getRandomInt } from 'utils/number-helpers'

const SpyMaster: FC = () => {
  const [searchCardId, setSearchCardId] = useState<string>('')
  const [card, setCard] = useState<ISpyCard>()
  const [cardIdToDisplay, setCardIdToDisplay] = useState(0)
  const cards = useRef([])

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    const response = await fetch('/spy-master-cards.json')
    cards.current = await response.json()
    setCardToDisplay()
  }

  const setCardToDisplay = (cardId?: number) => {
    let spyCardId = cardId ?? getRandomInt(100)
    const card = cards.current.find(({ id }) => Number(id) === spyCardId)
    setCardIdToDisplay(spyCardId)
    setCard(card)
  }

  const changeCard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.elements.namedItem('card-id') as HTMLInputElement
    const cardId = Number(input.value)
    setCardToDisplay(cardId)
  }

  return (
    <div className="SpyMaster">
      <div className="find-card-wrapper">
        <form onSubmit={changeCard}>
          <label htmlFor="card-id">Looking for a card?</label>
          <input
            id="card-id"
            className="input"
            value={searchCardId}
            onChange={({ target: { value } }) => setSearchCardId(value)}
            placeholder="Insert card id"
            name="card-id"
          />
          <button className="btn blue">Search</button>
        </form>
      </div>

      <div className="random-card-wrapper">
        <button className="btn blue" onClick={() => setCardToDisplay()}>
          Random Spy Master Card
        </button>
      </div>

      <div className="container spy-master">
        {card && (
          <>
            <h1 className="title">Spy master card: {cardIdToDisplay}</h1>
            <SpyCard card={card} />
          </>
        )}

        {cards.current.length && !card && (
          <h1 className="title">
            Spy master card &quot;{cardIdToDisplay}&quot;
            <br />
            does not exist you twat.
          </h1>
        )}
      </div>
    </div>
  )
}

export default SpyMaster

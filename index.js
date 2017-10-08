const Card = (front, back) => ({
  front,
  back,
  render: () => {
    const div = document.createElement('div')
    div.className = 'Card'
    div.textContent = front
    div.onclick = () => (div.textContent = back)
    return div
  },
})

const Deck = (cards, learnedCards = []) => ({
  cards,
  learnedCards,
  render: onDeckUpdate => {
    const div = document.createElement('div')

    const card = cards[0]
    const cardElement = card.render()
    div.appendChild(cardElement)

    const button = document.createElement('button')
    button.textContent = 'Learn'
    button.onclick = () => {
      const newDeck = learnCard(card, cards, learnedCards)
      onDeckUpdate(newDeck)
    }
    div.appendChild(button)

    return div
  },
})

const learnCard = (card, cards, learnedCards) =>
  Deck(cards.filter(c => c !== card), learnedCards.concat([card]))

function App(deck) {
  this.deck = deck
}

App.prototype.setDeck = function(deck) {
  this.deck = deck
}

App.prototype.render = function() {
  const container = document.getElementById('app')

  const div = document.createElement('div')
  const deckElement = this.deck.render(newDeck => {
    this.setDeck(newDeck)
    this.render()
  })

  div.appendChild(deckElement)
  container.innerHTML = '' // blow away any existing DOM
  container.appendChild(div)
}

const exampleDeck = Deck([
  Card('hello', 'world'),
  Card('long string A', 'long string B'),
])

const app = new App(exampleDeck)
app.render()

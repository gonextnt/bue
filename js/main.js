let app = new Vue({
    el: '#app',
    data:
        {
            cards: []
        },
    methods: {
        addNoteCard() {
            this.cards.push({
                id: Date.now(),
                title: 'Новая заметка',
                items: [],
                column: 1
            });
            this.saveCards();
        },
        saveCards() {
            localStorage.setItem('notes-cards', JSON.stringify(this.cards));
        },
        loadCards() {
            const savedCards = localStorage.getItem('notes-cards');
            if (savedCards) {
                this.cards = JSON.parse(savedCards);
            }
        }
    },
    computed: {
        column1Cards() {
            return this.cards.filter(card => card.column === 1);
        }
    },
    mounted() {
        this.loadCards();
    }
})
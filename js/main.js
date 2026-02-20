let app = new Vue({
    el: '#app',
    data:
        {
            cards: [],
            newCardTitle: '',
            newCardItems: ['', '', '']
        },
    methods: {
        addItem() {
            this.newCardItems.push('');
        },

        removeItem(index) {
            this.newCardItems.splice(index, 1);
            if (this.newCardItems.length === 0) {
                this.newCardItems.push('');
            }
        },

        createCard() {
            const validItems = this.newCardItems.filter(item => item.trim() !== '');

            this.cards.push({
                id: Date.now(),
                title: this.newCardTitle.trim() || 'Новая заметка',
                items: validItems.map(item => ({ text: item.trim(), completed: false })),
                column: 1,
                completedAt: null
            });

            this.saveCards();
            this.resetForm();
        },

        resetForm() {
            this.newCardTitle = '';
            this.newCardItems = ['', '', ''];
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
        },
        column2Cards() {
            return this.cards.filter(card => card.column === 2);
        },
        column3Cards() {
            return this.cards.filter(card => card.column === 3);
        }
    },
    mounted() {
        this.loadCards();
    }
})